import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from 'jsonwebtoken';
import validator from "validator";

const createToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: "1d"
    });
}


//Route for user login 

const loginUser = async (req, res) => {

    const { email, password } = req.body;
    const { token } = req.headers;

    let userData = {};
    try {
        if (email != undefined && password != undefined) {

            userData = await userModel.findOne({ email });
            if (userData == null) {
                return res.json({ success: false, message: "User not exists Sign Up first" });
            }


            const bycrptpassword = await (bcrypt.compare(password, userData.password))
            if (!bycrptpassword) {
                return res.json({ success: false, message: " Invalid Credentials" });
            }


        }



        jwt.verify(token, process.env.JWT_SECRET, async (err, data) => {

            if (err) {
                if (email != undefined && password != undefined) {
                    const newToken = createToken({ id: userData._id, name: userData.name, email: userData.email });
                    return res.json({ success: true, message: "sign", userData, newToken });
                }

            } else {

                return res.json({ success: true, message: "verified", Userdata: { name: data.name, email: data.email } });
            }
        })

    } catch (error) {
        return res.json({ success: false, message: error.message });

    }


}

//Route for user Register

const registerUser = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        // User already exists
        const exists = await userModel.findOne({ email });
        if (exists) {
            return res.json({ success: false, message: "User already exists" });
        }

        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Plese enter a valid email" });
        }

        if (password.length < 8) {
            return res.json({ success: false, message: "Plese enter a strong password" });
        }

        //Hashing our password

        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        const newUser = new userModel({
            name,
            email,
            password: hashPassword,
        })

        const user = await newUser.save();
        const token = createToken({ id: user._id, name, email });
        res.json({ success: true, token });

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
}

//Route for admit login

const adminLogin = async (req, res) => {

    const { email, password } = req.body;

    if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
        const token = jwt.sign({ email, password }, process.env.JWT_SECRET);
        res.send({ success: true, token });
    } else {
        res.send({ success: false, message: "Invalid credentials" });
    }

}

export { loginUser, registerUser, adminLogin }


