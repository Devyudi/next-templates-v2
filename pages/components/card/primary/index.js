/*******************************************************************************
 * @author Mochamad Yudi Sobari
 * @github https://github.com/mochamadyudi
 * @email yuyuid.id12@gmail.com
 * @contact +6285718851007
 ******************************************************************************/

import React from 'react'
import {ContainerLayout, WrapperLayout} from "@moonlay/src/components/shared-layout";
import MetaHead from "@moonlay/src/components/shared-layout/meta.head";
import PageHeadAlt from "@moonlay/src/components/shared-component/hero/page-head-alt";
import BreadcrumbCustom from "@moonlay/src/components/shared-component/breadcrumbs/breadcrumbs-custom";
import {Card, Col, Divider, Row} from "antd";

export default function Index(){
    return (
        <WrapperLayout>
            <MetaHead
                head={{
                    title: 'Card - Primary | Moonlay'
                }}
            />
            <PageHeadAlt
                icon={{
                    src:'/ant-logo.png'
                }}
                title={'Card | Primary'}
                description={'Lorem ipsum dolor sit amet'}
            />
            <ContainerLayout className={'space-y-4'}>
                <BreadcrumbCustom/>

                <Card bordered={false} title={'Grid Basic'}>
                    <div className="w-full space-y-4">
                        <Row>
                            <Col span={24}>
                                <div className="w-full bg-blue-500 h-10 text-white flex items-center justify-center">
                                    col
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={12}>
                                <div className="w-full bg-blue-500 h-10 text-white flex items-center justify-center">
                                    col-12
                                </div>
                            </Col>
                            <Col span={12}>
                                <div className="w-full bg-blue-200 h-10 text-white flex items-center justify-center">
                                    col-12
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={8}>
                                <div className="w-full bg-blue-500 h-10 text-white flex items-center justify-center">
                                    col-8
                                </div>
                            </Col>
                            <Col span={8}>
                                <div className="w-full bg-blue-400 h-10 text-white flex items-center justify-center">
                                    col-8
                                </div>
                            </Col>
                            <Col span={8}>
                                <div className="w-full bg-blue-200 h-10 text-white flex items-center justify-center">
                                    col-8
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={6}>
                                <div className="w-full bg-blue-600 h-10 text-white flex items-center justify-center">
                                    col-6
                                </div>
                            </Col>
                            <Col span={6}>
                                <div className="w-full bg-blue-500 h-10 text-white flex items-center justify-center">
                                    col-6
                                </div>
                            </Col>
                            <Col span={6}>
                                <div className="w-full bg-blue-400 h-10 text-white flex items-center justify-center">
                                    col-6
                                </div>
                            </Col>
                            <Col span={6}>
                                <div className="rounded-lg w-full bg-blue-300 h-10 text-white flex items-center justify-center">
                                    col-6
                                </div>
                            </Col>
                        </Row>
                    </div>
                </Card>

                <Card bordered={false} title={'Grid | Gutter Responsive'}>
                    <div className="w-full space-y-4">

                        <Divider orientation="left">Horizontal</Divider>
                        <Row gutter={16}>
                            <Col className="gutter-row" span={6}>
                                <div className="rounded-lg w-full bg-blue-300 h-10 text-white flex items-center justify-center">
                                    col-6
                                </div>
                            </Col>
                            <Col className="gutter-row" span={6}>
                                <div className="rounded-lg w-full bg-blue-300 h-10 text-white flex items-center justify-center">
                                    col-6
                                </div>
                            </Col>
                            <Col className="gutter-row" span={6}>
                                <div className="rounded-lg w-full bg-blue-300 h-10 text-white flex items-center justify-center">
                                    col-6
                                </div>
                            </Col>
                            <Col className="gutter-row" span={6}>
                                <div className="rounded-lg w-full bg-blue-300 h-10 text-white flex items-center justify-center">
                                    col-6
                                </div>
                            </Col>
                        </Row>



                        <Divider orientation="left">Responsive</Divider>
                        <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 24}}>
                            <Col
                                xs={{
                                    span:24,
                                }}
                                sm={{
                                    span:12,
                                }}
                                md={{
                                    span:8,
                                }}
                                lg={{
                                    span:6,
                                }}

                            >
                                <div className="rounded-lg w-full bg-blue-300 h-10 text-white flex items-center justify-center">
                                    col-6
                                </div>
                            </Col>
                            <Col
                                xs={{
                                    span:24,
                                }}
                                sm={{
                                    span:12,
                                }}
                                md={{
                                    span:8,
                                }}
                                lg={{
                                    span:6,
                                }}

                            >
                                <div className="rounded-lg w-full bg-blue-300 h-10 text-white flex items-center justify-center">
                                    col-6
                                </div>
                            </Col>
                            <Col
                                xs={{
                                    span:24,
                                }}
                                sm={{
                                    span:12,
                                }}
                                md={{
                                    span:8,
                                }}
                                lg={{
                                    span:6,
                                }}

                            >
                                <div className="rounded-lg w-full bg-blue-300 h-10 text-white flex items-center justify-center">
                                    col-6
                                </div>
                            </Col>
                            <Col
                                xs={{
                                    span:24,
                                }}
                                sm={{
                                    span:12,
                                }}
                                md={{
                                    span:8,
                                }}
                                lg={{
                                    span:6,
                                }}

                            >
                                <div className="rounded-lg w-full bg-blue-300 h-10 text-white flex items-center justify-center">
                                    col-6
                                </div>
                            </Col>
                        </Row>



                        <Divider orientation="left">Vertical</Divider>
                        <Row gutter={[16, 24]}>
                            <Col className="gutter-row" span={6}>
                                <div className="rounded-lg w-full bg-blue-300 h-10 text-white flex items-center justify-center">
                                    col-6
                                </div>
                            </Col>
                            <Col className="gutter-row" span={6}>
                                <div className="rounded-lg w-full bg-blue-300 h-10 text-white flex items-center justify-center">
                                    col-6
                                </div>
                            </Col>
                            <Col className="gutter-row" span={6}>
                                <div className="rounded-lg w-full bg-blue-300 h-10 text-white flex items-center justify-center">
                                    col-6
                                </div>
                            </Col>
                            <Col className="gutter-row" span={6}>
                                <div className="rounded-lg w-full bg-blue-300 h-10 text-white flex items-center justify-center">
                                    col-6
                                </div>
                            </Col>
                            <Col className="gutter-row" span={6}>
                                <div className="rounded-lg w-full bg-blue-300 h-10 text-white flex items-center justify-center">
                                    col-6
                                </div>
                            </Col>
                            <Col className="gutter-row" span={6}>
                                <div className="rounded-lg w-full bg-blue-300 h-10 text-white flex items-center justify-center">
                                    col-6
                                </div>
                            </Col>
                            <Col className="gutter-row" span={6}>
                                <div className="rounded-lg w-full bg-blue-300 h-10 text-white flex items-center justify-center">
                                    col-6
                                </div>
                            </Col>
                            <Col className="gutter-row" span={6}>
                                <div className="rounded-lg w-full bg-blue-300 h-10 text-white flex items-center justify-center">
                                    col-6
                                </div>
                            </Col>
                        </Row>
                    </div>
                </Card>


                <Card bordered={false} title={'Grid | Column Offset'}>
                    <div className="w-full space-y-4">
                        <Row>
                            <Col span={8}>
                                <div className={'rounded-lg w-full h-10 bg-blue-500 text-white flex items-center justify-center'}>
                                    col-8
                                </div>
                            </Col>
                            <Col span={8} offset={8}>
                                <div className={'rounded-lg w-full h-10 bg-blue-500 text-white flex items-center justify-center'}>
                                    col-8 offset-8
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={6} offset={6}>
                                <div className={'rounded-lg w-full h-10 bg-blue-500 text-white flex items-center justify-center'}>
                                    col-6 col-offset-6
                                </div>
                            </Col>
                            <Col span={6} offset={6}>
                                <div className={'rounded-lg w-full h-10 bg-blue-500 text-white flex items-center justify-center'}>
                                    col-6 col-offset-6
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            <Col span={12} offset={6}>
                                <div className={'rounded-lg w-full h-10 bg-blue-500 text-white flex items-center justify-center'}>
                                    col-12 col-offset-6
                                </div>
                            </Col>
                        </Row>
                    </div>
                </Card>
                <Card bordered={false} title={'Grid | Sort'}>
                    <div className="w-full space-y-4">
                        <Row gutter={24}>
                            <Col span={18} push={6}>
                                <div className={'rounded-lg w-full h-10 bg-blue-500 text-white flex items-center justify-center'}>
                                    col-18 col-push-6
                                </div>

                            </Col>
                            <Col span={6} pull={18}>
                                <div className={'rounded-lg w-full h-10 bg-blue-500 text-white flex items-center justify-center'}>
                                    col-6 col-pull-18
                                </div>
                            </Col>
                        </Row>
                    </div>
                </Card>

            </ContainerLayout>
        </WrapperLayout>
    )
}