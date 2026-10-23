const request = require('supertest');
const bcrypt = require('bcryptjs');

jest.mock('../db/db', () => jest.fn());
jest.mock('../models/user.model', () => ({
    findOne: jest.fn(),
    create: jest.fn()
}));

const app = require('../app');
const userModel = require('../models/user.model');

describe('POST /api/auth/register', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        process.env.JWT_SECRET = 'test-secret';
    });

    it('registers a new user and returns an authentication token', async () => {
        userModel.findOne.mockResolvedValue(null);
        userModel.create.mockImplementation(async (user) => ({
            ...user,
            _id: 'user-id'
        }));

        const response = await request(app)
            .post('/api/auth/register')
            .send({
                username: 'test-user',
                email: 'test@example.com',
                password: 'password123',
                role: 'user'
            });

        expect(response.status).toBe(201);
        expect(response.body.message).toBe('User registered successfully');
        expect(response.body.token).toEqual(expect.any(String));
        expect(response.headers['set-cookie']).toEqual(
            expect.arrayContaining([expect.stringContaining('token=')])
        );
        expect(userModel.findOne).toHaveBeenCalledWith({
            $or: [
                { username: 'test-user' },
                { email: 'test@example.com' }
            ]
        });

        const createdUser = userModel.create.mock.calls[0][0];
        expect(createdUser).toMatchObject({
            username: 'test-user',
            email: 'test@example.com',
            role: 'user'
        });
        expect(createdUser.password).not.toBe('password123');
        await expect(bcrypt.compare('password123', createdUser.password)).resolves.toBe(true);
    });
});
