/*******************************************************************************
 * @author Mochamad Yudi Sobari
 * @github https://github.com/mochamadyudi
 * @email yuyuid.id12@gmail.com
 * @contact +6285718851007
 ******************************************************************************/

import React from 'react'
import PropTypes from 'prop-types'
import Head from "next/head";
import {useRouter} from "next/router";


export default function MetaHead(props) {
    let {head, canonical, icon, twitter} = props
    const route = useRouter()
    return (
        <Head>
            <meta charSet="UTF-8"/>
            <meta httpEquiv="content-security-policy|content-type|default-style|refresh" content="30"/>
            <meta httpEquiv="X-UA-Compatible" content="IE=edge"/>
            <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
            <meta name="keywords" content={head?.keywords}/>
            <meta name={'description'} content={head?.description}/>
            <meta name="mobile-web-app-capable" content="yes"/>
            <meta name="apple-mobile-web-app-capable" content="yes"/>
            <meta name="apple-mobile-web-app-status-bar-style" content="black"/>

            <meta name="robots" content="index,follow"/>
            <meta name="googlebot" content="index,follow"/>
            <meta name="googlebot-news" content="index,follow"/>

            <meta charSet={'utf-8'}/>
            <link rel={'icon'} href={icon}/>
            {
                canonical && canonical?.url ? (
                    <link rel="canonical" href={canonical.url}/>
                ):
                    <link rel={'canonical'} href={[process.env.NEXT_PUBLIC_APP_DOMAIN,route.asPath].join('')}/>
            }

            <title>
                {
                    !head?.withApp ? (
                        typeof head?.title !== "undefined" && head?.title !== null ? head?.title : process.env.NEXT_PUBLIC_APP_NAME

                    ) : (
                        typeof head?.title !== "undefined" && head?.title !== null ? [head?.title, process.env.NEXT_PUBLIC_APP_NAME].join(' | ') : process.env.NEXT_PUBLIC_APP_NAME
                    )
                }
            </title>

            {/**
             * Twitter Card Data
             * */}
            {
                typeof(twitter) !== 'undefined' && 'card' in twitter && (
                    <>
                        <meta name="twitter:card" content={twitter.card}/>
                        <meta name="twitter:site" content={twitter.site}/>
                        <meta name="twitter:title" content={twitter.title}/>
                        <meta name="twitter:description" content={twitter.description}/>
                        <meta name="twitter:creator" content={twitter.creator}/>
                        {/**
                         * Twitter Summary card images must be at least 120x120px
                         * */}
                        <meta name="twitter:image" content={twitter?.image?.url}/>
                        <meta name="twitter:image:width" content={twitter?.image?.width}/>
                        <meta name="twitter:image:height" content={twitter?.image?.height}/>
                        <meta name="twitter:image:type" content={twitter?.image?.type}/>

                        {
                            twitter.card === 'app' && (
                                <>
                                    <meta name="twitter:app:country" content={twitter?.app?.country}/>
                                    <meta name="twitter:app:name:iphone" content={twitter?.app?.name?.iphone}/>
                                    <meta name="twitter:app:id:iphone" content={twitter?.app?.id?.iphone}/>
                                    <meta name="twitter:app:url:iphone" content={twitter?.app?.url?.iphone}/>
                                    <meta name="twitter:app:name:ipad" content={twitter?.app?.name?.ipad}/>
                                    <meta name="twitter:app:id:ipad" content={twitter?.app?.id?.ipad}/>
                                    <meta name="twitter:app:url:ipad" content={twitter?.app?.url?.ipad}/>
                                    <meta name="twitter:app:name:googleplay" content={twitter?.app?.name?.googlePlay}/>
                                    <meta name="twitter:app:id:googleplay" content={twitter?.app?.id?.googlePlay}/>
                                    <meta name="twitter:app:url:googleplay" content={twitter?.app?.url?.googlePlay}/>
                                </>
                            )
                        }
                    </>
                )
            }

            {
                typeof(props?.scripts) !== 'undefined' && Array.isArray(props?.scripts) &&
                props?.scripts.length > 0 &&
                props.scripts.map((child)=> {
                    return <script {...child}/>
                })
            }

        </Head>
    )
}

MetaHead.propTypes = {
    icon: PropTypes.string.isRequired,
    head: PropTypes.shape({
        title: PropTypes.string.isRequired,
        description: PropTypes.string.isRequired,
        keywords: PropTypes.string.isRequired,
        withApp: PropTypes.bool,
    }).isRequired,
    canonical: PropTypes.shape({
        url: PropTypes.string.isRequired
    }),
    twitter: PropTypes.shape({
        card: PropTypes.oneOf(['summary_large_image', 'summary', 'app']),
        site: PropTypes.string.isRequired,
        creator: PropTypes.string,
        player: PropTypes.string,
        app: PropTypes.shape({
            country: PropTypes.string.isRequired,
            name: PropTypes.shape({
                iphone: PropTypes.string,
                googlePlay: PropTypes.string,
                ipad: PropTypes.string,
            }),
            id: PropTypes.shape({
                iphone: PropTypes.string,
                googlePlay: PropTypes.string,
                ipad: PropTypes.string,
            }),
            url: PropTypes.shape({
                iphone: PropTypes.string,
                googlePlay: PropTypes.string,
                ipad: PropTypes.string,
            })
        }),
        image: PropTypes.shape({
            type: PropTypes.string,
            url: PropTypes.string.isRequired,
            width: PropTypes.number,
            height: PropTypes.number
        })
    }),
    scripts: PropTypes.arrayOf(
        PropTypes.shape({
            src: PropTypes.string.isRequired
        }).isRequired
    )
}
MetaHead.defaultProps = {
    icon: '/favicon.ico',
    head: {
        title: process.env.appName,
        description: 'Lorem ipsum dolor sit amet',
        keywords: process.env.appKeyword || 'Lorem ipsum dolor sit amet'
    },
    scripts:[]
}
