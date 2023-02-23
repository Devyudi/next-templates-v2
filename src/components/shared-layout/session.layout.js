import React from 'react'
import PropTypes from 'prop-types'
import {ChildrenLayout} from "@moonlay/src/components/shared-layout/children.layout";
import {useSession} from "next-auth/react";

function SessionLayout({ type, Loading,children}){
    const {status, data} = useSession()
    return(
        status !== 'loading'? (
            status === type ? (
                <ChildrenLayout children={children}/>
            ): <div/>
        ) : Loading
    )
}

SessionLayout.propTypes = {
    Loading: PropTypes.node,
    type: PropTypes.string
}
SessionLayout.defaultProps = {
    Loading: 'loading...',
    type: "authenticated"
}

export default SessionLayout