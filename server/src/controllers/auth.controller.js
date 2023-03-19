const { ResponseDTO, Validation, Password } = require("../utils");
const { modeSchema } = require("../db");
const { userModel } = modeSchema;

class AuthController {
    constructor() {
        this.responseDTO = new ResponseDTO();
        this.validate = new Validation();
        this.password = new Password();
    }
    async Login(req, res) {
        try {
            const { account, password } = req.body;
            if (this.validate.validateMobile(account)) {

            }

            const user = await userModel.findOne({
                $or: [
                    { email: account },
                    { username: account }
                ]
            });
            if (!user) {
                res.status(400).json(this.responseDTO.badRequest("This user does not exist"));
            }
            return this.LoginUser(password, user, req, res);
            // res.status(200).json(this.responseDTO.success("Success"))
        } catch (error) {
            console.log(error);
            return res.status(500).json(this.responseDTO.serverError(error.message));
        }
    }

    async Register(req, res) {
        try {
            const { fullname, username, email, password } = req.body;

        } catch (error) {
            console.log(error);
            return res.status(500).json(this.responseDTO.serverError(error.message));
        }
    }

    async LoginUser(password, user, req, res) {
        try {
            return res.status(200).json(this.responseDTO.success("Logged Successfully", {
                user: { ...user, password: "" }
            }))
        } catch (error) {
            console.log(error);
        }
    }

    async RegisterUser(req, res) {
        try {

        } catch (error) {
            console.log(error);
            return;
        }
    }
}

module.exports = new AuthController();