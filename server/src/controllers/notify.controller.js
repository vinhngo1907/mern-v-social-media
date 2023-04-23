'use strict';

const { responseDTO, APIFeatures } = require("../utils");
const { modelSchema } = require("../db");
const { notifyModel } = modelSchema;

class NotifyController {
    async GetNotifies(){
        try{

        }catch(error){
            console.log(error);
            responseDTO.serverError(error.message);
        }
    }
}

module.exports = NotifyController;