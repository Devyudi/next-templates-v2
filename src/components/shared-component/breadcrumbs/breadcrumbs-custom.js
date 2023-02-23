/*******************************************************************************
 * @author Mochamad Yudi Sobari
 * @github https://github.com/mochamadyudi
 * @email yuyuid.id12@gmail.com
 * @contact +6285718851007
 ******************************************************************************/

import React from 'react';
import {Breadcrumb} from "antd";
import {useRouter} from "next/router";

export default function BreadcrumbCustom(props){
    const router = useRouter()
    return (
        <div className="py-3" key={props?.key ?? `bread-crumb`}>
            <Breadcrumb>
                {router.pathname.split('/').slice(1).map((item,index)=> {
                    return (
                        <Breadcrumb.Item>{item}</Breadcrumb.Item>
                    )
                })}
            </Breadcrumb>
        </div>
    )
}