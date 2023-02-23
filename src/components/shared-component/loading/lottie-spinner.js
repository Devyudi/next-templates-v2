import React from 'react'
import PropTypes from 'prop-types'
import Lottie from 'react-lottie'
import * as AnimationData from '../../../assets/json/spinner.json'
export const LottieSpinner = (props)=> {
    let { height, width, isStopped, isPaused } = props

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: AnimationData,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice'
        }
    };
    return (
        <div className="relative block flex items-center justify-center">
            <Lottie options={defaultOptions}
                    height={height}
                    width={width}
                    isStopped={isStopped}
                    isPaused={isPaused}/>
            <div className="absolute top-0 left-0 w-full h-full z-10"/>
        </div>
    )
}
LottieSpinner.propTypes = {
    height: PropTypes.number,
    width: PropTypes.number,
    isStopped: PropTypes.bool,
    isPaused: PropTypes.bool
}

LottieSpinner.defaultProps = {
    height :50,
    width:50,
    isStopped:false,
    isPaused:false
}