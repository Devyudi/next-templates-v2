import React, {useEffect, useState} from 'react'
export default function useInViewport ( ref){
    const [ isIntersecting, setIsIntersecting ] = useState( false );

    const observer = React.useMemo(()=>{
            new IntersectionObserver(([entry])=>
                setIsIntersecting(entry.isIntersecting)
            )
        },
            []
    );

    useEffect(()=> {
        observer.observe(ref.current)
        return ()=> observer.disconnect()
    },[ref,observer])

    return isIntersecting
}