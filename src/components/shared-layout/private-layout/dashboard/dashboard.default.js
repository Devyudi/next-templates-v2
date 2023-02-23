import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import {Button, Layout, Menu, Switch} from "antd";
import Link from "next/link";
import {ChildrenLayout} from "@moonlay/src/components/shared-layout";
import {MenuOutlined,CloseCircleOutlined,
    CheckOutlined,
    CloseOutlined
} from "@ant-design/icons";
import {ThemeCollapse} from "@moonlay/src/redux/actions";
import NavbarRightAuth from "@moonlay/src/components/shared-layout/navbar/navbar-right/navbar-right.auth";

const { Header, Content, Footer, Sider } = Layout;
function DashboardDefault (props){
    let { menus, navCollapsed,ThemeCollapse } = props

    const getWidth = ()=> {
        return navCollapsed ? 100 : 200
    }
    return (
        <Layout className={`w-full`}>
            <Header className={'!p-0'}>
                <div className={`app-navbar ${navCollapsed?'app-navbar-collapse':''} flex items-center justify-between h-full w-full`}>
                    <div className="app-navbar-sider flex gap-2 px-4 items-center" style={{minWidth: getWidth()}}>
                        <div className="h-10 w-10 rounded-full"/>
                        <h1 className={'!text-lg font-bold'}>Core@2022</h1>
                    </div>
                    <div className="w-full h-full app-navbar-content flex items-center justify-between px-6">
                        <Button type={'link'} icon={!navCollapsed ? <MenuOutlined/> : <CloseCircleOutlined />} onClick={ThemeCollapse} size={'large'}/>

                        <div className="h-10 flex items-center justify-end gap-8">
                            <Switch
                                checkedChildren={<CheckOutlined />}
                                unCheckedChildren={<CloseOutlined />}
                                defaultChecked
                            />
                            <NavbarRightAuth/>
                        </div>
                    </div>
                </div>
            </Header>
            <Content>
                <Layout>
                    <Sider
                        width={getWidth()}
                    >
                        <Menu
                            className={'menu--dashboard'}
                            mode="inline"
                            style={{
                                height: '100%',
                            }}
                        >
                            {
                                Array.isArray(menus) && menus.length > 0 &&
                                menus.map((cObj,cKey)=> {
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
                        className={`app-content ${navCollapsed ? 'app-content-collapse' : ''}`}
                    >
                        <Layout>
                            <ChildrenLayout children={props?.children}/>
                        </Layout>
                    </Content>

                </Layout>

            </Content>
        </Layout>
    )
}
DashboardDefault.propTypes = {
    menus: PropTypes.array.isRequired,
}
DashboardDefault.defaultProps = {
    menus : []
}
export default connect(({theme})=> {
    let { navCollapsed } = theme
    return { navCollapsed }
},{ThemeCollapse})(React.memo(DashboardDefault))