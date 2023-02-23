import React, {useState, useEffect} from 'react'
import Dashboard from "@moonlay/src/components/shared-layout/private-layout/dashboard";
import MetaHead from "@moonlay/src/components/shared-layout/meta.head";
import {ContainerLayout} from "@moonlay/src/components/shared-layout";
import {Card, Form,Input,Button, Select,message} from "antd";
import { SkinOutlined } from '@ant-design/icons'
import PageHeadAlt from "@moonlay/src/components/shared-component/hero/page-head-alt";
import {useRouter} from "next/router";
import {getToken} from "next-auth/jwt";
import ApiService from "@moonlay/src/lib/services/api.service";


export default function Index(props){
    let { data } = props
    const [ form ] = Form.useForm()
    const route = useRouter();
    const [ loading, setLoading ] = useState(false)
    const onGoBack = ()=> route.back()
    const onFinish = ()=> {
        message.loading({
            content:"Loading...",
            duration:5,
            key:'updatable'
        })
        setLoading(true)
        form.validateFields()
            .then((value)=> {
                new ApiService({
                    url:`/api/taxonomy`,
                    body: {
                        name: value?.name ?? null,
                        parentId: value?.parentId ?? null
                    }
                })
                    .post()
                    .then((response)=> {
                        if(!response?.error){
                            message.success({
                                content:response?.message ?? "Successfully!",
                                duration:5,
                                key:'updatable'
                            })
                        }else{
                            message.error({
                                content: response?.message ?? "Some Error",
                                duration:5,
                                key: 'updatable'
                            })
                        }
                        setLoading(false)
                    })
                    .catch((err)=> {
                        message.error({
                            content: err?.message ?? "Some Error",
                            duration:5,
                            key: 'updatable'
                        })
                        setLoading(false)
                    })

            })
            .catch((err)=> {
                setLoading(false)
            })
    }

    return (
        <React.Fragment>
            <MetaHead
                head={{
                    title:"Create Taxonomy | @2023"
                }}
            />
            <PageHeadAlt
                icon={{
                    src:'/ant-logo.png',
                    element:<SkinOutlined style={{fontSize:30}} />
                }}
                extra={
                    <div className="flex item-center text-right gap-4">
                        <Button onClick={onGoBack} size={'large'}>Discard</Button>
                        <Button type={'primary'} onClick={onFinish} size={'large'} loading={loading}>Add</Button>
                    </div>
                }
                title={'Create Taxonomy'}
            />
            <ContainerLayout className={'my-4'}>
                <Form
                    form={form}
                    initialValue={{
                        name: null,
                        parentId: null
                    }}
                    layout={'vertical'}
                >
                    <Card loading={false}>
                        <Form.Item name={'name'} label={'Taxonomy Name'} rules={[{required:true,message: "Can't be empty!"}]}>
                            <Input placeholder={'input product name'}/>
                        </Form.Item>
                        <Form.Item name={'parentId'} label={'Parent Taxonomy'} rules={[{required:data.length > 0,message: "Can't be empty!"}]}>
                            <Select>
                                {
                                    Array.isArray(data) && data.length > 0 ?
                                        data.map((item,index)=> {
                                            return (
                                                <Select.Option value={item?.id}>
                                                    {item?.name}
                                                </Select.Option>
                                            )
                                        }):null
                                }
                                <Select.Option>

                                </Select.Option>
                            </Select>
                        </Form.Item>
                    </Card>
                </Form>
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
            limit:100,
            max_page:0,
            total:0
        },
        params: {
            page:1,
            limit:100
        },
        data: []
    }

    await new ApiService({
        url:'/api/taxonomy',
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