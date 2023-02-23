import React from 'react'
import { LaptopOutlined } from '@ant-design/icons'

const defaultMenu = [
    {
        key:'dashboard',
        breadcrumbs: true,
        path:'/dashboard',
        icon: LaptopOutlined,
        label:'Dashboard',
        submenu: []
    },
    {
        key:'product',
        breadcrumbs: true,
        path:'/dashboard/product',
        icon: LaptopOutlined,
        label:'Product',
        submenu: [
            {
                key:'product.list',
                breadcrumbs: true,
                path:'/dashboard/product',
                icon: LaptopOutlined,
                label:'List',
                submenu: []
            },
            {
                key:'product.create',
                breadcrumbs: true,
                path:'/dashboard/product/create',
                icon: LaptopOutlined,
                label:'Create',
                submenu: []
            }
        ]
    },
    {
        key:'taxonomy',
        breadcrumbs: true,
        path:'/dashboard/taxonomy',
        icon: LaptopOutlined,
        label:'Taxonomy',
        submenu: [
            {
                key:'taxonomy.list',
                breadcrumbs: true,
                path:'/dashboard/taxonomy',
                icon: LaptopOutlined,
                label:'List',
                submenu: []
            },
            {
                key:'taxonomy.create',
                breadcrumbs: true,
                path:'/dashboard/taxonomy/create',
                icon: LaptopOutlined,
                label:'Create',
                submenu: []
            }
        ]
    },

    {
        key:'user',
        breadcrumbs: true,
        path:'/dashboard/user',
        icon: LaptopOutlined,
        label:'User',
        submenu: [
            {
                key:'user.add',
                breadcrumbs: true,
                path:'/dashboard/user/add',
                icon: LaptopOutlined,
                label:'Add',
                submenu: []
            }
        ]
    }
]


export const MenuDashboardMember = [
    ...defaultMenu
]