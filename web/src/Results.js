import React from 'react'
import { useState, useEffect } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from "@material-ui/core/Typography"
import StarIcon from '@material-ui/icons/Star';
import StarHalfIcon from '@material-ui/icons/StarHalf';
import StarBorderIcon from '@material-ui/icons/StarBorder';
import { Button, ButtonGroup } from '@material-ui/core';
import LanguageIcon from '@material-ui/icons/Language';
import useMediaQuery from '@material-ui/core/useMediaQuery'
import useFetch from './withFetch'
import Loader from "./Loader"

export const useStyles = makeStyles(theme => ({
    result: {
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "row",
        flexWrap: "wrap",
        margin: "2rem",
        overflow: "hidden"

    },
    header: {
        fontSize: "2rem",
        margin: "1rem"

    },

    bold: {
        fontWeight: "bold"
    },

    subtitle: {
        fontSize: "1rem",
        color: "dark grey",
        border: `10px solid ${theme.palette.primary}`
    },

    buttonGroup: {
        margin: "1rem",
    },
    column: {
        display: "flex",
        flexDirection: "column"
    },
    row: {
        display: "flex",
        flexDirection: "row"
    },
    colored : {
        color : "grey",
    }
})
)

const useCardStyles = makeStyles({
    card: {
        margin: "1rem",
        display: "flex",
        flexDirection: "column",
        maxHeight: "auto",
        maxWidth: "25vw",
        borderRadius: "20px",
        boxShadow: "10px 10px 15px rgba(64, 64, 64, 0.4)"
    },
    rating: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    icons: {
        fontSize: "1em",
        transform: 'translate(0%,10%)'
    },
    info: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        margin: "1rem",
    },
    media: {
        maxHeight: "100%",
        maxWidth: "100%",
        borderRadius: "20px 20px 0px 0px"
    },

})

const useGooglePlaces = (url_place, fetchNow) => {
    const encodedUrl = encodeURIComponent(url_place)
    const url = `http://127.0.0.1:5000/places/google?l=` + encodedUrl
    const [link, setLink] = useState("")
    const [hasLink, setHasLink] = useState(false)

    useEffect(() => {

        (async function () {
            let newLink = ""
            let newHasLink = false
            if (fetchNow) {
                console.log(`Fetching url for ${url_place}`)
                let response = await fetch(url)
                let json = await response.json()
                console.log(json)


                if (json !== null) {
                    newLink = json[0]
                    newHasLink = true
                    fetchNow = false
                    console.log("Found new link", newLink)
                }
                setLink(newLink)
                setHasLink(newHasLink)
                window.open(newLink)
            }
        }
        )()
    }, [url_place, fetchNow])
    return [link, hasLink, setLink]
}

const RestaurantResult = (props) => {
    const {link} = props
    return(
    <Result {...props} renderAdditionalContent={<a href={link} target="_blank" className={props.className}><LanguageIcon></LanguageIcon></a>}></Result>
    )

}

const HotelResult = (props) => {
    const {link} = props
    return(
    <Result {...props} renderAdditionalContent={<a href={link} target="_blank" className={props.className}><LanguageIcon></LanguageIcon></a>}></Result>
    )

}

const PlaceResult = (props) => {
    const { url_place } = props
    const [fetchNow, setFetchNow] = useState(false)
    const [link, hasLink] = useGooglePlaces(url_place, fetchNow)
    const onCardClick = () => {
        setFetchNow(true)
        // e.preventDefault()
    }
    console.log({hasLink,fetchNow})
    // console.log("hasLink",hasLink)

    return (
        <Result {...props} renderAdditionalContent= 
             {hasLink ? <a href={link} target="_blank" className={props.className}><LanguageIcon></LanguageIcon></a> :  <span onClick={onCardClick} className={props.className}><LanguageIcon ></LanguageIcon></span>}></Result >
        )
}




function Result(props) {
    const classes = useCardStyles();
    const { rating, name, image_url, review_count, price, renderAdditionalContent} = props
    let ratingStar = []
    for (let i = 1; i <= rating; i++) {
        ratingStar.push(1)
    }
    if (rating % 1 !== 0) {
        ratingStar.push(0.5)
    }

    const missingStarsNum = 5 - ratingStar.length
    const missingStars = Array(missingStarsNum).fill().map(() => (<StarBorderIcon className={classes.icons}></StarBorderIcon>))

    const Image = (<div>
        <img src={image_url} alt={name}
            // image={image_url}
            title={name}
            className={classes.media} />

    </div>)

    
return (
    <div className={classes.card}>
        {Image}

        <div className={classes.info}>
            <Typography variant="caption" gutterBottom>{name} <span className={classes.price}> <Typography variant='body2'> {price} </Typography> </span></Typography>
            <Typography variant="body2" gutterBottom >
                <div className={classes.rating}>
                    {ratingStar.map((rating, index) => rating === 1 ?
                        <StarIcon key={index} className={classes.icons}> </StarIcon> : <StarHalfIcon key={index} className={classes.icons}> </StarHalfIcon>)}
                    {missingStars}
                </div>
                <div>
                    {review_count} reviews
                            <div>
                    </div>
                </div>
            </Typography>
            {renderAdditionalContent}
        </div>

    </div>
)
}


function getSelected(selectedButtons) {
    for (let key of Object.keys(selectedButtons)) {
        if (selectedButtons[key]) {
            return key
        }
    }
}

export function Results(props) {
    const classes = useStyles();
    const { location, selectedButtons } = props.location.state
    const cityName = location.split(" ").map((name) => name[0].toUpperCase() + name.slice(1)).join(" ")
    const matches = useMediaQuery('(max-width:900px)');
    const smallerMatches = useMediaQuery('(max-width:400px)');
    const [buttons, setButton] = useState(selectedButtons)
    const selected = getSelected(buttons)
    const [loading, data, setLoading] = useFetch(`http://127.0.0.1:5000/${selected}?location=` + props.location.state.location)

    function createButtonHandler(buttonName) {
        function handleClick() {
            setButton(() => {
                let newButtons = {
                    "hotels": false,
                    "places": false,
                    "restaurants": false
                }

                newButtons[buttonName] = true
                return newButtons
            },

            setLoading(true)

            )
        }
        return handleClick
    }

    if (loading) {
        return (
            <>
             <div className={classes.header}>Take a look at your next adventure in <span className={classes.bold}>{cityName}</span></div>
                <div>
                    <ButtonGroup size="medium" color="primary" className={classes.buttonGroup}>
                        <Button variant={buttons["restaurants"] ? "contained" : "outlined"} onClick={createButtonHandler("restaurants")}>Restaurants</Button>
                        <Button variant={buttons["hotels"] ? "contained" : "outlined"} onClick={createButtonHandler("hotels")} >Hotels</Button>
                        <Button variant={buttons["places"] ? "contained" : "outlined"} onClick={createButtonHandler("places")}>Places</Button>
                    </ButtonGroup>

                </div>
                    <Loader />
                    </>)
    }
    else {

        let numCols
        if (smallerMatches) {
            numCols = 1
        } else if (matches) {
            numCols = 2
        } else {
            numCols = 5
        }

        const reverseIndex = (i) => {
            let y = Math.floor(i / numCols)
            let x = i - y * numCols

            return [x, y]
        }


        const columns = []
        for (let i = 0; i < numCols; i++) {
            columns[i] = []
        }


        for (let i = 0; i < data.length; i++) {
                const [x, y] = reverseIndex(i)
            columns[x][y] = data[i]
            }


        return (
            <>
                <div className={classes.header}>Take a look at your next adventure in <span className={classes.bold}>{cityName}</span></div>
                <div>
                    <ButtonGroup size="medium" color="primary" className={classes.buttonGroup}>
                        <Button variant={buttons["restaurants"] ? "contained" : "outlined"} onClick={createButtonHandler("restaurants")}>Restaurants</Button>
                        <Button variant={buttons["hotels"] ? "contained" : "outlined"} onClick={createButtonHandler("hotels")} >Hotels</Button>
                        <Button variant={buttons["places"] ? "contained" : "outlined"} onClick={createButtonHandler("places")}>Places</Button>
                    </ButtonGroup>

                </div>
                <div className={classes.subtitle}>{data.length} places found in {cityName}</div>


                <div className={classes.row}>

                  {columns.map(col => (
                        <div className={classes.column}>
                            {col.map((element, index) => (
                                <>
                                {buttons["hotels"] ? <HotelResult key={index} {...element} className={classes.colored}></HotelResult> : null}
                                {buttons["restaurants"] ? <RestaurantResult key={index} {...element} className={classes.colored}></RestaurantResult> : null}
                                {buttons["places"] ? <PlaceResult key={index} {...element} className={classes.colored}></PlaceResult> : null}
                                </>
                                
            
                            ))}
                        </div>
                    ))}
                </div>
            </>
        )
    }

}

export default Results