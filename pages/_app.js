import {ThemeProvider, useTheme} from 'next-themes'
import React, {useState, useEffect} from "react";
import {getSession, SessionProvider, useSession} from "next-auth/react"
import store, {wrapper} from "../src/redux/store";
import {Provider} from "react-redux";
import "slick-carousel/slick/slick-theme.css";
import '../src/assets/sass/main.scss'
import "slick-carousel/slick/slick.css";
import WrapperTheme from "@moonlay/src/components/shared-layout/WrapperTheme";
import {useRouter} from "next/router";
import {ChildrenLayout, WrapperLayout} from "@moonlay/src/components/shared-layout";
import Dashboard from "@moonlay/src/components/shared-layout/private-layout/dashboard";
import {MenuDashboardAdmin, MenuDashboardMember} from "@moonlay/src/config";
export const config = {
  amp: "hybrid"
}


function MyAppSwitching({children}) {
  const router = useRouter();
  if (router.asPath.startsWith('/dashboard')) {
    return (
        <Dashboard.Default menus={MenuDashboardMember}>
          {children}
        </Dashboard.Default>
    )
  }else if (router.asPath.startsWith('/admin')){
    return (
        <Dashboard.Default menus={MenuDashboardAdmin}>
          {children}
        </Dashboard.Default>
    )
}else if(router.asPath.startsWith('/auth')) {
    return (
        <React.Fragment>
          {children}
        </React.Fragment>
    )
  }else{
    return (
        <WrapperLayout>
          {children}
        </WrapperLayout>
    )
  }
}
function MyApp(props) {
  let {Component, pageProps: { session,...pageProps}} = props
  const router = useRouter()
  const [ pageLoad, setPageLoad] = useState(false)
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

  return (
      <SessionProvider session={session}>
        <Provider store={store}>
          <WrapperTheme>
            <ThemeProvider attribute={'class'} enableSystem={false}>
              <MyAppSwitching>
                <Component
                    loading={pageLoad}
                    {...props?.pageProps}
                />
              </MyAppSwitching>
            </ThemeProvider>
          </WrapperTheme>
        </Provider>
      </SessionProvider>

  )
}

MyApp.getInitialProps = async ({Component, ctx}) => {

  let pageProps = Component.getInitialProps ? await Component.getInitialProps(ctx) : {};
  const session = await getSession(ctx);

  pageProps = {
    ...pageProps,
    session,
  }

  return {pageProps};
}

export default wrapper.withRedux(MyApp)