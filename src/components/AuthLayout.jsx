import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'


export default function Protected({ children, authentication = true }) {
    const navigate = useNavigate()
    const [loader, setLoader] = useState(true)
    const authStatus = useSelector((state) => state.auth.status)

    useEffect(() => {

        //TODO: make it more easy
        // if (authStatus === true) {
        //     navigate("/")
        // } else if(authStatus === false) {
        //     navigate("/login")
        // }

        // if authstatus can't understand then simply to this 
        // let authvalue = authStatus === true ? true : false


        if (authentication && authStatus !== authentication) {
            navigate("/login")

        } else if (!authentication && authStatus !== authentication) {
            navigate("/")
        }

        setLoader(false)

    }, [authStatus, navigate, authentication])

    return loader ? <h1>loading ...</h1> : <>{children}</>

}
