import nc from "next-connect";
import { ErrorHandler }  from '@moonlay/handlers'
import {Upload} from "@moonlay/modules";
import {ProductValidator} from "@moonlay/src/lib/validator/product.validator";
import ProductController from "@moonlay/src/lib/controllers/product.controller";
import Helpers from "@moonlay/helpers";
import {Guard} from "@moonlay/src/lib/middleware/guard.middleware";
import {checkSpecKeys} from "react-slick/lib/utils/innerSliderUtils";


export const config = {
  api: {
    bodyParser: false,
  },
};

const handler = nc(ErrorHandler);
const uploadFile = Upload.single('file');

handler
    .post(uploadFile,ProductValidator.create, async (req,res)=> {
        const [ _ , data ] = await new ProductController({
            fields: req.body?.product
        })._saveProduct()

        if(_) return res.status(400).json({
            error:true,
            message: _?.message ?? 'Some Error',
            data: null
        })

        let fields = {}
        Reflect.set(fields,'productId',data?.id)
        if(req.file?.destination){
            Reflect.set(fields,'prefix',['/public',req.file.destination.split('/public')[1]].join(''))
            await Helpers.DeleteObjKey(req.file,['path'])
        }
        Object.keys(req.file).forEach((key)=> {
            Reflect.set(fields,key,req.file[key])
        })

        const [_errImg, dataImg ] = await new ProductController({
            fields: fields
        })._saveImages()

        if(_errImg) return res.status(400).json({
            error:true,
            message: _errImg?.message ?? 'Some Error',
            data: null
        })

        // product taxonomy
        let fieldsTaxonomy = {}
        if(req.body.taxonomyId && !isNaN(Number(req.body.taxonomyId))){
            Reflect.set(fieldsTaxonomy,'productId',data?.id)

            Reflect.set(fieldsTaxonomy,'taxonomyId',Number(req.body.taxonomyId))

            await new ProductController({fields:fieldsTaxonomy})._selfAddTaxonomy()
        }



        return res
            .status(200)
            .json({
                data,
                body: req.body
            })
})
    .get(async(req,res)=> {
        const [_, {pagination,data,query
        }] = await new ProductController({
            req,
        }).list()
        if(_) res.status(400).json({error:true,message:_?.message ?? _ ?? ''})

        if(Array.isArray(data) && data.length > 0){
            data.map((item)=> {
                if(Array.isArray(item?.taxonomy) && item?.taxonomy.length > 0){
                    item?.taxonomy.map((child)=> {
                        Object.keys(child).forEach((ckey)=> {
                            if(typeof(child[ckey]) === 'object'){
                                Object.keys(child[ckey]).forEach((key)=> {
                                    Reflect.set(child,[ckey,key].join('_'),child[ckey][key])
                                })
                                Reflect.deleteProperty(child,ckey)
                            }
                        })
                    })
                }
                return item
            })
        }
        return res.status(200).json({pagination,query,data})
    })

export default handler