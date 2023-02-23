import React from 'react'
import PropTypes from 'prop-types'
import {StyledChildren} from "@moonlay/src/components/shared-layout";
import {NavbarLayout} from "@moonlay/src/components/shared-layout/navbar.layout";
import {useTheme} from "next-themes";
import {Button, Tooltip} from "antd";
import { SettingOutlined } from '@ant-design/icons'

const WrapperLayout = (props)=> {
    let { background } = props
    const { theme, setTheme } = useTheme()

    function ClassNames (){
        let bg = theme === 'dark' ? background?.dark ?? 'bg-[#262626]' : background?.light ?? 'bg-[#f2f2f2]'
        if(props?.className){
            return [
                props?.className,
                bg,
                'w-full min-h-screen'
            ].join(' ')
        }else{
            return [
                bg, 'w-full min-h-screen'
            ].join(' ')
        }
    }

    return(
        <div className={ClassNames()}>

            <div className="w-full fixed z-[9999] top-0 left-0 h-20 bg-white border-b app-navbar">
                {
                    props?.navbar ? <StyledChildren children={props?.navbar}/> : <NavbarLayout/>
                }
            </div>
            <div className="pt-20 min-h-screen">
                {
                    typeof(props?.children) !== 'undefined' && props?.children &&  (
                        <StyledChildren children={props?.children}/>
                    )
                }

            </div>
            <div style={{position:'fixed',bottom:100,right:20}}>
                <Tooltip title="Settings">
                    <Button
                        size={'large'}
                        onClick={()=> setTheme(theme === 'dark'? 'light':'dark')}
                        icon={<SettingOutlined />}/>
                </Tooltip>
            </div>
        </div>
    )
}

WrapperLayout.propTypes = {
    navbar: PropTypes.element.isRequired,
    navbarType: PropTypes.string,
    background: PropTypes.oneOfType([
        PropTypes.any,
        PropTypes.shape({
            dark: PropTypes.oneOfType([
                PropTypes.any,
                PropTypes.string
            ]).isRequired,
            light: PropTypes.oneOfType([
                PropTypes.any,
                PropTypes.string
            ]).isRequired
        }).isRequired
    ]),
    className: PropTypes.string,
}
WrapperLayout.defaultProps = {
    navbar: null,
    navbarType: 'default',
    className: null,
    background: {
        dark: 'bg-[#262626]',
        light: null
    }
}

export {WrapperLayout}
