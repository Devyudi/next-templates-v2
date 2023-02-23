import React from 'react'
import PropTypes from 'prop-types'
import {ChildrenLayout} from "@moonlay/src/components/shared-layout";
import {Breadcrumb, Layout, Menu} from "antd";
import Link from 'next/link'
import {MenuDashboardMember} from "@moonlay/src/config";

const { Header, Content, Footer, Sider } = Layout;

export default function DashboardMember(props){
    let { menus } = props
    return(
        <Layout className="w-full">
            <Header>
                <div className="logo"/>
            </Header>
            <Content>
                <Layout>
                    <Sider
                        width={200}
                    >
                        <Menu
                            className={'menu--dashboard'}
                            mode="inline"
                            style={{
                                height: '100%',
                            }}
                        >
                            {
                                Array.isArray(MenuDashboardMember) && MenuDashboardMember.length > 0 &&
                                MenuDashboardMember.map((cObj,cKey)=> {
                                    return Array.isArray(cObj?.submenu) &&  cObj?.submenu.length > 0 ?
                                        <Menu.SubMenu title={cObj?.label}>
                                            {cObj?.submenu.map((childTwo,childKey)=> {
                                                return (
                                                    <Menu.Item>
                                                        <span>{childTwo?.label}</span>
                                                        <Link href={childTwo?.path}/>
                                                    </Menu.Item>
                                                )
                                            })}
                                        </Menu.SubMenu>
                                    : (
                                        <Menu.Item>
                                            <span>{cObj?.label}</span>
                                            <Link href={cObj?.path}/>
                                        </Menu.Item>
                                        )
                                })
                            }

                        </Menu>
                    </Sider>
                    <Content
                        style={{
                            padding: '0 24px',
                            minHeight: 280,
                        }}
                    >
                        <ChildrenLayout children={props?.children}/>
                    </Content>

                </Layout>

            </Content>
        </Layout>
    )
}

DashboardMember.propTypes = {
    menus: PropTypes.array.isRequired
}
DashboardMember.defaultProps = {
    menus : MenuDashboardMember
}