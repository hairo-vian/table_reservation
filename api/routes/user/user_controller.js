const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const createError = require('http-errors');
const userModel = require("../../models").USER;

exports.userPostLogin = (req, res, next) => {
    const body = req.body;
    const email = body.email;
    const password = body.password;

    userModel.findOne({
        where: {email: email}
    }).then(async (user) => {
        if (user) {
            const verified = await bcrypt.compare(password, user.password)
            if (user && verified) {
                const token = jwt.sign({
                    email: user.email,
                    userId: user.userId
                }, process.env.JSONWEBTOKENKEY)
                res.status(200).json({
                    status: 200,
                    message: "Auth Successfull",
                    token: token,
                    userId: user.userId,
                    username: user.name
                })
            } else if (!user || !verified) {
                res.status(401).json({
                    status: 401,
                    message: "Username / Password unverified"
                })
            }
        } else {
            res.status(401).json({
                status: 401,
                message: "Username / Password unverified"
            })
        }
    }).catch(e => {
        next(createError(e))
        console.log(e)
    })
}

exports.userPostSignUp = async (req, res, next) => {
    const body = req.body;
    const email = body.email;
    const username = body.username;
    const phone = body.telpNo;
    const password = body.password;

    const salt = await bcrypt.genSalt(10);
    userModel.findOrCreate({
        where: {
            email: email
        }, defaults: {
            name: username,
            phone: phone,
            password: await bcrypt.hash(password, salt)
        }
    }).then(([user,created]) => {
        created
            ? res.status(201).json({
                status: 201,
                message: "User created successfully"
            })
            : res.status(409).json({
                status: 409,
                message: user.email + " already exist, please choose another username"
            })
    }).catch(e => {
        next(createError(e))
        console.log(e)
    })
}