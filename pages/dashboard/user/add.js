import React from 'react'

export default function Index(props){
    return (
        <React.Fragment>
            <h1>User Add</h1>
        </React.Fragment>
    )
}

export async function getServerSideProps(ctx){
    return {
        props: {}
    }
}