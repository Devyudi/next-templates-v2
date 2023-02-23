import React from 'react'
import PropTypes from 'prop-types'
import {ChildrenLayout} from "@moonlay/src/components/shared-layout";

export default function DashboardAdmin(props){
    return (
        <div className="w-full">
            <h1>Dashboard Admin</h1>

            <ChildrenLayout>
                {props?.children}
            </ChildrenLayout>
        </div>
    )
}

DashboardAdmin.propTypes = {}
DashboardAdmin.defaultProps = {}