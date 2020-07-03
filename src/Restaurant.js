import React, { useState } from "react"
import { useEffect } from "react"
import Results from './Results'


function Restaurant(props) {
    const { location, selectedButtons } = props.location.state
    const [restaurants, setRestaurants] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        (async function () {
            let response = await fetch("http://127.0.0.1:5000/restaurants?location=" + location)
            let json = await response.json()
            let newRestaurants = []
            if (Array.isArray(json["businesses"])) {
                newRestaurants = json["businesses"]
            }
            setRestaurants(newRestaurants)
            setLoading(false)
        })()


    }, [])
    console.log(restaurants)
    if (loading) {
        return "Loading"
    } else {
        return (

            <>
                <div className={classes.restaurant}>
                    {restaurants.map(restaurant => <Restaurant {...restaurant} />)}
                </div>

            </>)
    }
}

export default Results(Restaurant)
