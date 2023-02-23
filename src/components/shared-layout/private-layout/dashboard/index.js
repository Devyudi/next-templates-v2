import React, { Component } from 'react'
import PropTypes from 'prop-types'
import {ChildrenLayout} from "@moonlay/src/components/shared-layout";
import { LaptopOutlined, NotificationOutlined, UserOutlined } from '@ant-design/icons';
import { Breadcrumb, Layout, Menu, theme } from 'antd';
import DashboardAdmin from "@moonlay/src/components/shared-layout/private-layout/dashboard/dashboard.admin";
import DashboardMember from "@moonlay/src/components/shared-layout/private-layout/dashboard/dashboard.member";
import DashboardDefault from "@moonlay/src/components/shared-layout/private-layout/dashboard/dashboard.default";
const { Header, Content, Footer, Sider } = Layout;

export default class Dashboard extends Component{
    static Admin = DashboardAdmin

    static Member = DashboardMember
    static Default = DashboardDefault
    render(){
        return (
            <Layout className="w-full">
                <Header>
                    <div className="w-20 h-20 bg-red-500">
                        <p>logo</p>
                    </div>
                </Header>
                <Content>
                    <Layout>
                        <Sider
                            width={200}
                        >
                            <Menu
                                mode="inline"
                                defaultSelectedKeys={['1']}
                                defaultOpenKeys={['sub1']}
                                style={{
                                    height: '100%',
                                }}
                                items={[]}
                            />
                        </Sider>
                        <Content
                            style={{
                                padding: '0 24px',
                                minHeight: 280,
                            }}
                        >
                            <ChildrenLayout children={this.props?.children}/>
                        </Content>

                    </Layout>

                </Content>
            </Layout>
        )
    }
}

Dashboard.propTypes = {
    menu: PropTypes.arrayOf(
        PropTypes.shape({
            key: PropTypes.any.isRequired,
            url: PropTypes.string.isRequired,
            label: PropTypes.string.isRequired,
            icon: PropTypes.oneOfType([
                PropTypes.node,
                PropTypes.element,
                PropTypes.func
            ]),
            submenu: PropTypes.arrayOf(
                PropTypes.shape({
                    key: PropTypes.any.isRequired,
                    url: PropTypes.string.isRequired,
                    label: PropTypes.string.isRequired,
                    icon: PropTypes.oneOfType([
                        PropTypes.node,
                        PropTypes.element,
                        PropTypes.func
                    ]),
                    submenu: PropTypes.array
                }).isRequired
            )
        }).isRequired
    ).isRequired
}
Dashboard.defaultProps = {
    menu: []
}
