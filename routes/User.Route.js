const express = require("express");
const userRouter = express.Router();
const UserModel = require("../models/User.Model")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
//Registration the user;
userRouter.post("/register", async (req, res) => {
    try {
        let {name,email, password,age } = req.body
        bcrypt.hash(password, 5, async (err, hash) => {
            // Store hash in your password DB.
            const user = new UserModel({ name,age,email, password: hash })
            await user.save()
            res.status(200).send({ "msg": "New user registered successfully" })
        })
    } catch (error) {
        res.send({ "err": "unable to add the new  user " })
    }
})

//login  the user;
userRouter.post("/login", async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await UserModel.findOne({ email })
        console.log(user)
        if (user) {
            bcrypt.compare(password, user.password, function (err, result) {
                if (result) {
               
                    var token = jwt.sign({authorID:user._id,author:user.name}, 'boss');
                    res.send({ "msg": "Login successfull !!! ", token });

                } else {
                    res.send({ "err": "wrong password" });
                }
            });
        }
        else {
            res.send({ "err": "Wrong Credentials !!!" })
        }
    } catch (error) {
        res.send({ "err": "unable to login in route" })
    }
})

module.exports = userRouter