import MetaHead from "@moonlay/src/components/shared-layout/meta.head";
import Image from 'next/image'
import { Poppins, Inter } from "@next/font/google";
import {ContainerLayout} from "@moonlay/src/components/shared-layout";
import {Divider} from "antd";
import PageHeadAlt from "@moonlay/src/components/shared-component/hero/page-head-alt";
import { FileImageOutlined } from '@ant-design/icons'
const poppins = Poppins({
    weight:'400',
    subsets: ['latin']
})
const inter = Inter({
    subsets: ['latin']
})

function IconPageAlt(){
    return <div className={'w-14 h-14 rounded-full text-white text-2xl flex items-center justify-center bg-blue-500'}><FileImageOutlined /></div>

}
export default function Index(){
    return (
        <>
            <MetaHead
                head={{
                    title: 'Image Optimization | moonlay',
                    description : 'example page for presentation NEXTJS'
                }}
            />
            <PageHeadAlt
                icon={{
                    element:<IconPageAlt/>
                }}
                title={<h1 className={[inter.className,'text-2xl font-semibold'].join(' ')}>Image Optimization & Lazyload</h1>}
            />
            <ContainerLayout className={[poppins.className, 'py-4 space-y-6'].join(' ')}>
                <section className="space-y-6">
                    <h2 className={[inter.className,'text-lg'].join(' ')}>Image Optimization</h2>
                    <div className={'flex items-center justify-start gap-4 bg-gray-200 p-4 rounded-xl'}>
                        <div className={'space-y-4'}>
                            <h2 className={'text-lg'}>Use Package next/image</h2>
                            <div className="h-80 rounded-xl w-80 bg-white overflow-hidden">
                                <Image src={'/product/macbook-2.png'} width={400} height={400} alt={'baju-wanita'} className={'w-full h-full object-cover'}/>
                            </div>
                            <p>Extension yang di hasilkan adalah WebP</p>
                        </div>
                        <div className={'space-y-4'}>
                            <h2 className={'text-lg'}>Tag Default {"<img/>"}</h2>
                            <div className="h-80 rounded-xl w-80 bg-white overflow-hidden">
                                <img src={'/product/macbook-1.png'} width={400} height={400} alt={'baju-wanita'} className={'w-full h-full object-cover'}/>
                            </div>
                            <p>Extension yang di hasilkan adalah default dari file</p>
                        </div>
                    </div>
                    <div>
                        <h3>WEBP</h3>
                        <p>WebP adalah format gambar modern yang dikembangkan oleh google setelah mereka mengaukisisi On2 Technologies.</p>
                        <p>Format ini dapat menjadikan gambah lebih terlihat HD dan jelas dengan ukuran yang sangat kecil dari PNG atau JPEG</p>
                        <p>Sehingga dapat meningkatkan Performance website.</p>
                    </div>
                </section>
                <Divider/>
                <section className={'space-y-6'}>
                    <h2>Lazyload Next/image</h2>
                    <p>Lazyload aktif ketika onScroll page</p>
                    <div className="w-full space-y-6">
                        <div className="h-80 rounded-xl w-80 bg-white overflow-hidden">
                            <Image src={'/product/macbook-3.png'} width={400} height={400} alt={'mackbook-3'} className={'w-full h-full object-cover'}/>
                        </div>
                        <p>What is Lorem Ipsum? Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum</p>
                        <p>What is Lorem Ipsum? Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum</p>
                        <p>What is Lorem Ipsum? Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum</p>

                        <div className="h-80 rounded-xl w-80 bg-white overflow-hidden">
                            <Image src={'/product/macbook-4.png'} width={400} height={400} alt={'macbook-4'} className={'w-full h-full object-cover'}/>
                        </div>

                        <p>What is Lorem Ipsum? Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum</p>
                        <p>What is Lorem Ipsum? Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum</p>
                        <p>What is Lorem Ipsum? Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum</p>

                        <div className="h-80 rounded-xl w-80 bg-white overflow-hidden">
                            <Image src={'/product/sandal-jepit.jpg'} width={400} height={400} alt={'sandal-jepit'} className={'w-full h-full object-cover'}/>
                        </div>


                        <p>What is Lorem Ipsum? Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum</p>
                        <p>What is Lorem Ipsum? Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum</p>
                        <p>What is Lorem Ipsum? Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum</p>

                        <div className="h-80 rounded-xl w-80 bg-white overflow-hidden">
                            <Image src={'/product/sepatu-air-jordan.png'} width={400} height={400} alt={'air-jordan'} className={'w-full h-full object-cover'}/>
                        </div>


                        <p>What is Lorem Ipsum? Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum</p>
                        <p>What is Lorem Ipsum? Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum</p>
                        <p>What is Lorem Ipsum? Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum</p>

                        <div className="h-80 rounded-xl w-80 bg-white overflow-hidden">
                            <Image src={'/product/sepatu-nike.png'} width={400} height={400} alt={'sepatu-nike'} className={'w-full h-full object-cover'}/>
                        </div>
                    </div>
                </section>
            </ContainerLayout>
        </>
    )
}