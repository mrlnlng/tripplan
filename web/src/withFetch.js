// import React from "react"
import { useEffect, useState} from "react"
// import Loader from "./Loader"

function useFetch(url){
    const [loading, setLoading] = useState(true)
    const [data, setData] = useState(undefined)
    useEffect(() => {

        (async function () {
            let response = await fetch(url)
            let json = await response.json()
            setData(json)
            setLoading(false)

        }
        )()
    }, [url])
    
    return [loading,data]
}


// const [loading,data] = useFetch("h127.0l0/restaurants")


// export const withFetch = (Component,url) => {
//     const ReturnedComponent = (props) => {
//         const [loading, setLoading] = useState(true)
//         const [data, setData] = useState(undefined)
//         useEffect(() => {

//             (async function () {
//                 let response = await fetch(url)
//                 let json = await response.json()
//                 setData(json)
//                 setLoading(false)

//             }
//             )()
//         }, [])


//         if (loading) {
//             return <Loader />
//         } else {
//             return <Component data={data} {...props}/>
//         }
//     }
//     return ReturnedComponent
// }

export default useFetch