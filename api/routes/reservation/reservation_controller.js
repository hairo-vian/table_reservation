const createError = require('http-errors');
const reservationModel = require("../../models").RESERVATION;
const mejaModel = require("../../models").MEJA;

exports.insertNewReservation = (req, res, next) => {
    const body = req.body;
    const numberOfCustomer = body.numberOfCustomer;
    const reserveFor = body.reserveFor;
    const userId = body.userId;
    const mejaId = body.mejaId;
    const reserveTime = body.reserveTime;

    reservationModel.create({
        reserveTime: reserveTime,
        numberOfCustomer: numberOfCustomer,
        reserveFor: reserveFor,
        userId: userId,
        mejaId: mejaId
    }).then(created => {
        created
            ? mejaModel.update({reserved: true}, {where: {mejaId: mejaId}})
                .then(updated => {
                    updated
                        ? res.status(201).json({
                            status: 201,
                            message: "Reservation Success"
                        })
                        : res.status(500).json({
                            status: 500,
                            message: "Reservation Failed"
                        });
                }).catch(e => {
                    next(createError(e))
                    console.log(e)
                })
            : res.status(404).json({
                status: 404,
                message: "Record Not Found"
            })
    }).catch(e => {
        next(createError(e))
        console.log(e)
    })
}

exports.updateCancelReservation = (req, res, next) => {
    const body = req.body;
    const reserveTime = body.reserveTime;
    const userId = body.userId;
    const mejaId = body.mejaId;

    reservationModel.findOne({
        where: {reserveTime:reserveTime,userId:userId,mejaId:mejaId}
    }).then(value => {
        value
            ? mejaModel.update({reserved: false}, {where: {mejaId: mejaId}})
                .then(updated => {
                    updated
                        ? res.status(200).json({
                            status: 200,
                            message: "Success"
                        }) : res.status(500).json({
                            status: 500,
                            message: "Failed"
                        })
                }).catch(e => {
                    next(createError(e))
                    console.log(e)
                }) : res.status(500).json({
                status: 500, message: "Failed"
            })
    }).catch(e => {
        next(createError(e))
        console.log(e)
    })
}