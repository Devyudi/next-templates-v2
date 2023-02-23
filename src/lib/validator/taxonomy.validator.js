import Joi from 'joi'
import validator from "./default.validator";

const create = validator({body: Joi.object({
        name: Joi
            .string()
            .min(3)
            .max(100)
            .required(),
        parentId: Joi.optional()
    })
})
const TaxonomyValidator = {
    create
}
export { TaxonomyValidator }