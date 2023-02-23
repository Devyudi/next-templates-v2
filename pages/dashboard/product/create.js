import React, {useState, useEffect} from 'react'
import MetaHead from "@moonlay/src/components/shared-layout/meta.head";
import {ContainerLayout} from "@moonlay/src/components/shared-layout";
import {Card, Form, Input, Row, Col, Button, Tooltip, Image, Avatar, message, Upload, Select} from "antd";
import { SkinOutlined } from '@ant-design/icons'
import {LoadingOutlined, UploadOutlined} from "@ant-design/icons";
import PageHeadAlt from "@moonlay/src/components/shared-component/hero/page-head-alt";
import {NumericInput} from "@moonlay/src/components/shared-component";
import {useRouter} from "next/router";
import Helpers from "@moonlay/helpers";
import ApiService from "@moonlay/src/lib/services/api.service";
import {getSession} from "next-auth/react";




const beforeUpload = file => {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
}

export default function Index(props){
    let { token,taxonomy } = props

    const [ form ] = Form.useForm()
    const route = useRouter()

    const [value, setValue] = useState('');
    const [imgAvatar,setImgAvatar] = useState('/image-not-found.png')
    const [fileList, setFileList] = useState(null)
    const onGoBack = ()=> route.back()
    const onFinish = ()=> {
        form.validateFields()
            .then(async (value)=> {
                // _call api
                const formData = new FormData();
                formData.append('file',fileList);
                formData.append('product[name]',value?.product?.name)
                formData.append('product[description]',value?.product?.description)
                formData.append('product[price]',value?.product?.price)
                formData.append('taxonomyId',value?.taxonomyId)

                await new ApiService({
                    url:'/api/product',
                    body: formData,
                    config:{
                        headers:{
                            Authorization: token ? ['Bearer', token].join(' '): null,
                            'Content-Type': 'multipart/formdata'
                        }
                    }
                }).post()
                    .then((response)=> {
                        console.log(response,'RESPONSE')
                    })
                    .catch((err)=> {
                        console.log(err,'ERR')
                    })
                // insert database
                console.log(value)
            })
            .catch((err)=> {
                console.log(err)
            })
    }



    const onPreview = async (file) => {
        let src = file.url;
        if (!src) {
            src = await new Promise(resolve => {
                const reader = new FileReader();
                reader.readAsDataURL(file.originFileObj);
                reader.onload = () => resolve(reader.result);
            });
        }
        const image = new Image();
        image.src = src;
        const imgWindow = window.open(src);
        imgWindow?.document.write(image.outerHTML);
    };

    const [uploadProgress, setUploadProgress] = useState(0)

    const [uploadConf] = useState({
        name: 'file',
        multiple: false,
        customRequest: async ({file, onSuccess}) => {
            setFileList(file)
            onSuccess('ok')
        },
        onPreview: onPreview,
        showUploadList: false
    })


    let key = 'updatable'
    const onChangeUpload = (info) => {
        if (info.file.status === 'uploading') {
            message.loading({content: "Loading...", key})
            return;
        }
        if (info.file.status === 'done') {
            Helpers.getBase64(info.file.originFileObj, imageUrl => {
                setTimeout(() => {
                    setImgAvatar(imageUrl)
                    message.success({content: "Success Uploaded", key, duration: 2})
                }, 2000)
            });
        }
    }


    console.log(taxonomy,'TAXONOMY')
    return (
        <React.Fragment>
            <MetaHead
                head={{
                    title:"Create Product | @2023"
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
                        <Button type={'primary'} onClick={onFinish} size={'large'}>Add</Button>
                    </div>
                }
                title={'Create Product'}
            />
            <ContainerLayout className={'my-4'}>
                <Form
                    form={form}
                    layout={'vertical'}
                >


                    <Row gutter={24}>
                        <Col span={16}>
                            <Card loading={false}>
                                <Form.Item name={['product','name']} label={'Product Name'} rules={[{required:true,message: "Can't be empty!"}]}>
                                    <Input placeholder={'input product name'}/>
                                </Form.Item>
                                <Form.Item name={['product','description']} label={'Product Description'} rules={[{required:true,message: "Can't be empty!"}]}>
                                    <Input placeholder={'input product Description'}/>
                                </Form.Item>
                                <Form.Item name={['product','price']} label={'Price'} rules={[{required:true,message: "Can't be empty!"}]}>
                                    <NumericInput style={{ width: 120 }} value={value} onChange={setValue} />
                                </Form.Item>
                            </Card>
                        </Col>
                        <Col span={8}>
                            <div className="space-y-4">
                                <Card>
                                    <Row gutter={24}>
                                        <Col xs={24} lg={24} className={'mb-4 flex items-center justify-center'}>

                                            <Image
                                                width={180}
                                                fallback={[process.env.NEXT_PUBLIC_APP_DOMAIN,'image-not-found.png'].join('/')}
                                                placeholder={
                                                    <div className="w-full h-full flex items-center justify-center">
                                                        <LoadingOutlined/>
                                                    </div>
                                                }
                                                height={180}
                                                style={{
                                                    objectFit: "cover"
                                                }}
                                                src={imgAvatar}
                                            />
                                        </Col>
                                        <Col xs={24} lg={24}>
                                            <div className="flex items-center justify-center">
                                                <Upload {...uploadConf} multiple={false} beforeUpload={beforeUpload}
                                                        onChange={(e) => onChangeUpload(e)}>
                                                    <Button icon={<UploadOutlined/>} className={'border'}
                                                            style={{minWidth: "100% !important"}}>Click to Upload</Button>
                                                </Upload>
                                            </div>
                                        </Col>
                                    </Row>
                                </Card>
                                <Card>
                                    <Form.Item name={'taxonomyId'} label={'Taxonomy'} rules={[{required:true,message: "Can't be empty!"}]}>
                                        <Select>
                                            {
                                                Array.isArray(taxonomy) && taxonomy.length > 0  &&
                                                taxonomy.map((item,index)=> {
                                                    return (
                                                        <Select.Option value={item?.id} key={item?.id}>
                                                            {item?.name}
                                                        </Select.Option>
                                                    )
                                                })
                                            }
                                        </Select>
                                    </Form.Item>
                                </Card>
                            </div>
                        </Col>
                    </Row>

                </Form>
            </ContainerLayout>
        </React.Fragment>
    )
}

export async function getServerSideProps(ctx){
    const token = await getSession({
        req:ctx.req,
        secret: process.env.NEXTAUTH_SECRET,
        secureCookie: false
    })
    if(!token){
        return {
            redirect: {
                destination: '/auth/login',
                permanent: false
            }
        }
    }

    let taxonomy = []

    await new ApiService({
        url:`/api/taxonomy`,
        config: {
            // headers: {
            //     Authorization: ['Bearer', token?.user?.token].join(' ')
            // },
            params: {
                page:1,
                limit:10
            }
        }
    }).get().then((response)=> {
        taxonomy = response?.data ?? []
    })
        .catch((err)=> {
            taxonomy = []
        })
    console.log(taxonomy,'TAXONOMYS')
    return {
        props : {
            token: token?.user?.token ?? null,
            taxonomy: taxonomy
        }
    }
}