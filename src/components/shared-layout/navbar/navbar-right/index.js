import NavbarRightAuth from "./navbar-right.auth";
import NavbarRightDefault from "./navbar-right.default";
import React from 'react'
import SessionLayout from "@moonlay/src/components/shared-layout/session.layout";

export default function NavbarRight(){
    return (
        <React.Fragment>
            <SessionLayout type={'unauthenticated'}>
                <NavbarRightDefault/>
            </SessionLayout>
            <SessionLayout type={'authenticated'}>
                <NavbarRightAuth/>
            </SessionLayout>

        </React.Fragment>
    )
}