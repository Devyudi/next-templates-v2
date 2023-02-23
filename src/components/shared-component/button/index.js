import React from 'react'
import PropTypes from 'prop-types'

const Button = (props)=> {
    return (
        <button>{props?.children ?? null}</button>
    )
}



export { Button }