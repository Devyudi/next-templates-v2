import Joi from 'joi'
import validator, {JoiEmail, JoiPassword} from "./default.validator";

const create = validator({body: Joi.object({
        product: Joi.object({
            name: Joi.string().required(),
            description: Joi.string().min(3).required(),
            price: Joi.number().required()
        }).required(),
        taxonomyId: Joi.number().required()

    })
})
const ProductValidator = {
    create
}
export { ProductValidator }