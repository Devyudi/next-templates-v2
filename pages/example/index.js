import MetaHead from "@moonlay/src/components/shared-layout/meta.head";
import Image from 'next/image'
import {ContainerLayout} from "@moonlay/src/components/shared-layout";
export default function Index(){
    return (
        <>
            <MetaHead
                head={{
                    title: 'Example | moonlay',
                    description : 'example page for presentation NEXTJS'
                }}
            />
            <ContainerLayout>
                <div>
                    <Image src={'/product/baju-wanita.jpg'} width={400} height={400} alt={'baju-wanita'} className={' object-contain'}/>
                </div>
                <p>Lorem ipsum dolor sit amet lorem ipsum dolor sit amet</p>
                <p>Lorem ipsum dolor sit amet lorem ipsum dolor sit amet</p>
                <p>Lorem ipsum dolor sit amet lorem ipsum dolor sit amet</p>
                <p>Lorem ipsum dolor sit amet lorem ipsum dolor sit amet</p>
                <p>Lorem ipsum dolor sit amet lorem ipsum dolor sit amet</p>
                <p>Lorem ipsum dolor sit amet lorem ipsum dolor sit amet</p>
                <p>Lorem ipsum dolor sit amet lorem ipsum dolor sit amet</p>
                <p>Lorem ipsum dolor sit amet lorem ipsum dolor sit amet</p>
                <p>Lorem ipsum dolor sit amet lorem ipsum dolor sit amet</p>
                <p>Lorem ipsum dolor sit amet lorem ipsum dolor sit amet</p>
                <p>Lorem ipsum dolor sit amet lorem ipsum dolor sit amet</p>
                <p>Lorem ipsum dolor sit amet lorem ipsum dolor sit amet</p>
            </ContainerLayout>
        </>
    )
}