import React from 'react'
export const ChildrenLayout = ({children}) => {
    return !children ? '':(
        React.Children.map(children, (child, i) => {
                return child !== null && typeof(child) !== 'string' ? (
                    React.cloneElement(child, {
                        ...child.props,
                        key: child,
                        className: child?.props?.className ?? ''
                    })
                ): child !== null ? child: ''
            }

        )
    )
}