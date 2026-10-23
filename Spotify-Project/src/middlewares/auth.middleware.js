const jwt = require("jsonwebtoken");


async function authArtist(req, res, next) {

    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({ message: "Unauthorized" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        if (decoded.role !== "artist") {
            return res.status(403).json({ message: "You don't have access to this, Only Artists are allowed" });
        }
        req.user = decoded;

        next();

    } catch (error) {
        return res.status(401).json({ message: "Unauthorized" });
    }
}

async function authUser(req, res, next) {
  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      message: "Unauthorized Access",
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (decoded.role !== "user" && decoded.role !== "artist") {
      return res.status(403).json({
        message: "You don't have access to this, Only Users and Artists are allowed",
      });
    }

    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      message: "You can not access the music",
    });
  }
}
 
module.exports = {authArtist, authUser};