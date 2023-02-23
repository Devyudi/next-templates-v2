
import axios from "axios";
import MetaHead from "@moonlay/src/components/shared-layout/meta.head";
import {ContainerLayout} from "@moonlay/src/components/shared-layout";
import {useRouter} from "next/router";
import PageHeadAlt from "@moonlay/src/components/shared-component/hero/page-head-alt";
import React from "react";

export default function Index(props){
    const route = useRouter()

  return (
      <>
          <MetaHead
              head={{
                  title: 'CORE@2023 | Moonlay',
                  description: "Lorem ipsum dolor sit amet",
                  keywords:"Moonlay, Core 2023, Next JS"
              }}
              canonical={{
                  url:route.basePath
              }}
          />
          <PageHeadAlt
              icon={null}
              title={{
                  text: 'Core 2023',
                  className: "w-full flex items-center justify-center gap-4"
              }}
              description={'Lorem ipsum dolor sit amet'}
          />
          <ContainerLayout>

          </ContainerLayout>
      </>
  )
}


export async function getServerSideProps(ctx){
  const data = await axios.get([process.env.NEXT_PUBLIC_APP_DOMAIN,'product.json'].join('/'), {})
      .then((response)=> {
        return response?.data ?? []
      })
      .catch((err)=> {
        return []
      })

  return {
    props: {
      data: data ?? [],
      pagination:{
        page:1,
        limit:10,
        max_page:15,
        total:150
      }
    }
  }
}