import { Poppins } from "@next/font/google";
import {ContainerLayout} from "@moonlay/src/components/shared-layout";
import {ConfigMenu} from "@moonlay/src/config";
import Link from "next/link";
import  {Menu} from 'antd';
import NavbarRight from "@moonlay/src/components/shared-layout/navbar/navbar-right";
import {EyeOutlined} from "@ant-design/icons";

const poppins = Poppins({weight:'400',subsets: ['latin']})
const TopBarDesktop = () => {
    return (
        <div className="w-full">
            <Menu mode="horizontal" className={'w-full border-0'}>
                {
                    ConfigMenu.map((child, i) => {

                        return Array.isArray(child?.submenu) && child?.submenu.length === 0 ?
                            <Menu.Item key={child?.key} className={poppins?.className}>
                                <span>{child?.label}</span>
                                <Link href={child?.path}/>
                            </Menu.Item>
                            : (
                                <Menu.SubMenu
                                    className={poppins?.className}
                                    disabled={child?.disabled ?? false}
                                    key={child?.key}
                                    title={child?.label}
                                >
                                    {
                                        child?.submenu.map((item, key) => {
                                            return Array.isArray(item?.submenu) && item?.submenu.length === 0  ?(
                                                <Menu.Item key={item?.key} className={poppins?.className}>
                                                    <span>{item?.label}</span>
                                                    <Link href={item?.path}/>
                                                </Menu.Item>
                                            ): (
                                                <Menu.SubMenu
                                                    className={['app-submenu',poppins?.className].join(' ')}
                                                    disabled={item?.disabled ?? false}
                                                    icon={null}
                                                    key={item?.key}
                                                    title={item?.label}
                                                >
                                                    {
                                                        item?.submenu.map((child2, key) => {
                                                            return Array.isArray(child2?.submenu) && child2?.submenu.length === 0  ?(
                                                                <Menu.Item key={child2?.key} className={poppins?.className}>
                                                                    <span>{child2?.label}</span>
                                                                    <Link href={child2?.path}/>
                                                                </Menu.Item>
                                                            ): null
                                                        })
                                                    }
                                                </Menu.SubMenu>

                                            )
                                        })
                                    }
                                </Menu.SubMenu>

                            )
                    })
                }
            </Menu>
        </div>
    )
}


export const NavbarLayout = () => {
    return (
        <header className="w-full fixed top-0 left-0 h-20 transition poppins border-b border-transparent z-[9999] duration-200 ">
            <section className="w-full flex items-center  h-full">
                <ContainerLayout className={'gap-10 flex items-center justify-between'}>
                    <div className="min-w-40 w-40 h-full flex items-center">
                        <picture>
                            <img src="/assets/google-logo.svg" alt="google-logo" className={'h-8 object-contain'}/>
                        </picture>
                    </div>
                    <div className="w-full h-full  flex items-center gap-6">
                        <TopBarDesktop/>
                    </div>
                    <NavbarRight/>
                </ContainerLayout>
            </section>
        </header>

    )
}

NavbarLayout.propTypes = {}
NavbarLayout.defaultProps = {}