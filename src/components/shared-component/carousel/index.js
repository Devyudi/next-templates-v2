import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Slider from 'react-slick'
import {Button} from "antd";
import {LeftOutlined, RightOutlined} from "@ant-design/icons";

class Carousel extends Component {
    constructor(props = {}){
        super(props);
        this.state = {
            currentSlide: this.props?.currentSlide ?? 1,
            settings:{
                ...this.props.settings,
                dots: this.props?.settings?.dots ?? true,
                infinite: this.props?.settings?.infinite ?? false,
                speed: this.props?.settings?.speed ?? 500,
                lazyLoad: this.props?.settings?.lazyload ?? false,
                className: this.props?.settings?.className ?? "flex items-center justify-between -mx-4",
                slidesToShow: this.props?.settings?.slidesToShow ?? 3,
                slidesToScroll: this.props?.settings?.slidesToScroll ?? 1,
                responsive: this.props?.settings?.responsive ?? [
                    {
                        breakpoint: 1024,
                        settings: {
                            slidesToShow: 3,
                            slidesToScroll: 3,
                            infinite: true,
                            dots: false
                        }
                    },
                    {
                        breakpoint: 720,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1,
                            initialSlide: 1
                        }
                    },
                    {
                        breakpoint: 480,
                        settings: {
                            slidesToShow: 1,
                            slidesToScroll: 1
                        }
                    }
                ],
                beforeChange: (prev, next) => {
                    if('onChange' in this.props && typeof(this.props?.onChange) === 'function'){
                        this.props?.onChange(prev,next)
                    } else {
                        this.setState({...this.state,currentSlide: next});
                    }

                },
                prevArrow: this.props.settings.prevArrow ?? <div><Button type={'primary'} shape={'circle'} icon={<LeftOutlined/>}/></div>,
                nextArrow: this.props.settings.nextArrow ?? <div><Button type="primary" shape="circle" icon={<RightOutlined />} /></div>,
            }
        }
    }
    render(){
        return (
            <Slider {...this.state.settings} className={[this.state.settings.className,this.props?.classes?.parent].join(' ')}>
                {
                    'dataSource' in this.props && Array.isArray(this.props['dataSource']) &&
                    this.props.dataSource.map((item,index)=> {
                        return (
                            <div className={!this.props.classes?.item ? 'px-4':this.props.classes?.item}>
                                {this.props.render(item,index)}
                            </div>
                        )
                    })
                }
            </Slider>
        )
    }
}

Carousel.propTypes = {
    currentSlide: PropTypes.number,
    classes: PropTypes.shape({
        item: PropTypes.string,
        parent: PropTypes.string,
    }),
    onChange: PropTypes.func,
    dataSource: PropTypes.array.isRequired,
    render: PropTypes.func,
    settings: PropTypes.shape({
        dots: PropTypes.oneOf([true,false]),
        infinite: PropTypes.oneOf([true,false]),
        speed: PropTypes.oneOf([100,200,300,400,500,600,700,800,900,1000,1250,1500,1750,2000,2250,2500,2750,3000,4000,5000,6000,7000]),
        lazyLoad: PropTypes.oneOf([true,false]),
        className: PropTypes.string,
        slidesToShow: PropTypes.oneOf([1,2,3,4,5,6,7,8,9,10]),
        slidesToScroll: PropTypes.oneOf([1,2,3,4,5,6,7,8,9,10]),
        responsive: PropTypes.arrayOf(
            PropTypes.shape({
                breakpoint: PropTypes.number.isRequired,
                settings: PropTypes.shape({
                    slidesToShow: PropTypes.oneOf([1,2,3,4,5,6,7,8,9,10]),
                    slidesToScroll: PropTypes.oneOf([1,2,3,4,5,6,7,8,9,10]),
                    infinite: PropTypes.oneOf([true,false]),
                    dots: PropTypes.oneOf([true,false])
                }).isRequired
            },).isRequired
        ),
        prevArrow: PropTypes.any,
        nextArrow: PropTypes.any
    }).isRequired,

}
Carousel.defaultProps = {
    onChange: null,
    classes: {
        item: null,
        parent: null
    },
    currentSlide:1
}

export { Carousel }