import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {useRouter} from "next/router";
import { Roboto,Poppins } from '@next/font/google'
import {ChangeTheme} from "@moonlay/src/redux/actions";
import {LottieSpinner} from "@moonlay/src/components/shared-component/loading/lottie-spinner";
import {ChildrenLayout} from "@moonlay/src/components/shared-layout/children.layout";

const inter = Roboto({ weight:'400',subsets: ['latin'] })
const poppins = Poppins({ weight:'400',subsets: ['latin'] })
function WrapperTheme(props){
    let {children, ChangeTheme, menusActive,ChangeRouteInfo} = props

    const router = useRouter()

    const [pageLoad,setPageLoad] = useState(false)

    useEffect(() => {
        ChangeTheme()
    }, [ChangeTheme])

    /**
     * useeffect for loading after change route
     */
    useEffect(()=>{
        const handleStart = (url) => {
            url !== router.pathname ? setPageLoad(true) : setPageLoad(false);
        };
        const handleComplete = (url) => setPageLoad(false);

        router.events.on("routeChangeStart", handleStart);
        router.events.on("routeChangeComplete", handleComplete);
        router.events.on("routeChangeError", handleComplete);
    },[router,setPageLoad])

    const timeoutRef = React.useRef();

    const clearTimer = React.useCallback(
        () => clearTimeout(timeoutRef.current),
        []
    );

    React.useEffect(() => {
        if (timeoutRef.current) clearTimer();

        timeoutRef.current = setTimeout(() => {
            window.scrollTo({
                top: 0,
                left: 0,
                behavior: 'smooth'
            });
        }, 200);

        return () => {
            clearTimer();
        };
    }, [clearTimer]);



    return (
        <>
            <main className={inter.className}>
                <ChildrenLayout children={props?.children ?? null}/>
                {
                    pageLoad && (
                        <div className="fixed top-0 left-0 w-full h-screen bg-white dark:bg-scheme-dark-primary bg-opacity-80 z-50 flex items-center justify-center">
                            <div className={'lg:block hidden'}>
                                <LottieSpinner height={150} width={150} isPaused={false} isStopped={false}/>
                            </div>
                            <div className={'block lg:hidden'}>
                                <LottieSpinner height={80} width={80} isPaused={false} isStopped={false}/>
                            </div>
                        </div>
                    )
                }
            </main>
        </>
    )
}

WrapperTheme.propTypes = {
    ChangeTheme: PropTypes.func.isRequired
}
WrapperTheme.defaultProps = {

}

const mapStateToProps = ({}) => {

    return {

    }
}
const mapDispatchToProps = {
    ChangeTheme
}

export default connect(mapStateToProps,mapDispatchToProps)(WrapperTheme)