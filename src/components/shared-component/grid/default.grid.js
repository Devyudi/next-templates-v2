/*******************************************************************************
 * @author Mochamad Yudi Sobari
 * @github https://github.com/mochamadyudi
 * @email yuyuid.id12@gmail.com
 * @contact +6285718851007
 ******************************************************************************/

import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {ChildrenLayout} from "@moonlay/src/components/shared-layout";


class Col extends Component{

    render() {
        let className = [
            this.props.className ?? '',
            'app-grid--col',
            `xs:span-${this.props.xs}`,
            `sm:span-${this.props.sm}`,
            `md:span-${this.props.md}`,
            `lg:span-${this.props.lg}`,
            `xl:span-${this.props.xl}`,
        ]
        return(
            <div className={className.join(' ')}>
                <ChildrenLayout children={this.props.children}/>
            </div>
        )
    }
}
Col.propTypes = {
    className: PropTypes.string,
    onClick: PropTypes.func,
    xs: PropTypes.oneOf([1,2,3,4,5,6,7,8,9,10,11,12]),
    sm: PropTypes.oneOf([1,2,3,4,5,6,7,8,9,10,11,12]),
    md: PropTypes.oneOf([1,2,3,4,5,6,7,8,9,10,11,12]),
    lg: PropTypes.oneOf([1,2,3,4,5,6,7,8,9,10,11,12]),
    xl: PropTypes.oneOf([1,2,3,4,5,6,7,8,9,10,11,12]),
}
Col.defaultProps = {
    onClick: function(){},
    className: '',
    xs: 12,
    sm: 12,
    md: 12,
    lg: 12,
    xl: 12,
}

class Grid extends Component{
    static Col = Col

    render() {
        return(
            <div className={`app-grid app-grid-${this.props.col} app-gap-${this.props.gap ?? 4} ${this.props.className}`}>
                <ChildrenLayout children={this.props?.children}/>
            </div>
        )
    }
}

Grid.propTypes = {
    className: PropTypes.string,
    col : PropTypes.oneOf([1,2,3,4,5,6,7,8,9,10,11,12]).isRequired,
    gap : PropTypes.oneOf(1,2,3,4,4,5,6,7,8,9,10).isRequired
}

Grid.defaultProps = {
    className: '',
    col: 12,
    gap: 4
}

export default Grid