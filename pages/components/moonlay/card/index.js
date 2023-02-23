/*******************************************************************************
 * @author Mochamad Yudi Sobari
 * @github https://github.com/mochamadyudi
 * @email yuyuid.id12@gmail.com
 * @contact +6285718851007
 ******************************************************************************/

import React, {useState} from 'react'
import axios from 'axios';
import {ContainerLayout, WrapperLayout} from "@moonlay/src/components/shared-layout";
import MetaHead from "@moonlay/src/components/shared-layout/meta.head";
import PageHeadAlt from "@moonlay/src/components/shared-component/hero/page-head-alt";
import BreadcrumbCustom from "@moonlay/src/components/shared-component/breadcrumbs/breadcrumbs-custom";
import {Col, Divider,Pagination, Card, Row, Button, Empty,message} from "antd";
import * as CardMoonlay from "@moonlay/src/components/shared-component";
import {PoweroffOutlined} from "@ant-design/icons";

export default function Index(props) {

    const [loadings, setLoadings] = useState([]);
    const [data,setData] = useState(()=> {
        if(Array.isArray(props?.data) && props?.data.length > 0){
            return props?.data
        }
        return []
    });
    const [pagination,setPagination] = useState(()=>{
        if(props?.pagination){
            return props?.pagination
        }
        return {
            page:1,
            limit:10,
            max_page:0,
            total:0
        }
    })
    const enterLoading = (index) => {
        setLoadings((prevLoadings) => {
            const newLoadings = [...prevLoadings];
            newLoadings[index] = true;
            return newLoadings;
        });
        message.loading({
            content:'Loading...',
            duration:1000,
            key:`updatable-${index}`,
            style:{
                top:'100px'
            }
        })

        //action api

        setTimeout(() => {
            message.success({
                content:'Successfully!',
                key:`updatable-${index}`,
                style:{
                    top:'100px'
                }
            })
            setLoadings((prevLoadings) => {
                const newLoadings = [...prevLoadings];
                newLoadings[index] = false;
                return newLoadings;
            });
        }, 1000);

    }




    return (
        <>
            <MetaHead
                head={{
                    title: 'Card | Moonlay'
                }}
            />
            <PageHeadAlt
                icon={{
                    text: 'Moonlay'
                }}
                title={'Card | Moonlay'}
                description={'Lorem ipsum dolor sit amet'}
            />
            <ContainerLayout className={'space-y-4'}>
                <BreadcrumbCustom/>

                <Card bordered={false} title={'Card Primary'}>
                    <div className="w-full">
                        <Row gutter={[24,24]}>
                            {
                                Array.isArray(data) && data.length > 0 ?
                                    data.map((item,index)=>{
                                        return (
                                            <Col span={6} key={`card-product-list-${index + 1}`}>
                                                <CardMoonlay.Card.Product
                                                    title={item?.name ??''}
                                                    images={{
                                                        src: item?.thumbnail,
                                                        alt: 'image-dummy',
                                                        fallback: 'logo-next.png'
                                                    }}
                                                    url={['/product',item?.id,item?.slug].join('/')}
                                                    price={{
                                                        prefix:'Rp',
                                                        total:item?.price
                                                    }}
                                                    ExtraAction={
                                                        <Button
                                                            type="primary"
                                                            // icon={<PoweroffOutlined />}
                                                            loading={loadings[index]}
                                                            onClick={() => enterLoading(index)}
                                                        >
                                                            Beli
                                                        </Button>
                                                    }
                                                />
                                            </Col>
                                        )
                                    })
                                    :(
                                        <Col span={24}>
                                            <Empty/>
                                        </Col>
                                    )
                            }
                        </Row>
                        <div className="w-full py-6 flex items-center justify-center">
                            <Pagination defaultCurrent={6} total={500} />
                        </div>
                    </div>
                </Card>

            </ContainerLayout>
        </>
    )
}

export async function getServerSideProps({req}){
    const data = await axios.get([process.env.NEXT_PUBLIC_APP_DOMAIN,'product.json'].join('/'), {})
        .then((response)=> {
            return response?.data ?? []
        })
        .catch((err)=> {
            return []
        })

    return {
        props: {
            data: data ?? [],
            pagination:{
                page:1,
                limit:10,
                max_page:15,
                total:150
            }
        }
    }
}