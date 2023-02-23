import React,{useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import {Button, Col, Empty, Row} from 'antd'
import axios from 'axios'
import * as CardMoonlay from "@moonlay/src/components/shared-component";

function ProductHistorySearchComponent(props){
    let {inScreen} = props
    const [ _isCall, _setIsCall ] = useState(false)
    const [ loading,setLoading ] = useState(false)
    const [ data, setData ] = useState([])
    const [ params,setParams ] = useState({})

    useEffect(()=> {
        if(!_isCall && inScreen){
            setLoading(true)
            axios.get([process.env.NEXT_PUBLIC_APP_DOMAIN,'product.json'].join('/'))
                .then((response)=> {
                    setData([...response?.data])
                    setLoading(false)
                })
                .catch((err)=> {
                    setLoading(false)
                    setData([])
                })
            _setIsCall(true)
        }
    },[inScreen])
    return (
        <div className="w-full space-y-6">
            <div className="flex items-center gap-4">
                <h3>Berdasarkan Pencarianmu {inScreen ? "true": "false"}</h3>
                <Button type={'link'}>Lihat Semua</Button>
            </div>
            <div className="w-full">
                <Row gutter={[8,8]}>
                    {
                        loading ? (
                            [0,1,2,3,4,5].map((item,index)=> (
                                <Col span={6} key={`card-product-list-${index + 1}`}>
                                    <div className="w-full h-96 bg-gray-500">

                                    </div>
                                </Col>
                            ))
                        ):
                        Array.isArray(data) && data.length > 0 ?
                            data.map((item,index)=>{
                                return (
                                    <Col span={6} key={`card-product-list-${index + 1}`}>
                                        <CardMoonlay.Card.Product
                                            title={item?.name ??''}
                                            images={{
                                                src: item?.thumbnail,
                                                alt: 'image-dummy',
                                                fallback: 'logo-next.png'
                                            }}
                                            url={['/product',item?.id,item?.slug].join('/')}
                                            price={{
                                                prefix:'Rp',
                                                total:item?.price
                                            }}
                                        />
                                    </Col>
                                )
                            })
                            :(
                                <Col span={24}>
                                    <Empty/>
                                </Col>
                            )
                    }
                </Row>
            </div>
        </div>
    )
}

ProductHistorySearchComponent.propTypes = {
    inScreen: PropTypes.bool.isRequired
}

ProductHistorySearchComponent.defaultProps = {
    inScreen: false
}

export default ProductHistorySearchComponent