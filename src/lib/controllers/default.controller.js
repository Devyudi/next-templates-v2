import {PrismaClient} from "@prisma/client";
import Helpers from "@moonlay/helpers";

export default class Controller {
    constructor(props = {}){
        this.req = props?.req ?? undefined
        this.includes = props?.includes ?? null
        this.condition = props?.condition ?? {}
        this.res = props?.res ?? undefined
        this.prisma = props?.prisma ?? new PrismaClient();
        this.tableName = props?.tableName ?? undefined
        this.value = props?.value ?? null
        this.key = props?.key ?? undefined
        this.fields = props?.fields ?? null
        this.where = props?.where ?? {}
        BigInt.prototype.toJSON = function() {
            return this.toString()
        }
    }

    async _create(){
        try{
            if(!this.tableName) return [ new Error('tableName : table name is not defined')]
            if(typeof(this.fields) !== 'object' && Object.keys(this.fields).length === 0) return [new Error('No data found to save'),null]
            const save = await this.prisma[this.tableName].create({
                data: this.fields
            })
            return [ null, save ]
        }catch(err){
            return [ err, null ]
        }
    }

    async _list(){
        try{
            if(!this.tableName) return [ new Error('tableName : table name is not defined')]
            const pagination = Helpers.Pagination(this.req.query)

            let condition = {
                ...this.condition,
                ...pagination.prisma,
            }

            if(this.includes && typeof(this.includes) === 'object' && Object.keys(this.includes).length > 0){
                Reflect.set(condition,'include',this.includes)
            }
            const total = await this.prisma[this.tableName].count()
            const data = await this.prisma[this.tableName].findMany({
                ...condition,
            })
            return [ null, {
                pagination: {
                    ...pagination.pagination,
                    max_page: Math.ceil(total/pagination?.pagination?.limit),
                    total:total
                },
                query: {
                    ...this.req.query,
                    ...pagination.pagination
                },
                data: data
                    ?? []
            }]
        }catch(err){
            return [ err, null ]
        }
    }
}