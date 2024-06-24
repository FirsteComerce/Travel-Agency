const { User } = require("../model/user.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const createError = require("../utils/error.js");

const Register = async (req, res, next) => {
    try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(req.body.password, salt);

        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hash,
            gender: req.body.gender,
        });

        await newUser.save();
        res.status(200).send("User has been created");
    } catch (err) {
        next(err);
    }
};

const Login = async (req, res, next) => {
    try {
        const user = await User.findOne({ username: req.body.username });
        if (!user) return next(createError(404, "User not found"));

        const isPasswordCorrect = await bcrypt.compare(req.body.password, user.password);
        if (!isPasswordCorrect) return next(createError(400, "Wrong password or username"));

        const accessToken = jwt.sign(
            { id: user._id, username: user.username },
            process.env.JWT_ACCESS_SECRET,
            { expiresIn: "1m" }
        );

        const refreshToken = jwt.sign(
            { id: user._id, username: user.username },
            process.env.JWT_REFRESH_SECRET,
            { expiresIn: "5m" }
        );

        const { password, ...otherDetails } = user._doc;

        res.cookie("access_token", accessToken, {
            maxAge: 60000, // 1 minute
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
        });

        res.cookie("refresh_token", refreshToken, {
            maxAge: 300000, // 5 minutes
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
        });

        res.status(200).json({ login: true, ...otherDetails });
    } catch (err) {
        next(err);
    }
};

module.exports = { Register, Login };
