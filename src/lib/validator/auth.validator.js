import Joi from 'joi'
import validator, {JoiEmail, JoiPassword} from "./default.validator";

const create = validator({body: Joi.object({
        email: JoiEmail.required(),
        password: JoiPassword.required(),
    })
})
const AuthValidator = {
    create
}
export { AuthValidator }