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
import NavBar from "./NavBar"
import airbnbIcon from "./airbnb.png"

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
        margin: "7rem 0rem 1rem 0rem",
        width: "100vw",
        justifyContent: "center"


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
        flexDirection: "row",
        justifyContent: "center"
    },
    colored: {
        color: "grey",
    },
    navbar: {
        zIndex: "10"
    },

    buttonClicked: {
        background: "linear-gradient(45deg, #429A8F 30%, #48B09E 90%)",
        color: "white",
        border: "none"
    },
    buttonUnclicked: {
        background: "white",
        color: "black",
    },
    loadingPage: {
        display: "flex",
        justifyContent: "center",
        flexDirection: "column",
        alignItems: "center"
    },
    resultPage: {
        overflow: "hidden"
    }




})
)

const useCardStyles = makeStyles({
    card: props => ({
        margin: "1rem",
        display: "flex",
        flexDirection: "column",
        maxHeight: "auto",
        maxWidth: props.smallerMatches ? "70vw" : "25vw",
        borderRadius: "20px",
        boxShadow: "10px 10px 15px rgba(64, 64, 64, 0.4)",
        // zIndex: "-1"
    }),
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
    media: props => ({
        // maxHeight : "8rem",
        // width : "100%",
        maxWidth: "100%",
        width: "100%",
        maxHeight: props.crop ? "16vh" : "100%",
        borderRadius: "20px 20px 0px 0px",
        objectFit: props.crop ? "cover" : "inherit",
    }),
    airbnb: {
        height: "auto",
        width: "20%",
        transform: "translate(0%, -20%)"
    },
    name: {
        display: "flex",
        justifyContent: "center"
    },
    responsiveText: {
        fontSize: "1vmin"
    }

})

const useGooglePlaces = (url_place) => {
    const encodedUrl = encodeURIComponent(url_place)
    const url = `http://127.0.0.1:5000/places/google?l=` + encodedUrl
    // console.log(url)
    const [link, setLink] = useState("")
    const [hasLink, setHasLink] = useState(false)
    const [fetchNow, setFetchNow] = useState(false)
    const [linkExists, setLinkExists] = useState(false)

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
                    setFetchNow(false)
                    setLinkExists(true)
                    console.log("Found new link", newLink)
                }
                else {
                    newLink = "http://localhost:3000/undefined"
                    newHasLink = true
                    setFetchNow(false)
                }
                setLink(newLink)
                setHasLink(newHasLink)
                if (linkExists) {

                    window.open(newLink)
                }

            }
        }
        )()
    }, [url_place, fetchNow])
    return [link, hasLink, linkExists, setFetchNow]
}

export const RestaurantResult = (props) => {
    const { link } = props

    return (
        <Result {...props} renderAdditionalContent={<a href={link} target="_blank" style={{ color: "grey" }}><LanguageIcon></LanguageIcon></a>}></Result>
    )

}

export const HotelResult = (props) => {
    const { link } = props
    return (
        <Result {...props} renderAdditionalContent={<a href={link} target="_blank" style={{ color: "grey" }}><LanguageIcon></LanguageIcon></a>}></Result>
    )

}

export const PlaceResult = (props) => {
    const { url_place } = props
    const [link, hasLink, setFetchNow, linkExists] = useGooglePlaces(url_place)
    const onCardClick = () => {
        setFetchNow(true)
        // e.preventDefault()
    }
    // console.log({ hasLink, fetchNow })
    console.log("hasLink", hasLink)
    let additionalContent
    // debugger
    console.table({hasLink,linkExists})
    if (linkExists) {
        additionalContent = <a href={link} target="_blank" style={{ color: "grey" }}><LanguageIcon></LanguageIcon></a>
    }
    else if (hasLink) {

        additionalContent = <span>No Link Found</span>
    }
    else {
        additionalContent = <span onClick={onCardClick}><LanguageIcon></LanguageIcon></span>
    }

    return (
        <Result {...props} renderAdditionalContent={additionalContent}></Result >
    )
}



export function Result(props) {
    const { className, crop } = props
    const smallerMatches = useMediaQuery('(max-width:400px)');
    const classes = useCardStyles({ crop, smallerMatches });
    const { rating, name, image_url, review_count, price, renderAdditionalContent } = props
    // const [cardReady, setCardReady] = useState(false)
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
            className={classes.media}
        // onLoad={() => {setCardReady(true)}}

        />

    </div>)

    return (
        <div className={[classes.card, className].join(" ")}>
            {/* {cardReady ? "image displayed" : "card loading. please wait"} */}
            {Image}
            <div className={classes.info}>
                <div className={classes.name}>
                    <Typography variant="caption" gutterBottom>{name}</Typography>
                    {/* <img src={airbnbIcon} alt="airbnb icon" className={classes.airbnb}></img> */}

                </div>
                <Typography variant="caption"><span className={classes.price}> <Typography variant='body2'> {price} </Typography> </span></Typography>
                <Typography variant="body2" gutterBottom className={classes.responsiveText}>
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

    const Buttons = (
        <div>
            <ButtonGroup size="large" className={classes.buttonGroup}>
                <Button className={buttons["restaurants"] ? classes.buttonClicked : classes.buttonUnclicked} onClick={createButtonHandler("restaurants")} disableElevation>Restaurants</Button>
                <Button className={buttons["hotels"] ? classes.buttonClicked : classes.buttonUnclicked} onClick={createButtonHandler("hotels")} disableElevation>Hotels</Button>
                <Button className={buttons["places"] ? classes.buttonClicked : classes.buttonUnclicked} onClick={createButtonHandler("places")} disableElevation>Places</Button>
            </ButtonGroup>

        </div>

    )
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
                <NavBar className={classes.navbar}></NavBar>
                <div className={classes.loadingPage}>

                    <div className={classes.header}>Take a look at your next adventure in <span className={classes.bold}>{cityName}</span></div>
                    <Loader />
                    {Buttons}
                </div>
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
                <div className={classes.resultPage}>

                    <div className={classes.header}>Take a look at your next adventure in <span className={classes.bold}>{cityName}</span></div>
                    {Buttons}
                    <div className={classes.subtitle}>{data.length} places found in {cityName}</div>

                    <NavBar></NavBar>

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
                </div>
            </>
        )
    }

}

export default Results