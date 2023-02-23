import React,{Component} from 'react'
import PropTypes from 'prop-types'
import {Tooltip} from "antd";

class Input extends Component{
    onChange(e){
        e.preventDefault()
    }
    render(){
        return (
            <input
                {...this.props}
            />
        )
    }
}
Input.propTypes = {
    type: PropTypes.oneOf([
        'text',
        'password',
        'number',
        'email',
        'file',
        'hidden',
        'button',
        'checkbox',
        'color',
        'password',
        'search',
        'submit',
        'tel',
        'url'
    ]),
    className: PropTypes.string,
    placeholder: PropTypes.string,
    spellCheck: PropTypes.oneOf(['false','true']),
    autoComplete: PropTypes.oneOf(['off','on','new-password']),
    name: PropTypes.string.isRequired,
    onChange: PropTypes.func,
    onClick: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    value: PropTypes.string
}
Input.defaultProps = {
    className: "",
    onChange: function(e){
        console.log(e.target.value)
    }
}





export { Input }