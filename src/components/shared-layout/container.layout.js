import React, {useState} from 'react'
import PropTypes from 'prop-types'
import {ChildrenLayout} from "@moonlay/src/components/shared-layout";

export const ContainerLayout = (props)=> {
    let {children} = props

    return (
        <div className={`px-6 w-full max-w-6xl mx-auto h-full ${props?.className}`}>
            <ChildrenLayout>
                {children}
            </ChildrenLayout>
        </div>
    )
}

ContainerLayout.propTypes = {
    gap: PropTypes.string.isRequired,
    className: PropTypes.string.isRequired,
}

ContainerLayout.defaultProps = {
    gap:'gap-10',
    className:''
}