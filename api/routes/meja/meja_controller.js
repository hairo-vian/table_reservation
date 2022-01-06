const createError = require('http-errors');
const e = require("express");
const mejaModel = require("../../models").MEJA

exports.mejaGetList = (req, res, next) => {
    const body = req.body;
    const restaurantId = body.restaurantId;

    mejaModel.findAll(
        {where: {restaurantId: restaurantId}}
    )
        .then((mejas) => {
            const response = mejas.map((meja) => {
                return {
                    mejaId: meja.mejaId,
                    seatAmount: meja.seatAmount,
                    reserved: meja.reserved,
                    restaurantId: meja.restaurantId
                }
            })
            res.status(200).json(response)
        }).catch(e => {
        next(createError(e))
        console.log(e)
    })
}

exports.mejaInsertNew = (req, res, next) => {
    const body = req.body;
    const seatAmount = body.seatAmount;
    const restaurantId = body.restaurantId;

    mejaModel.create({seatAmount: seatAmount, reserved: false, restaurantId: restaurantId})
        .then(created => {
            created
                ? res.status(201).json({
                    status: 201,
                    message: "Table insert success"
                })
                : res.status(500).json({
                    status: 500,
                    message: "Server Error"
                })
        }).catch(e => {
        next(createError(e))
        console.log(e)
    })
}

exports.updateReservedTable = (req, res, next) => {
    const body = req.body
    const mejaId = body.mejaId
    const reserved = body.reserved

    mejaModel.update({reserved: reserved}, {where: {mejaId: mejaId}})
        .then(updated => {
            updated
                ? res.status(200).json({
                    status: 200,
                    message: "Update Table Reservation Success"
                }) : res.status(404).json({
                    status: 404,
                    message: "Failed Update Table Reservation"
                })
        }).catch(e => {
        next(createError(e))
        console.log(e)
    })
}