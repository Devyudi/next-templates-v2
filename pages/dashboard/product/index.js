import React, { useState } from 'react'
import MetaHead from "@moonlay/src/components/shared-layout/meta.head";
import {ContainerLayout} from "@moonlay/src/components/shared-layout";
import {Card, Table, Button, Typography, Tag, Tooltip} from "antd";
import {EyeOutlined, SkinOutlined} from '@ant-design/icons'
import PageHeadAlt from "@moonlay/src/components/shared-component/hero/page-head-alt";
import {useRouter} from "next/router";
import {getToken} from "next-auth/jwt";
import ApiService from "@moonlay/src/lib/services/api.service";
import Image from "next/image";
import {first} from "lodash";
import Link from "next/link";

export default function Index(props){
    const route = useRouter()
    const [loading,setLoading] = useState(false)
    const [ data, setData ] = useState(()=> {
        if(props?.data) return props?.data
        return [ ]
    })
    const [ params, setParams]  = useState(()=> {
        if(props?.query) return props?.query
        return {
            page:1,
            limit:10
        }
    })
    const [ pagination, setPagination ] = useState(()=>{
        if(props?.pagination) return props?.pagination
        return {
            page:1,
            limit: 10,
            max_page:0,
            total: 0
        }
    })
    const onPagination = async (page = 1,limit = params?.limit)=> {
        setLoading(true)
        await new ApiService({
            url: '/api/product',
            config: {
                params :{
                    ...params,
                    page: page,
                    limit: limit
                }
            }
        })
            .get()
            .then((response)=> {
                setLoading(false)
                setData([
                    ...response?.data
                ])
                setPagination({
                    ...pagination,
                    ...response?.pagination
                })
            })
            .catch((err)=> {
                setData([])
                setLoading(false)
            })
    }

    const columns = [
        {
            dataIndex: 'id',
            width:70,
            render: (_,val,index)=> index + 1
        },
        {
            dataIndex: "name",
            title:<Typography className={'text-xs'}>Name</Typography>,
            render: (_,val)=> {
                return (
                    <div className="text-left flex items-center gap-4">
                        {
                            Array.isArray(val?.images) && val?.images.length > 0 ?
                                <Image
                                    width={400}
                                    height={400}
                                    src={[[first(val?.images).prefix.replace('/public',''),first(val?.images).filename].join('/')].join('')}
                                    alt={'images-product'}
                                    className={'w-14 h-14 overflow-hidden object-cover rounded-full'}
                                />
                                :null
                        }
                        <Typography className={'text-xs'}>{_}</Typography>
                    </div>
                )
            }
        },

        {
            dataIndex: "taxonomy",
            title:<Typography className={'text-xs'}>Taxonomy</Typography>,
            render: (_)=> {
                return Array.isArray(_) && _.length > 0 ? (
                    <div className="w-full flex items-center gap-2">
                        {
                            _.map((item,index)=> {
                                return (
                                    <Tag color={'green'}>{item?.taxonomies_name ?? "-"}</Tag>
                                )
                            })
                        }
                    </div>
                ): "-"
            }
        },
        {
            title:<Typography className={'text-xs'}>Action</Typography>,
            render: (_)=> {
                return(
                    <div className="flex items-center justify-end gap-4">
                        <Tooltip title={'Detail Product'}>
                            <Link href={`/dashboard/product/${_?.id}`}>
                                <Button type={'primary'} ghost shape={'circle'} icon={<EyeOutlined className={'!text-xs'}/>}/>
                            </Link>
                        </Tooltip>
                    </div>
                )
            }
        }
    ]


    return (
        <React.Fragment>
            <MetaHead
                head={{
                    title:"List Product | @2023"
                }}
                scripts={[]}
            />
            <PageHeadAlt
                icon={{
                    src:'/ant-logo.png',
                    element:<SkinOutlined style={{fontSize:30}} />
                }}
                title={'List Product'}
            />
            <ContainerLayout className={'my-4'}>
                <Card>
                    <Table
                        loading={loading}
                        columns={columns}
                        dataSource={data}
                        pagination={ pagination?.max_page <= 1 ? false :  {
                            onChange:async (val,limit) => {
                                await  onPagination(val,limit)
                            },
                            pageSize: pagination?.limit ?? 10,
                            total: pagination?.total  ?? 0
                        }}
                    />
                </Card>
            </ContainerLayout>
        </React.Fragment>
    )
}

export async function getServerSideProps(ctx){
    let { req } = ctx

    const token = await getToken({
            req,
            secret: process.env.SECRET,
            secureCookie: false
        })
    let initialProps = {
        isError: false,
        pagination : {
            page: 1,
            limit:10,
            max_page:0,
            total:0
        },
        params: {
            page:1,
            limit:10
        },
        data: []
    }

    await new ApiService({
        url:'/api/product',
        config : {
            params: {
                ...initialProps.params
            }
        }
    }).get()
        .then((response)=> {
            if(!response?.error){
                Reflect.set(initialProps,'data',response?.data)
                Reflect.set(initialProps,'pagination',response?.pagination)
                Reflect.set(initialProps,'query',response?.params)
            }
            else{
                Reflect.set(initialProps,'isError', true)
            }
        })
        .catch((err)=> {
            Reflect.set(initialProps,'isError', true)
        })

    if(initialProps.isError){
        return {
            redirect: {
                destination :"/auth/login",
                permanent: false
            }
        }
    }


    return {
        props : {
            token: token,
            pagination : initialProps?.pagination ?? {},
            data: initialProps?.data ?? [],
            query: initialProps?.params ?? {}
        }
    }
}