import nc from "next-connect";
import { ErrorHandler }  from '@moonlay/handlers'
import ProductController from "@moonlay/src/lib/controllers/product.controller";

export const config = {
    api: {
        bodyParser: false,
    },
};
const handler = nc(ErrorHandler);
handler
    .get(async(req,res)=> {
        return await new ProductController({
            req,
            query:req.query,
            key:'id',
            value:req.query?.id  ?? null,
        }).detail()
            .then(([_,data])=> {
                if(_) return res.status(400).json({message: _?.message})
                if(!data) return res.status(404).json({
                    error: true,
                    message: "Product Not Found",
                    data: null
                })
                return res.status(200).json({
                    error: false,
                    message: "Successfully",
                    data:data,
                })

            }).catch((err)=> {
                return res.status(400).json({
                    error: true,
                    message: err?.message,
                    data: null
                })
            })
    })

export default handler