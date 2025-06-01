const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const User = require("../models/user");
const { genResponse } = require("../helpers/commonHelpers");
const JWT_SECRET="smart_task_jwt_secret"
exports.register = async (req, res) => {
    try {
    
        const {
            email,
            first_name,
            last_name,
            password,
            role,
            profile_picture,
            notification_prefs,
        } = req.body;


        if (!email || !first_name  || !password || !role) {
            return res.status(400).json(genResponse(false, "Missing required fields."));
        }


        const password_hash = await bcrypt.hash(password, 10);


        const newUser = await User.create({
            email,
            first_name,
            last_name,
            password_hash,
            role,
            profile_picture,
            notification_prefs
        });


        const token = jwt.sign(
            { id: newUser.user_id, email: newUser.email,role: newUser.role },
            JWT_SECRET,
            { expiresIn: '1d' }
        );


        return res.status(201).json(genResponse(true, "User created successfully", { token }));

    } catch (error) {
        console.error("Error adding user:", error);
        return res.status(500).json(genResponse(false, error.message));
    }
};


exports.login = async (req, res) => {
    const { email, password } = req.body;

    try {

        const user = await User.findOne({ where: { email } });

        if (!user) {
            return res.status(404).json(genResponse(false, "User not found"));
        }


        const isMatch = await bcrypt.compare(password, user.password_hash);

        if (!isMatch) {
            return res.status(401).json(genResponse(false, "Invalid credentials"));
        }


        const token = jwt.sign(
            { id: user.user_id, email: user.email , role: user.role},
            JWT_SECRET,
            { expiresIn: "1d" }
        );

        user.last_login = new Date();
        await user.save();


        return res.status(200).json(genResponse(true, "Login successful", { token }));

    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json(genResponse(false, "Server error. Please try again later."));
    }
};



exports.logout = (req, res) => {
    const response = genResponse(true, "Logged out successfully")
    return res.status(200).json(response);
};




