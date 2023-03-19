const { ResponseDTO } = require("../utils");
const { modeSchema } = require("../db");
const { userModel } = modeSchema;
const responseDTO = new ResponseDTO();

const authController = {
    login: async (req, res) => {
        try {
            res.status(200).json(responseDTO.success("Success"))
        } catch (error) {
            console.log(error);
            return res.status(500).json(responseDTO.serverError(error.message));
        }
    },

    register: async(req,res)=>{

    }
}

module.exports = authController;