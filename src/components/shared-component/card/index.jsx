/*******************************************************************************
 * @author Mochamad Yudi Sobari
 * @github https://github.com/mochamadyudi
 * @email yuyuid.id12@gmail.com
 * @contact +6285718851007
 ******************************************************************************/

import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Link from 'next/link'
import Helpers from "@moonlay/helpers";
import Image from 'next/image';

class Card extends Component{
    static Shop = CardShop
    static Primary = CardPrimary
    static Secondary = CardSecondary
    static Product = CardProduct

    static Banner = CardBanner

    render() {
        return (
            <div className="w-full min-h-60 bg-white  rounded-xl overflow-hidden">
                <div className="h-40 border w-full relative rounded-xl">
                    <Image
                        width={1920}
                        height={1920}
                        className={'object-cover absolute top-1/2 left-1/2 transform -translate-x-2/4 -translate-y-2/4 h-full w-full '}
                        src={'https://images.unsplash.com/photo-1531564701487-f238224b7ce3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80'} alt={'unsplash-images'}/>
                </div>
                <div className="h-40  rounded-xl">

                </div>
            </div>
        );
    }
}

/**
 * @component Card.Shop
 * @function Card.Shop
 */
function CardShop(props){
    return (
        <div className="w-full h-80 relative bg-white rounded-xl overflow-hidden">
            <div className="w-full h-full relative z-[1]">
                <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-black p-3">
                    <h3 className={'text-white font-semibold text-2xl truncate tracking-wide poppins'}>Testing</h3>
                    <p className={'text-white text-sm line-clamp-2'}>Lorem ipsum dolor sit amet lorem ipsum dolor sit amet ipsum dolor sit amet</p>
                </div>
            </div>
            <Image
                width={1920}
                height={1920}
                srcSet={'/assets/img-1.jpg'}
                src={'/assets/img-1.jpg'}
                alt={'image-card'}
                className={'w-full h-full absolute top-0 left-0 object-cover'}
            />
        </div>
    )
}
CardShop.propTypes = {
    images: PropTypes.shape({
        src: PropTypes.string,
        alt: PropTypes.string,
        fallback: PropTypes.string,
    }),
    title: PropTypes.string.isRequired,
}
CardShop.defaultProps = {}

/**
 * @private
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
function CardBanner(props){
    return (
        <div className="w-full">
            <h1>Card Banner</h1>
        </div>
    )
}
CardBanner.propTypes = {}
CardBanner.defaultProps = {}

/**
 * @private
 * @param props
 * @returns {JSX.Element}
 * @constructor
 */
function CardProduct(props){
    let {url,price,ExtraAction,images} = props
    return (
        <div className="w-full h-80 relative bg-white rounded-xl overflow-hidden">
            <div className="w-full h-full relative z-[1]">
                <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-black p-3">
                    <Link href={props?.url ?? '/not-found'}>
                        <h3 className={'font-semibold text-white text-lg truncate tracking-normal poppins'}>{props?.title ?? "-"}</h3>
                    </Link>
                    <div className="flex justify-between items-center gap-4">
                        <p className={'text-white font-bold text-xl'}>{[price?.prefix,Helpers.numberFormat(price?.total)].join('')}</p>
                        {typeof(ExtraAction) !== 'undefined' && typeof(ExtraAction) === 'object' && ExtraAction}
                    </div>
                </div>
            </div>
            <div className={'w-full h-full absolute top-0 left-0 object-cover'}>
                <Image
                    {...images}
                    // width={images?.width ?? 520}
                    // height={images?.height ?? 520}
                    // placeholder={'blur'}
                    fill
                    sizes={"(max-width:768px) 100vw,(max-width:1200px) 50vw, 33vw"}
                    src={[images?.src].join('')}
                    className={'w-full h-full absolute top-0 left-0 object-cover'}
                    alt={images?.alt ?? ''}
                />
            </div>
        </div>
    )
}
CardProduct.propTypes = {
    images: PropTypes.shape({
        src: PropTypes.string.isRequired,
        alt: PropTypes.string.isRequired
    }).isRequired,
    title: PropTypes.string.isRequired,
    price: PropTypes.shape({
        prefix: PropTypes.string.isRequired,
        total: PropTypes.number.isRequired,
    }).isRequired,
    url: PropTypes.string.isRequired,
    ExtraAction: PropTypes.element
}
CardProduct.defaultProps = {
    url: '/not-found',
    ExtraAction: null,
    price:{
        total:0,
        prefix:'Rp'
    },
    title: 'undefined',
    images: {
        src: null,
        alt:'image-undefined'
    }
}



function CardPrimary(props){
    return (
        <div className="w-full h-80 relative bg-white rounded-xl overflow-hidden">
            <div className="w-full h-full relative z-[1]">
                <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-black p-3">
                    <Link href={props?.url ?? '/not-found'}>
                        <h3 className={'text-white text-lg truncate tracking-normal poppins'}>{props?.title ?? "-"}</h3>
                    </Link>
                    <div className="flex justify-between items-center gap-4">
                        <p className={'text-white font-bold text-3xl'}>$4.00</p>
                        <button className={'text-white border rounded px-6 py-1 text-sm hover:bg-white hover:text-blue-500 transition duration-200'}>Beli</button>
                    </div>
                </div>
            </div>
            <Image
                width={1920}
                height={1920}
                srcSet={'/assets/img-1.jpg'}
                src={'/assets/img-1.jpg'}
                alt={'image-card'}
                className={'w-full h-full absolute top-0 left-0 object-cover'}
            />
        </div>
    )
}
CardPrimary.propTypes = {
    images: PropTypes.shape({
        src: PropTypes.string,
        alt: PropTypes.string,
        fallback: PropTypes.string,
    }),
    title: PropTypes.string.isRequired,
    url:PropTypes.string.isRequired,
}
CardPrimary.defaultProps = {}

function CardSecondary(props){

    return (
        <div className="w-full h-80 relative bg-white rounded-xl overflow-hidden">
            <div className="w-full h-full relative z-[1]">
                <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-black p-3">
                    <h3 className={'text-white font-semibold text-2xl truncate tracking-wide poppins'}>Testing</h3>
                    <p className={'text-white text-sm line-clamp-2'}>Lorem ipsum dolor sit amet lorem ipsum dolor sit amet ipsum dolor sit amet</p>
                </div>
            </div>
            <Image
                width={1920}
                height={1920}
                srcSet={'/assets/img-1.jpg'}
                src={'/assets/img-1.jpg'}
                alt={'image-card'}
                className={'w-full h-full absolute top-0 left-0 object-cover'}
            />
        </div>
    )
}
CardSecondary.propTypes = {
    images: PropTypes.shape({
        src: PropTypes.string,
        alt: PropTypes.string,
        fallback: PropTypes.string,
    }),
    title: PropTypes.string.isRequired,
}
CardSecondary.defaultProps = {}

Card.propTypes = {
    images: PropTypes.shape({
        src: PropTypes.string,
        alt: PropTypes.string,
        fallback: PropTypes.string,
    }),
    title: PropTypes.string.isRequired,
}
Card.defaultProps = {}


export {Card}