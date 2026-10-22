const userModel = require("../models/user.model");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

async function registerUser(req, res) { 

    const { username, email, password, role } = req.body;

    try 
    {
        const isUserAlreadyExist = await userModel.findOne({
            $or: [
                { username },
                { email }
            ]
        })

        if (isUserAlreadyExist) {
            return res.status(400).json({
                message: "User already exists"
            })
        }

        const hash = await bcrypt.hash(password, 10)

        const user = await userModel.create({
            username,
            email,
            password : hash,
            role
        })

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1h" })
        
        res.cookie("token", token)

        res.status(201).json({
            message: "User registered successfully",
            user,
            token
        })
    }
    catch (error) {
        console.error('User registration failed:', error);
        return res.status(500).json({
            message: "Unable to register user"
        })
    }
}

async function loginUser(req, res) {
    const { username, email, password } = req.body;

    try { 
        if ((!password && !email) || (!password && !username)) {
            return res.status(400).json({
                message: "Credentials are required"
            })
        }

        const user = await userModel.findOne({
            $or: [
                { username },
                { email }
            ]
        })

        if (!user) {
            return res.status(401).json({
                message: "Invalid credentials"
            })
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);

        if (!isPasswordValid) {
          return res.status(401).json({
            message: "Invalid credentials",
          });
        }

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET)
        
        res.cookie('token', token)

        res.status(200).json({
            message: "User logged in successfully",
            user,
            token
        })
        
    }
    catch (error) {
        console.error('User login failed:', error);
        return res.status(500).json({
            message: "Unable to login user"
        })
    }
}

module.exports = { registerUser, loginUser };