import React from 'react'
import PropTypes from 'prop-types'
import Link from "next/link";
import {Button} from "antd";
import {useTheme} from "next-themes";

function NavbarRightDefault (props){
    const {theme, setTheme } = useTheme()
    return (
        <div className="h-full flex items-center gap-4">
            <Link href={'/auth/login'}>
                <Button ghost={theme === 'dark'}>
                    <span>Masuk</span>
                </Button>
            </Link>
            <Link href={'/auth/register'}>
                <Button type={'primary'}>Daftar</Button>
            </Link>

        </div>
    )
}

NavbarRightDefault.propTypes = {}
NavbarRightDefault.defaultProps = {}

export default NavbarRightDefault