import React from 'react'
import PropTypes from 'prop-types'

export default function Index(props){
    return (
        <React.Fragment>
            <h1>User List</h1>
        </React.Fragment>
    )
}

export async function getServerSideProps(ctx){
    return {
        props : {}
    }
}