import Controller from "@moonlay/src/lib/controllers/default.controller";
import {PrismaClient} from "@prisma/client";

export default class ProductController extends Controller{
    constructor(props) {
        super(props)
        BigInt.prototype.toJSON = function() {
            return this.toString()
        }
    }

    async _saveProduct(){
        try{
            this.tableName = 'product'
            if('price' in this.fields && typeof(this.fields?.price) === 'string'){
                Reflect.set(this.fields,'price', Number(this.fields?.price))
            }
            const [ err, data] = await this._create()
            Reflect.set(data,'price',data?.price?.toString())

            return [ err, data]
        }catch(err){
            return [ err, null ]
        }
    }


    async _saveImages(){
        try{
            this.tableName = 'product_image'
            return await this._create()
        }catch(err){

        }
    }

    async list(){
        try{
            this.tableName = 'product'
            this.condition = {
                select: {
                    id: true,
                    name: true,
                    images: {
                        select:{
                            id: true,
                            productId: true,
                            filename: true,
                            prefix: true,
                        }
                    },
                    taxonomy: {
                        select: {
                            taxonomies:{
                                select: {
                                    name: true,
                                    id:true
                                }
                            }
                        }
                    }
                }

            }
            return await this._list()

        }catch(err){
            return [err, null]
        }
    }

    async detail(){
        try{

            this.tableName = 'product'
            if(!isNaN(Number(this.value))){
                this.value = Number(this.value)
            }
            const data = await this.prisma[this.tableName].findUnique({
                where: {
                    [this.key]: this.value,
                },
            })
            if(data){
                data.price = data.price.toString()
            }
            return [ null, data]
        }catch(err){
            return [ err, null ]
        }
    }

    async _selfAddTaxonomy(){
        this.tableName = 'product_taxonomy'
        const data = await this._create()
        console.log(data,'ADD TAXONOMY')
    }
}