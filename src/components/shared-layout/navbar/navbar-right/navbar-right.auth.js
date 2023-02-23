import React from 'react'
import PropTypes from 'prop-types'
import { Button } from 'antd'
import Link from 'next/link'
import { BellOutlined } from '@ant-design/icons'
import { DownOutlined,UserOutlined,DashboardOutlined } from '@ant-design/icons';
import { Dropdown, Space } from 'antd';
import {signOut} from "next-auth/react";

function NavbarRightAuth (props){
    const items = [
        {
            label:<Link href={'/dashboard'} className={'!text-xs'}>Dashboard</Link>,
            icon:<DashboardOutlined />,
            key: '0',
        },
        {
            label: <Link href={'/profile'} className={'!text-xs'}>Profile</Link>,
            icon:<UserOutlined />,
            key: '1',
        },
        {
            type: 'divider',
        },
        {
            label: <Button className={'!text-xs'} type={'link'} onClick={()=> {signOut('credentials')}}>Logout</Button>,
            key: '3',
        },
    ];
    return (
        <div className="flex-none h-full  flex items-center px-4 space-x-4">
            <div className={'w-10 h-10 3xl:h-6 3xl:w-6 flex items-center justify-center'}>
                <BellOutlined className={'!text-xl transition duration-200 hover:text-red-500 '} onClick={()=> {

                }}/>
            </div>
            <div className="flex-none h-full  flex items-center relative">


                <Dropdown menu={{ items }} trigger={['click']}>
                    <a onClick={(e) => e.preventDefault()}>
                        <div
                            className="w-10 h-10 cursor-pointer rounded-full bg-gray-500 relative overflow-hidden">
                            <img src="/assets/img/users/users_1_hd.png" alt="user-images"
                                 className={'w-full h-full object-cover'}/>
                        </div>
                    </a>
                </Dropdown>
            </div>
        </div>
    )
}

NavbarRightAuth.propTypes = {}
NavbarRightAuth.defaultProps = {}

export default NavbarRightAuth