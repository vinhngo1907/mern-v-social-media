const { ResponseDTO } = require("../utils");
const { modeSchema } = require("../db");
const { userModel } = modeSchema;

class AuthController {
    constructor() {
        this.responseDTO = new ResponseDTO()
    }
    async Login(req, res) {
        try {
            res.status(200).json(this.responseDTO.success("Success"))
        } catch (error) {
            console.log(error);
            return res.status(500).json(this.responseDTO.serverError(error.message));
        }
    }
    
    async Register(req, res) {
        try{
            const {fullname, username, email, password} = req.body;
            
        }catch(error){
            console.log(error);
            return res.status(500).json(this.responseDTO.serverError(error.message));
        }
    }
    
    async LoginUser(req){
        try{

        }catch(error){
            console.log(error);
        }
    }
}

module.exports = new AuthController();