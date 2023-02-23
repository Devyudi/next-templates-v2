import {Tooltip, Input} from "antd";
import React from "react";

const formatNumber = (value) => new Intl.NumberFormat().format(value);
const NumericInput = (props) => {
    let { value, onChange } = props;
    const handleChange = (e) => {
        const { value: inputValue } = e.target;
        const reg = /^-?\d*(\.\d*)?$/;
        if (reg.test(inputValue) || inputValue === '' || inputValue === '-') {
            onChange(inputValue);
        }
    };

    // '.' at the end or only '-' in the input box.
    const handleBlur = () => {
        if(value && isNaN(Number(value))){
            value = 0
        }
        let valueTemp = value;
        if(value && value.length > 0 ){
            if (value.charAt(value.length - 1) === '.' || value === '-') {
                valueTemp = value.slice(0, -1);
            }
        }
        if(valueTemp && valueTemp.length > 0){
            onChange(valueTemp.replace(/0*(\d+)/, '$1'));
        }

    };
    const title = value ? (
        <span className="numeric-input-title">{value !== '-' ? formatNumber(Number(value)) : '-'}</span>
    ) : (
        'Input a number'
    );
    return (
        <Tooltip trigger={['focus']} title={title} placement="topLeft" overlayClassName="numeric-input">
            <Input
                {...props}
                onChange={handleChange}
                onBlur={handleBlur}
                type={'number'}
                placeholder="Input a number"
                maxLength={16}
            />
        </Tooltip>
    );
};

export { NumericInput }