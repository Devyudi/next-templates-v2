import React, {useState, useEffect} from 'react'
import Dashboard from "@moonlay/src/components/shared-layout/private-layout/dashboard";
import MetaHead from "@moonlay/src/components/shared-layout/meta.head";
import {ContainerLayout} from "@moonlay/src/components/shared-layout";
import {Card, Table,Button} from "antd";
import { SkinOutlined } from '@ant-design/icons'
import PageHeadAlt from "@moonlay/src/components/shared-component/hero/page-head-alt";
import {useRouter} from "next/router";
import axios from 'axios'
import Helpers from "@moonlay/helpers";
import moment from 'moment'
import {getToken} from "next-auth/jwt";
import ApiService from "@moonlay/src/lib/services/api.service";

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
            url: '/api/taxonomy',
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
            title:"Name"
        },
        {
            dataIndex: "createdAt",
            title:"Created At",
            render: (_)=> _
        },
        {
            dataIndex: "updatedAt",
            title:"Updated At",
            render: (_)=> _
        },
        {
            dataIndex: "deletedAt",
            title:"Deleted At",
            render: (_)=> _
        },

    ]


    return (
        <React.Fragment>
            <MetaHead
                head={{
                    title:"List Taxonomy | @2023"
                }}
            />
            <PageHeadAlt
                icon={{
                    src:'/ant-logo.png',
                    element:<SkinOutlined style={{fontSize:30}} />
                }}
                title={'List Taxonomy'}
            />
            <ContainerLayout className={'my-4'}>
                <Card>
                    <Table
                        loading={loading}
                        columns={columns}
                        dataSource={data}
                        pagination={ {
                            onChange: (val,limit) => {
                                onPagination(val,limit)
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
    let { req} = ctx

    const token = await getToken({
            req,
            secret: process.env.SECRET,
            secureCookie: false
        }
    )
    let initialProps = {
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

    let headers = {}
    if(token){
        Reflect.set(headers,'Authorization',[`Bearer`,token?.user?.token].join(' '))
    }

    await new ApiService({
        url:'/api/taxonomy',
        config : {
            headers:headers,
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
        })


    return {
        props : {
            token: token,
            pagination : initialProps?.pagination ?? {},
            data: initialProps?.data ?? [],
            query: initialProps?.params ?? {}
        }
    }
}