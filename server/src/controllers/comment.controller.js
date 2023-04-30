'use strict';

const { responseDTO, APIFeatures } = require("../utils");
const { modelSchema } = require("../db");
const { commentModel } = modelSchema;

class CommentController {
    async GetAllComments(req, res) {
        try{
            
        }catch(error){
            console.log(error);
            responseDTO.serverError(error.message);
        }
    }

    async CreateComment(req, res) {

    }

    async RemoveComment(req, res) {

    }
}

module.exports = CommentController