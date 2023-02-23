import React from 'react'
import ApiService from "@moonlay/src/lib/services/api.service";
import ProductController from "@moonlay/src/lib/controllers/product.controller";
import MetaHead from "@moonlay/src/components/shared-layout/meta.head";
import {ContainerLayout} from "@moonlay/src/components/shared-layout";
import Script from "next/script";

export default function ProductDetail(props){
    let { data } = props
    return (
        <>
            <MetaHead
                head={{
                    title:data.name ?? "Product Detail",
                    description: data.description ?? null
                }}
            />
            <Script>{`
                window.addEventListener("load", function(){
                    
                })
            `}</Script>
            <ContainerLayout>
                <div className="w-full">
                    <p>{data.name ?? "-"}</p>
                    <p>{data.description ?? "-"}</p>
                    <p>{data.price ?? "-"}</p>
                </div>
            </ContainerLayout>
        </>
    )
}

// export async function getStaticPaths(ctx){
//     const [_,{data}] =  await new ProductController({req: {query:{limit:10,page:1}}}).list()
//     if(_) return {
//         paths: [],
//         fallback:false
//     }
//     let paths = []
//     if(Array.isArray(data) && data.length > 0){
//         paths = data.map((product)=> ({
//             params:{
//                 id: `${product.id}`
//             }
//         }))
//     }
//     return{
//         paths: paths,
//         fallback: false
//     }
// }

export async function getServerSideProps(ctx){
    let { id } = ctx.params
    const [ err, data] = await new ProductController({
        key: 'id',
        value: id
    }).detail()
        .then(([err,data])=> {
            return [err,JSON.stringify(data)]
        })
        .catch((err)=> {
            return [ err, null ]
        })


    if(err){
        return {
            props: {
                isFound: false,
                data: null
            }
        }
    }

    return {
        props: {
            isFound: data !== null,
            data: data ? JSON.parse(data): null
        }
    }
}