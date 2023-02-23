/*******************************************************************************
 * @author Mochamad Yudi Sobari
 * @github https://github.com/mochamadyudi
 * @email yuyuid.id12@gmail.com
 * @contact +6285718851007
 ******************************************************************************/

import React from 'react'
import PropTypes from 'prop-types'
import {ContainerLayout} from "@moonlay/src/components/shared-layout";
import Helpers from "@moonlay/helpers";
import {Image} from "antd";
import { Inter } from "@next/font/google";

const inter = Inter({
    weight:'600',
    subsets: ['latin']
})

function IconComponent({icon}){
    if(typeof(icon) === 'undefined' && typeof(icon) === 'object' && Object.keys(icon).length === 0) return null
    if(typeof(icon?.element) !== 'undefined' && typeof(icon?.element) !== 'string' && icon?.element !== null){
        if(typeof icon?.element === 'function'){
            return icon?.element()
        }
        return icon?.element
    }
    if(typeof (icon?.src) !== 'undefined' && typeof (icon?.src) === 'string'){
        return (
            <div className="w-14 h-14 rounded-full bg-gray-100">
                <Image src={icon?.src} alt="icon-page-header-alt" className={'w-full h-full object-contain'}/>
            </div>
        )
    }
    if(typeof(icon?.text) !== 'undefined' && typeof(icon?.text) === 'string') {
        return (
            <div className="w-14 h-14 rounded-full bg-gray-100 flex items-center justify-center">
                <span className={'font-bold text-lg'}>{Helpers.getNameInitial(icon?.text)}</span>
            </div>
        )
    }
    return null
}

const TitleComponent = ({options,icon})=> {

    return (
        <div className={options?.className ?? 'w-full flex items-center gap-4'}>
            <IconComponent icon={icon}/>
            {
                typeof options === 'string' && options !== '' && options !== null ? (
                    <h1 className={[inter.className,'!font-extrabold tracking-wides'].join(' ')}>{options}</h1>
                ):
                    typeof options?.text  !== 'undefined' ?
                        typeof options?.text === 'string' ? <h1 className={[inter.className,'!font-extrabold tracking-wides'].join(' ')}>{options?.text ?? "-"}</h1>
                        :
                            typeof options?.text === 'function' ? title() : title
                    :
                        typeof options === 'function' ? options() : options ?? null
            }
        </div>
    )

}
function PageHeadAlt({title,description,icon,extra}){

    return (
        <div className="w-full h-40 mb-2 app-page-header">
            <ContainerLayout className={'flex justify-center flex-col'}>
                <div className={'w-full flex items-center justify-between gap-4'}>
                    <TitleComponent icon={icon} options={title}/>
                    {extra && extra}
                </div>
                <p className={'font-normal text-normal tracking-wides poppins'}>{description}</p>
            </ContainerLayout>
        </div>
    )
}
PageHeadAlt.propTypes = {
    icon: PropTypes.oneOfType([
        PropTypes.any,
        PropTypes.shape({
            element: PropTypes.node,
            src: PropTypes.string,
            text: PropTypes.oneOfType([PropTypes.string,PropTypes.node])
        })
    ]),
    extra: PropTypes.any,
    title: PropTypes.oneOfType([
        PropTypes.string,
        PropTypes.shape({
            text: PropTypes.string,
            className: PropTypes.string
        }).isRequired
    ]).isRequired,
    description: PropTypes.string
}
PageHeadAlt.defaultProps = {
    icon: {
        element:null,
        src:'/next.svg',
        text: null
    },
    extra: null,
    title: "",
    description:''
}

export default PageHeadAlt
