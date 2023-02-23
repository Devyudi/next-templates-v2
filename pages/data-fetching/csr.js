import { useState, useEffect } from "react";
import MetaHead from "@moonlay/src/components/shared-layout/meta.head";
import {ContainerLayout} from "@moonlay/src/components/shared-layout";
import PageHeadAlt from "@moonlay/src/components/shared-component/hero/page-head-alt";
import {Inter, Poppins} from "@next/font/google";
import {Card, Collapse} from 'antd'
import ApiService from "@moonlay/src/lib/services/api.service";

const poppins = Poppins({
    weight:'400',
    subsets: ['latin']
})
const inter = Inter({
    subsets: ['latin']
})

export default function CSR(){
    const [ loading , setLoading ] = useState(false)
    const [ params, setParams ] = useState({
        page:1,
        limit:10,
    })
    const [ data , setData ] = useState([])


    useEffect(()=> {
        setLoading(true)
        new ApiService({
            url:'/product.json', // endpoint API
            config : {
                params : {
                    ...params,
                }
            }
        }).get()
            .then((response)=> {
                setData([...response.data])
                setLoading(false)
            })
            .catch((err)=> {
                setData([])
                setLoading(false)
            })
    },[ params ])

    return (
        <>
            <MetaHead
                head={{
                    title:'CSR | Moonlay',
                    description: 'Client Side Rendering example moonlay core'
                }}
            />
            <PageHeadAlt
                icon={{
                    text:'Client Side Rendering'
                }}
                title={<h1 className={[inter.className,'text-2xl font-semibold'].join(' ')}>Client Side Rendering ( CSR )</h1>}
            />
            <ContainerLayout className={'mt-6 space-y-6'}>
                <Card
                    title={<h2 className={[inter.className,'text-2xl font-semibold'].join(' ')}>Client-side data fetching</h2>}
                    bordered={false} className={["w-full py-4",poppins.className].join(' ')}>
                    <p>Client-side data fetching is useful when your page doesn't require SEO indexing, when you don't need to pre-render your data, or when the content of your pages needs to update frequently. Unlike the server-side rendering APIs, you can use client-side data fetching at the component level.

                        If done at the page level, the data is fetched at runtime, and the content of the page is updated as the data changes. When used at the component level, the data is fetched at the time of the component mount, and the content of the component is updated as the data changes.

                        It's important to note that using client-side data fetching can affect the performance of your application and the load speed of your pages. This is because the data fetching is done at the time of the component or pages mount, and the data is not cached.

                    </p>
                </Card>

                <Card
                    title={<h2 className={[inter.className,'text-2xl font-semibold'].join(' ')}>Example</h2>}
                    bordered={false}>
<pre className={'bg-gray-800 text-white p-4 rounded-xl'}><code>{`
function Profile() {
  const [data, setData] = useState(null)
  const [isLoading, setLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    fetch('/api/profile-data')
      .then((res) => res.json())
      .then((data) => {
        setData(data)
        setLoading(false)
      })
  }, [])

  if (isLoading) return <p>Loading...</p>
  if (!data) return <p>No profile data</p>

  return (
    <div>
      <h1>{data.name}</h1>
      <p>{data.bio}</p>
    </div>
  )
}
`}</code></pre>
                </Card>
            </ContainerLayout>
        </>
    )
}