/*******************************************************************************
 * @author Mochamad Yudi Sobari
 * @github https://github.com/mochamadyudi
 * @email yuyuid.id12@gmail.com
 * @contact +6285718851007
 ******************************************************************************/

import React, {useState} from 'react'
import { PoweroffOutlined } from '@ant-design/icons';
import {Button, Row, Col,Tooltip, Card, Dropdown,Breadcrumb,Typography,Divider, Radio, Space} from 'antd'
import { SearchOutlined,DownloadOutlined } from '@ant-design/icons';
import {ContainerLayout, WrapperLayout} from "@moonlay/src/components/shared-layout";
import {useRouter} from "next/router";
import MetaHead from "@moonlay/src/components/shared-layout/meta.head";
import BreadcrumbCustom from "@moonlay/src/components/shared-component/breadcrumbs/breadcrumbs-custom";
import PageHeadAlt from "@moonlay/src/components/shared-component/hero/page-head-alt";


export default function Index(props) {
    const [size, setSize] = useState('large'); // default is 'middle'

    const [loadings, setLoadings] = useState([]);
    const enterLoading = (index) => {
        setLoadings((prevLoadings) => {
            const newLoadings = [...prevLoadings];
            newLoadings[index] = true;
            return newLoadings;
        });
        setTimeout(() => {
            setLoadings((prevLoadings) => {
                const newLoadings = [...prevLoadings];
                newLoadings[index] = false;
                return newLoadings;
            });
        }, 6000);
    };

    return (
        <>
            <MetaHead
                head={{
                    title: 'Ant Design Button | Moonlay'
                }}
            />
            <PageHeadAlt
                icon={{
                    element:null,
                    src:'/ant-logo.png'
                }}
                title={'Ant Design | Button'}
                description={'Lorem ipsum dolor sit amet'}
            />

            <ContainerLayout>
                <BreadcrumbCustom/>

                <Card className={'mb-2'} title={'Basic'}>
                    <div className="flex flex-wrap gap-4">

                        <Button type="dashed">Dashed Button</Button>
                        <Button type="primary">Primary Button</Button>
                        <Button>Default Button</Button>
                        <Button type="dashed">Dashed Button</Button>
                        <Button type="text">Text Button</Button>
                        <Button type="link">Link Button</Button>
                    </div>

                </Card>

                <Card className={'mb-2'} title={'Icon'}>
                    <div className="flex flex-wrap gap-4">
                        <Tooltip title="search">
                            <Button type="primary" shape="circle" icon={<SearchOutlined />} />
                        </Tooltip>
                        <Button type="primary" shape="circle">
                            A
                        </Button>
                        <Button type="primary" icon={<SearchOutlined />}>
                            Search
                        </Button>
                        <Tooltip title="search">
                            <Button shape="circle" icon={<SearchOutlined />} />
                        </Tooltip>
                        <Button icon={<SearchOutlined />}>Search</Button>
                    </div>
                </Card>

                <Card className={'mb-2'} title={'Sizing Button'}>
                    <Radio.Group value={size} onChange={(e) => setSize(e.target.value)}>
                        <Radio.Button value="large">Large</Radio.Button>
                        <Radio.Button value="default">Default</Radio.Button>
                        <Radio.Button value="small">Small</Radio.Button>
                    </Radio.Group>
                    <Divider orientation="left" plain>
                        Preview
                    </Divider>
                    <Space direction="vertical">
                        <Space wrap>
                            <Button type="primary" size={size}>
                                Primary
                            </Button>
                            <Button size={size}>Default</Button>
                            <Button type="dashed" size={size}>
                                Dashed
                            </Button>
                        </Space>
                        <Button type="link" size={size}>
                            Link
                        </Button>
                        <Space wrap>
                            <Button type="primary" icon={<DownloadOutlined />} size={size} />
                            <Button type="primary" shape="circle" icon={<DownloadOutlined />} size={size} />
                            <Button type="primary" shape="round" icon={<DownloadOutlined />} size={size} />
                            <Button type="primary" shape="round" icon={<DownloadOutlined />} size={size}>
                                Download
                            </Button>
                            <Button type="primary" icon={<DownloadOutlined />} size={size}>
                                Download
                            </Button>
                        </Space>
                    </Space>
                </Card>

                <Card className={'mb-2'} title={'Danger Button'}>
                    <Space wrap>
                        <Button type="primary" danger>
                            Primary
                        </Button>
                        <Button danger>Default</Button>
                        <Button type="dashed" danger>
                            Dashed
                        </Button>
                        <Button type="text" danger>
                            Text
                        </Button>
                        <Button type="link" danger>
                            Link
                        </Button>
                    </Space>
                </Card>


                <Row gutter={24}>
                    <Col span={12}>
                        <Card className={'mb-2'} title={'Multiple Button'}>
                            <Space direction="vertical">
                                <Button type="primary">primary</Button>
                                <Button>secondary</Button>
                                <Dropdown.Button
                                    menu={{
                                        items:[{
                                            key: '1',
                                            label: '1st item',
                                        },
                                            {
                                                key: '2',
                                                label: '2nd item',
                                            },
                                            {
                                                key: '3',
                                                label: '3rd item',
                                            },],
                                        onClick: function(){},
                                    }}
                                >
                                    Actions
                                </Dropdown.Button>
                            </Space>
                        </Card>
                    </Col>
                    <Col span={12}>
                        <Card className={'mb-2'} title={'Loading'}>
                            <Space direction="vertical">
                                <Space wrap>
                                    <Button type="primary" loading>
                                        Loading
                                    </Button>
                                    <Button type="primary" size="small" loading>
                                        Loading
                                    </Button>
                                    <Button type="primary" icon={<PoweroffOutlined />} loading />
                                </Space>

                                <Space wrap>
                                    <Button type="primary" loading={loadings[0]} onClick={() => enterLoading(0)}>
                                        Click me!
                                    </Button>
                                    <Button
                                        type="primary"
                                        icon={<PoweroffOutlined />}
                                        loading={loadings[1]}
                                        onClick={() => enterLoading(1)}
                                    >
                                        Click me!
                                    </Button>
                                    <Button
                                        type="primary"
                                        icon={<PoweroffOutlined />}
                                        loading={loadings[2]}
                                        onClick={() => enterLoading(2)}
                                    />
                                </Space>
                            </Space>
                        </Card>
                    </Col>
                </Row>


            </ContainerLayout>
        </>
    )
}