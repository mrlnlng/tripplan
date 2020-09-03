import React, { useState, useEffect } from 'react'
import { makeStyles } from "@material-ui/styles"
import { styled } from "@material-ui/styles"
import { Link } from "react-router-dom"
import Header from './Header.js'
import headerImage from "./header.png"
import background from './background.jpg'
import SearchIcon from '@material-ui/icons/Search';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Button from '@material-ui/core/Button'
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import { Result, HotelResult, PlaceResult, RestaurantResult } from './Results'
import { useFetch } from './withFetch'
import LocationOnIcon from '@material-ui/icons/LocationOn';
import Autocomplete from "./Autocomplete"
import Skeleton from '@material-ui/lab/Skeleton';


const TopCard = ({ data, destinationOption }) => {
    let props
    if (data !== undefined) {
        props = JSON.parse(JSON.stringify(data[0]))
    }

    props = Object.assign({}, props, { crop: true })

    let renderedResult

    if (destinationOption === "restaurants") {
        renderedResult = <RestaurantResult {...props} ></RestaurantResult>
    }
    else if (destinationOption === "hotels") {
        renderedResult = <HotelResult {...props} ></HotelResult>
    }
    else if (destinationOption === "places") {
        renderedResult = <PlaceResult {...props}></PlaceResult>
    }

    return (
        <div>
            {renderedResult}
        </div>
    )
}

const useStyles = makeStyles({
    optionMenu: props => ({
        display: 'flex',
        flexDirection: 'row',
        alignItems: "center",
        order: props.orderSelect,
        marginBottom: ".5rem",
        // background: "#F4FAF9"

    }),
    input: props => ({
        border: "0",
        height: '1.4rem',
        padding: '.4rem 3.25rem',
        width: props.width,
        borderRadius: '.5rem',
        backgroundColor: '#F4FAF9',
        
        '&::placeholder': {
            fontWeight: 'normal',
            fontFamily: 'Raleway'

        }
    }),
    button: {
        backgroundColor: "#83CFC8",
        color: "#FFFFFF",
        borderRadius: ".2rem",
        borderColor: "#83CFC8"
    },
    background: props => ({
        zIndex: '-100',
        width: "150vw",
        transform: props.transform

    }),
    crop: {
        position: "absolute",
        width: "100vw",
        maxHeight: "50vh",
        overflow: "hidden",
        top: "0",
        display: "flex",
        flexDirection: "column",


    },
    search: props => ({
        zIndex: "1000",
        display: "flex",
        alignItems: "flex-start",
        order: props.orderSearch
    }),
    title: props => ({
        zIndex: "10000",
        marginBottom: "2.5rem",
        marginTop: "5rem",
        display: "flex",
        flexDirection: props.flexDirection,
        alignItems: "center",
        transform: "translate(20%)",
        // height: "20vh",
        // width: "50vw",
        // transform: "(scale(20%))",
    }),
    logo: {
        marginRight: "1rem",
        width: "5.5rem",
        height: "auto",
    },
    name: {
        fontWeight: "Bold",
        color: "white",
        fontSize: "2rem"
    },
    container: props => ({
        display: "flex",
        flexDirection: props.flexDirectionContainer,
        alignItems: props.alignItemContainer
        // flexWrap : "wrap",
        // flexDirection : "column",
        // flexDirection : "row",
        // justifyContent : "center",
        // flexGrow : '1',
        // alignItems : "flex-start",
        // background: "red"
    }),
    underline: props => ({
        background: "white",
        width: "3rem",
        height: "0.3rem",
        transform: props.underlineTransform
    }),
    selectForm: props => ({
        border: "none",
        padding: ".5rem 2rem .5rem 1rem",
        borderRadius: "1rem",
        appearance: "none",
        color: "#717473",
        marginLeft: "1rem"
        // transform: "translate(-20%)"

    }),
    dropDownArrow: {
        color: "#717473",
        transform: "translate(-150%)"
    },
    mainMenu: props => ({
        display: "flex",
        flexDirection: "column",
        alignItems: props.alignItems,
        transform: props.mainMenuTransform
    }),
    page: {
        display: "flex",
        flexDirection: "column",
        height: "50vh",
        justifyContent: "space-between",
    },
    upperBody: {
        display: "block",
    },
    randomSlides: {
        zIndex: "1000",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        animation: "$fadein 2s",

    },

    "@keyframes fadein": {
        from: {
            opacity: 0
        },
        to: {
            opacity: 1
        }
        // overflow: "hidden",
        // maxHeight: "5rem"
        // transform: "scale(70%)"
    },
    subtitle: {
        display: "flex",
        justifyContent: "flex-start",
        fontWeight: "bold",
        fontSize: "1.5rem",
        marginTop: "1rem",
        color: "#429a8f"


    },
    subtitleContainer: {
        display: "flex",
        alignItems: "flex-end"
    },

    rectangle: {
        height: "30px",
        width: "6px",
        marginRight: ".5rem",
        backgroundColor: "#429a8f"
    },
    lowerBody: props => ({
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        width: "90vw",
        height: "40vh",
        paddingTop: "1rem",
        paddingBottom: "1rem",
        background: props.background
    }),
    randomCard: {
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        alignItems: "center",
        // transform: "translate(0,)"
    },
    cardSubtitle: {
        display: "flex",
        flexDirection: "column",
        color: "grey",
        fontSize: "1rem",
        alignItems: "flex-start",
    },
    containerWithIcon: {
        display: "flex",
        marginTop: "1rem"
    },
    locationIcon: {
        fontSize: "2rem",
        color: "grey",
        marginRight: "1rem"
    },
    searchPage: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
    },
    autocomplete: {
        zIndex: "10000"
    },
    loadingSkeletons: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
        marginTop: "1rem"
    },
    loadingSkeleton: {
        display: "flex",
        flexDirection: "column"
    },
    loadingSkeletonText: {
        display: "flex",
        flexDirection: "column",
    },
    loadingSubtitleContainer: {
        display: "flex",
        marginTop: "1rem"
    }


})

const useColorStyle = makeStyles(
    {
        gradient: {
            background: 'linear-gradient(45deg, #429A8F 30%, #48B09E 90%)',
            color: "white",
            marginLeft: "1rem",
            maxHeight: "1.65rem",
            transform: "translate(-150%)"
        }
    }
)


export const SearchButton = () => {
    const classes = useColorStyle()
    return (
        <Button variant="contained" size="small" className={classes.gradient} disableElevation>Search</Button>
    )
}

const randomizeCard = () => {
    const topCityArray = ["London", "New York", "Paris", "Tokyo", "Singapore", "Barcelona", "Los Angeles", "Rome", "San Francisco", "Chicago", "Madrid", "Amsterdam", "Toronto", "Montreal", "Hong Kong", "San Diego", "Boston", "Sydney", "Las Vegas", "Miami", "San Jose"]
    const destinationOptionsArray = ["restaurants", "hotels", "places"]
    const randomNumberCity = Math.floor(Math.random() * Math.floor(topCityArray.length))
    const randomOption = Math.floor(Math.random() * Math.floor(destinationOptionsArray.length))
    const destinationOption = destinationOptionsArray[randomOption]
    const chosenCity = topCityArray[randomNumberCity]

    return [destinationOption, chosenCity]

}



export function Search() {
    // STYLE
    let props
    let elements
    let numberCards
    const tabletMatches = useMediaQuery('(min-width: 900px)')
    const desktopMatches = useMediaQuery('(min-width: 1350px ')
    const placeholderMatches = useMediaQuery('(min-width: 10px ')

    console.table({ tabletMatches, desktopMatches, placeholderMatches })

    if (desktopMatches) {
        props = {
            transform: "translate(-20%, -40%) scale(75%)",
            flexDirection: "row",
            alignItems: "flex-start",
            underlineTransform: "translate(-380%, 450%)",
            width: "25vw",
            flexDirectionContainer: "row",
            mainMenuTransform: "translate(-40%)",
            orderSelect: "2",
            orderSearch: "1",
            alignItemContainer: "flex-start"

        }
        numberCards = 4
    }
    else if (tabletMatches) {
        props = {
            transform: "translate(0, -40%)",
            flexDirection: "row",
            alignItems: "flex-start",
            underlineTransform: "translate(-380%, 450%)",
            width: "25vw",
            flexDirectionContainer: "row",
            mainMenuTransform: "translate(-20%)",
            orderSelect: "2",
            orderSearch: "1",
            alignItemContainer: "flex-start"

        }
        numberCards = 3
    }
    else {
        props = {
            transform: "translate(0)",
            flexDirection: "column",
            alignItems: "center",
            underlineTransform: "translate(-150%, 130%)",
            width: "50vw",
            flexDirectionContainer: "column",
            mainMenuTransform: "translate(0%)",
            orderSelect: "1",
            orderSearch: "2",
            alignItemContainer: "center"
        }
        numberCards = 1
    }
    const classes = useStyles(props)
    let loadingSkeletonArray = new Array(numberCards).fill(1)

    // VARIABLES + STATES
    // const [location, setLocation] = useState("")
    const [selectedButtons, setButtons] = useState({
        "hotels": false,
        "places": false,
        "restaurants": true
    })


    const [randomCards, setRandomCards] = useState([])
    const [loading, setLoading] = useState(true)
    elements = { selectedButtons: selectedButtons }
    const fetchNewCard = async () => {
        let response
        const [newDestinationOption, newChosenCity] = randomizeCard()
        response = await fetch(`http://127.0.0.1:5000/${newDestinationOption}?location=${newChosenCity}`)
        return response
    }
    const setAllCards = async () => {
        setLoading(true)
        let newRandomCards = []
        let chosenCityArray = []
        for (let i = 0; i < numberCards; i++) {
            const [destinationOption, chosenCity] = randomizeCard()
            if (!(chosenCity in chosenCityArray)) {
                let randomDict = { destinationOption, chosenCity }
                newRandomCards.push(randomDict)
            }
            chosenCityArray.push(chosenCity)

        }
        (async function () {
            let responses = await Promise.all(newRandomCards.map(({ destinationOption, chosenCity }) => fetch(`http://127.0.0.1:5000/${destinationOption}?location=${chosenCity}`)))
            let datas = await Promise.all(responses.map(async response => {
                while (!response.ok) {
                    response = await fetchNewCard()
                    if (response.ok) {
                        break
                    }
                }
                return response.json()
            }
            ))
            let newRandomCardsData = datas.map((data, index) => Object.assign({}, { data }, newRandomCards[index]))

            setRandomCards(newRandomCardsData)
            setLoading(false)
        })()
    }

    useEffect(() => {
        if (placeholderMatches) {
            setAllCards()
        }

    }, [placeholderMatches])

    useEffect(() => {
        const shuffleCards = setTimeout(() => {
            setAllCards()
        }, 10000)
        return () => clearTimeout(shuffleCards)

    }, [numberCards, randomCards])



    function createChangeHandler() {
        const e = document.getElementById("formOption")
        const nameOption = e.options[e.selectedIndex].value
        function buttonHandler() {
            setButtons(prevState => {
                let newSelectedButtons = {
                    "hotels": false,
                    "places": false,
                    "restaurants": false
                }
                // JSON.parse(JSON.stringify(prevState))
                newSelectedButtons[nameOption] = true
                // console.log(newSelectedButtons)
                return newSelectedButtons
            })

        }
        return buttonHandler
    }

    console.table(randomCards)
    return (
        <>
            <div className={classes.searchPage}>

                <div className={classes.crop}>
                    <img src={background} className={classes.background}></img>
                    {/* <Header/> */}
                </div>

                <div className={classes.page}>
                    <div className={classes.mainMenu}>

                        <div className={classes.title}>
                            <img src={headerImage} className={classes.logo}></img>
                            <div className={classes.name}>TRIP PLAN</div>
                            <div className={classes.underline}></div>
                        </div>
                        <div className={classes.container}>
                            <div className={classes.search}>
                                <Autocomplete className={classes.input} {...elements}></Autocomplete>
                            </div>

                            <div className={classes.optionMenu}>
                                <form onChange={() => createChangeHandler()()}>
                                    <select id="formOption" className={classes.selectForm}>

                                        <option
                                            value="restaurants"
                                            name="restaurants"
                                        // onClick={() => createChangeHandler("restaurants")()}
                                        // style={{ borderColor: selectedButtons["restaurants"] ? "black" : "#E1E1E1" }}
                                        >Restaurants</option>
                                        <option
                                            value="hotels"
                                            name="hotels"
                                        // onClick={createChangeHandler("hotels")}
                                        // style={{ borderColor: selectedButtons["hotels"] ? "black" : "#E1E1E1" }}
                                        >Hotels</option>
                                        <option
                                            value="places"
                                            name="places"
                                        // onClick={createChangeHandler("places")}
                                        // style={{ borderColor: selectedButtons["places"] ? "black" : "#E1E1E1" }}
                                        >Places</option>
                                    </select>
                                </form>
                                <div>
                                    <ArrowDropDownIcon className={classes.dropDownArrow}></ArrowDropDownIcon>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

                <div className={classes.lowerBody}>
                    <div className={classes.subtitleContainer}>
                        <div className={classes.rectangle}></div>
                        <div className={classes.subtitle}>EXPLORE OUR DESTINATIONS</div>
                    </div>

                    {!loading ?

                        <div className={classes.randomSlides}>
                            {

                                randomCards.map((cardProps, index) => (
                                    <>
                                        <div className={classes.randomCard}>

                                            <TopCard key={index} {...cardProps}></TopCard>


                                            <div className={classes.containerWithIcon}>
                                                <div><LocationOnIcon className={classes.locationIcon}></LocationOnIcon></div>
                                                <div className={classes.cardSubtitle}>
                                                    <div>
                                                        {randomCards[index]["chosenCity"]}
                                                    </div>
                                                    <div>
                                                        {randomCards[index]["destinationOption"][0].toUpperCase() + randomCards[index]["destinationOption"].slice(1)}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </>
                                ))
                            }

                        </div> :
                        <div className={classes.loadingSkeletons}>
                            {loadingSkeletonArray.map(index => (
                                <>
                                    <div className={classes.loadingSkeleton}>
                                        <div>
                                            <Skeleton variant="rect" width={250} height={260} key={index}></Skeleton>
                                        </div>
                                        <div className={classes.loadingSubtitleContainer}>
                                            <div><LocationOnIcon className={classes.locationIcon}></LocationOnIcon></div>
                                            <div className={classes.loadingSkeletonText}>
                                                <Skeleton variant="text" width={100} />
                                                <Skeleton variant="text>" width={150} />
                                            </div>

                                        </div>
                                    </div>
                                </>
                            ))}
                        </div>
                    }
                </div>
            </div>


        </>


    )
}
export default Search