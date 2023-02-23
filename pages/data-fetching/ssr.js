import React from 'react'
import PageHeadAlt from "@moonlay/src/components/shared-component/hero/page-head-alt";
import {ContainerLayout} from "@moonlay/src/components/shared-layout";
import {Card} from "antd";
import {getToken} from "next-auth/jwt";
import {Inter, Poppins} from "@next/font/google";

const poppins = Poppins({
    weight:'400',
    subsets: ['latin']
})
const inter = Inter({
    subsets: ['latin']
})

export default function SSR(props){
    let { title,description } = props
    return(
        <>

            <PageHeadAlt
                icon={{
                    text:props?.title
                }}
                title={<h1 className={[inter.className,'text-2xl font-semibold'].join(' ')}>{props?.title}</h1>}
                description={props?.description}
            />
            <ContainerLayout className={'mt-6 space-y-6'}>
                <Card
                    title={<h2 className={[inter.className,'text-2xl font-semibold'].join(' ')}>getServerSideProps</h2>}
                    bordered={false} className={["w-full py-4",poppins.className].join(' ')}>
                    <p className={'leading-8'}>
                        If you export a function called
                        <code className="inline bg-gray-200 rounded italic p-1 mx-2">getServerSideProps</code>
                        (Server-Side Rendering) from a page, Next.js will pre-render this page on each request using the data returned by <code className="mx-2 inline bg-gray-200 rounded italic p-1">getServerSideProps</code>.
                    </p>
                </Card>

                <Card
                    title={<h2 className={[inter.className,'text-2xl font-semibold'].join(' ')}>Example</h2>}
                    bordered={false}>
                    <pre className={'bg-black text-blue-300 p-4 rounded-xl'}>
                        <code>{`export async function getServerSideProps(context) {
  return {
    props: {}, // will be passed to the page component as props
  }
}`}</code>
                    </pre>
                </Card>
            </ContainerLayout>
        </>
    )
}

export async function getServerSideProps(context){
    const token = await getToken({
        req: context?.req,
        secret: process.env.NEXTAUTH_SECRET,
        secureCookie: false
    })
    if(!token){
        return {
            redirect: {
                destination: '/auth/login',
                permanent: false
            }
        }
    }
    return {
        props: {
            title: "Server Side Rendering",
            description: "ini adalah contoh SSR ( Server-Side Rendering ) NextJS",
            data: []
        }
    }
}