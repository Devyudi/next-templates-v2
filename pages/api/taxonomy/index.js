import nc from "next-connect";
import { ErrorHandler }  from '@moonlay/handlers'
import {PrismaClient} from "@prisma/client";
import {TaxonomyValidator} from "@moonlay/src/lib/validator";
import Helpers from "@moonlay/helpers";
import {Guard} from "@moonlay/src/lib/middleware/guard.middleware";

export const config = {
    api: {
        bodyParser: true,
    },
};

const prisma = new PrismaClient();

const handler = nc(ErrorHandler);

handler
    .use(Guard)
    .post(
        TaxonomyValidator.create,
        async (req, res)=> {
            const taxonomy = await prisma.taxonomy.create({
                data: {
                    name : req.body?.name,
                    parentId : req.body?.parentId
                }
            })
            
        return res.status(200).json({
            message: 'OK!',
            data:taxonomy
        })
    })
    .get(async (req,res)=> {

        const  pagination = Helpers.Pagination(req.query)

        const total = await prisma.taxonomy.count()
        const taxonomy = await prisma.taxonomy.findMany({
            ...pagination.prisma
        })

        return res.status(200).json({
            pagination: {
                ...pagination.pagination,
                max_page: Math.ceil(total/
                    pagination?.pagination?.limit),
                total:total
            },
            query: {
                ...req.query,
                ...pagination.pagination
            },
            data: taxonomy
        })
    })



export default handler