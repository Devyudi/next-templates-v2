import React, {useState,useEffect} from 'react'
import {ContainerLayout, WrapperLayout} from "@moonlay/src/components/shared-layout";
import { DownOutlined, SmileOutlined } from '@ant-design/icons';
import { Dropdown, Space,Button,Card, message } from 'antd';
import MetaHead from "@moonlay/src/components/shared-layout/meta.head";
import PageHeadAlt from "@moonlay/src/components/shared-component/hero/page-head-alt";
import BreadcrumbCustom from "@moonlay/src/components/shared-component/breadcrumbs/breadcrumbs-custom";


import {  UserOutlined } from '@ant-design/icons';
import { Tooltip } from 'antd';

export default function(){
    const [items] = useState([
        {
            key: '1',
            label: (
                <a target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
                    1st menu item
                </a>
            ),
        },
        {
            key: '2',
            label: (
                <a target="_blank" rel="noopener noreferrer" href="https://www.aliyun.com">
                    2nd menu item (disabled)
                </a>
            ),
            icon: <SmileOutlined />,
            disabled: true,
        },
        {
            key: '3',
            label: (
                <a target="_blank" rel="noopener noreferrer" href="https://www.luohanacademy.com">
                    3rd menu item (disabled)
                </a>
            ),
            disabled: true,
        },
        {
            key: '4',
            danger: true,
            label: 'a danger item',
        },
    ])

    const handleButtonClick = (e) => {
        message.info('Click on left button.');
        console.log('click left button', e);
    };
    const handleMenuClick = (e) => {
        message.info('Click on menu item.');
        console.log('click', e);
    };


    const menuProps = {
        items,
        onClick: handleMenuClick,
    };

    return(
        <>
            <MetaHead
                head={{
                    title: 'Ant Design Dropdown'
                }}
            />
            <PageHeadAlt
                icon={{
                    element:null,
                    src:'/ant-logo.png'
                }}
                title={'Ant Design | Dropdown'}
                description={'Lorem ipsum dolor sit amet'}
            />

            <ContainerLayout className={'space-y-4'}>

                <BreadcrumbCustom/>

                <Card title={'Basic'} bordered={false}>
                    <Dropdown menu={{ items }}>
                        <a onClick={(e) => e.preventDefault()}>
                            <Space>
                                Hover me
                                <DownOutlined />
                            </Space>
                        </a>
                    </Dropdown>
                </Card>

                <Card title={'Basic'} bordered={false} className={'gap-4'}>
                    <Dropdown menu={{ items }} placement="bottomLeft" arrow>
                        <Button>bottomLeft</Button>
                    </Dropdown>
                    <Dropdown menu={{ items }} placement="bottom" arrow>
                        <Button>bottom</Button>
                    </Dropdown>
                    <Dropdown menu={{ items }} placement="bottomRight" arrow>
                        <Button>bottomRight</Button>
                    </Dropdown>
                    <br />
                    <Dropdown menu={{ items }} placement="topLeft" arrow>
                        <Button>topLeft</Button>
                    </Dropdown>
                    <Dropdown menu={{ items }} placement="top" arrow>
                        <Button>top</Button>
                    </Dropdown>
                    <Dropdown menu={{ items }} placement="topRight" arrow>
                        <Button>topRight</Button>
                    </Dropdown>
                </Card>


                <Card bordered={false} title={'Button with Dropdown'}>
                    <Space wrap>
                        <Dropdown.Button menu={menuProps} onClick={handleButtonClick}>
                            Dropdown
                        </Dropdown.Button>
                        <Dropdown.Button menu={menuProps} placement="bottom" icon={<UserOutlined />}>
                            Dropdown
                        </Dropdown.Button>
                        <Dropdown.Button menu={menuProps} onClick={handleButtonClick} disabled>
                            Dropdown
                        </Dropdown.Button>
                        <Dropdown.Button
                            menu={menuProps}
                            buttonsRender={([leftButton, rightButton]) => [
                                <Tooltip title="tooltip" key="leftButton">
                                    {leftButton}
                                </Tooltip>,
                                React.cloneElement(rightButton, {
                                    loading: true,
                                }),
                            ]}
                        >
                            With Tooltip
                        </Dropdown.Button>
                        <Dropdown menu={menuProps}>
                            <Button>
                                <Space>
                                    Button
                                    <DownOutlined />
                                </Space>
                            </Button>
                        </Dropdown>
                        <Dropdown.Button menu={menuProps} onClick={handleButtonClick} danger>
                            Danger
                        </Dropdown.Button>
                    </Space>
                </Card>

            </ContainerLayout>
        </>
    )
}