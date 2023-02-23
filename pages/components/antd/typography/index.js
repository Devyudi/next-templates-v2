/*******************************************************************************
 * @author Mochamad Yudi Sobari
 * @github https://github.com/mochamadyudi
 * @email yuyuid.id12@gmail.com
 * @contact +6285718851007
 ******************************************************************************/

import React from 'react'
import {Row, Col,Space, Card,Typography} from 'antd'
import {ContainerLayout, WrapperLayout} from "@moonlay/src/components/shared-layout";
import MetaHead from "@moonlay/src/components/shared-layout/meta.head";
import PageHeadAlt from "@moonlay/src/components/shared-component/hero/page-head-alt";
import BreadcrumbCustom from "@moonlay/src/components/shared-component/breadcrumbs/breadcrumbs-custom";

export default function Index(props) {
    return (
        <>
            <MetaHead
                head={{
                    title: 'Ant Design Typography | Moonlay'
                }}
            />
            <PageHeadAlt
                icon={{
                    element:null,
                    src:'/ant-logo.png'
                }}
                title={'Ant Design | Typography'}
                description={'Lorem ipsum dolor sit amet'}
            />
            <ContainerLayout className={'space-y-4 pb-10'}>

                <BreadcrumbCustom/>

                <Card bordered={false} title={'Typography Title'}>
                    <Typography.Title>h1. Ant Design</Typography.Title>
                    <Typography.Title level={2}>h2. Ant Design</Typography.Title>
                    <Typography.Title level={3}>h3. Ant Design</Typography.Title>
                    <Typography.Title level={4}>h4. Ant Design</Typography.Title>
                    <Typography.Title level={5}>h5. Ant Design</Typography.Title>
                </Card>
                <Card bordered={false} title={'Typography Text'}>
                    <Space direction="vertical">
                        <Typography.Text>Ant Design (default)</Typography.Text>
                        <Typography.Text type="secondary">Ant Design (secondary)</Typography.Text>
                        <Typography.Text type="success">Ant Design (success)</Typography.Text>
                        <Typography.Text type="warning">Ant Design (warning)</Typography.Text>
                        <Typography.Text type="danger">Ant Design (danger)</Typography.Text>
                        <Typography.Text disabled>Ant Design (disabled)</Typography.Text>
                        <Typography.Text mark>Ant Design (mark)</Typography.Text>
                        <Typography.Text code>Ant Design (code)</Typography.Text>
                        <Typography.Text keyboard>Ant Design (keyboard)</Typography.Text>
                        <Typography.Text underline>Ant Design (underline)</Typography.Text>
                        <Typography.Text delete>Ant Design (delete)</Typography.Text>
                        <Typography.Text strong>Ant Design (strong)</Typography.Text>
                        <Typography.Text italic>Ant Design (italic)</Typography.Text>
                        <Typography.Link href="https://ant.design" target="_blank">
                            Ant Design (Link)
                        </Typography.Link>
                    </Space>
                </Card>

            </ContainerLayout>
        </>
    )
}