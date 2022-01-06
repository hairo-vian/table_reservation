const createError = require('http-errors');
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const restaurantModel = require("../../models").RESTAURANT;
const mejaModel = require("../../models").MEJA;

exports.restaurantGetList = (req, res, next) => {
    restaurantModel.findAll().then((restaurants) => {
        const response = restaurants.map((restaurant) => {
            return {
                restaurantId: restaurant.restaurantId,
                restaurantName: restaurant.restaurantName,
                aboutText: restaurant.aboutText,
                aboutImage: restaurant.aboutImage
            }
        })
        res.status(200).json(response)
    }).catch(e => {
        next(createError(e))
        console.log(e)
    })
}

exports.restaurantInsertNew = async (req, res, next) => {
    const body = req.body;
    const restaurantName = body.restaurantName;
    const aboutText = body.aboutText;
    const aboutImage = body.aboutImage;
    const restaurantPassword = body.restaurantPassword;

    const salt = await bcrypt.genSalt(10);

    restaurantModel.findOrCreate({
        where: {
            restaurantName: restaurantName
        },
        defaults: {
            aboutText: aboutText,
            aboutImage: aboutImage,
            restaurantPassword: await bcrypt.hash(restaurantPassword, salt)
        }
    }).then(([restaurant, created]) => {
        created
            ? res.status(201).json({
                status: 201,
                message: "Berhasil mendaftarkan restoran"
            })
            : res.status(409).json({
                status: 409,
                message: "Restoran " + restaurant.name + " sudah terdaftar."
            })
    }).catch(e => {
        next(createError(e))
        console.log(e)
    })
}

exports.restaurantUpdatePassword = async (req, res, next) => {
    const body = req.body;
    const restaurantId = body.restaurantId;
    const restaurantPassword = body.restaurantPassword;

    const salt = await bcrypt.genSalt(10);
    restaurantModel.update({restaurantPassword: await bcrypt.hash(restaurantPassword, salt)}, {where: {restaurantId: restaurantId}})
        .then(updated => {
            updated
                ? res.status(200).json({status: 200, message: "Success update restaurant password"})
                : res.status(500).json({status: 500, message: "Server error"})
        }).catch(e => {
        next(createError(e))
        console.log(e)
    })
}

exports.restaurantDelete = (req, res, next) => {
    const restaurantId = req.params.restaurantId;

    restaurantModel.destroy({where: {restaurantId: restaurantId}}).then(deleted => {
        deleted ? res.json({
            status: 200,
            message: "Delete restaurant success"
        }) : res.json({
            status: 500,
            message: "Server error"
        })
    }).catch(e => {
        next(createError(e))
        console.log(e)
    })
}
exports.restaurantLogin = (req, res, next) => {
    const body = req.body;
    const restaurantName = body.email;
    const restaurantPassword = body.password;

    restaurantModel.findOne({where: {restaurantName: restaurantName}})
        .then(restaurant => {
            bcrypt.compare(restaurantPassword, restaurant.restaurantPassword)
                .then(verified => {
                    if (verified) {
                        const token = jwt.sign({
                            name: restaurant.restaurantName,
                            id: restaurant.restaurantId
                        }, process.env.JSONWEBTOKENKEY)

                        res.status(200).json({
                            status: 200,
                            message: "Auth Successful",
                            token: token,
                            userId: restaurant.restaurantId,
                            username: restaurant.restaurantName,
                            aboutText: restaurant.aboutText,
                            aboutImage: restaurant.aboutImage
                        })
                    } else {
                        res.status(401).json({
                            status: 401,
                            message: "Username / Password Unverified"
                        })
                    }
                }).catch(e => {
                next(createError(e))
                console.log(e)
            })
        })
}

exports.restaurantUpdateData = (req, res, next) => {
    const body = req.body
    const restaurantId = body.restaurantId
    const restaurantName = body.restaurantName
    const aboutText = body.aboutText
    const aboutImage = body.aboutImage

    restaurantModel.update({
        restaurantName: restaurantName,
        aboutText: aboutText,
        aboutImage: aboutImage
    }, {where: {restaurantId: restaurantId}}).then(updated => {
        updated
            ? res.status(200).json({
                status: 200, message: "Update success"
            })
            : res.status(500).json({
                status: 500,
                message: "Server error"
            })
    }).catch(e => {
        next(createError(e))
        console.log(e)
    })
}