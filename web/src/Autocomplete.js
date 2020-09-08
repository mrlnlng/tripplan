import React from "react"
import { useState, useEffect } from "react"
import { makeStyles } from '@material-ui/core/styles';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import SearchIcon from '@material-ui/icons/Search';
import { Link } from "react-router-dom"
// import Search from "./Search";
import { SearchButton } from "./Search"
import useMediaQuery from '@material-ui/core/useMediaQuery';
const useStyle = makeStyles((theme) => (
    {
        option: props => ({
            fontSize: ".8rem",
            height: "1.4rem",
            padding: "0.4rem",
            background: "#F4FAF9",
            display: "flex",
            justifyContent: "flex-start",
            alignItems: "center",
            wordWrap: "normal",
            width: "auto",
            textAlign: "left"
            // '&:hover': {
            //     background: "#E1E1E1"
            // }
            //    background: props.index === props.selectedIndex ? "#E1E1E1" : "white"
        }),
        search: {
            // width: "30vw",
            display: "flex",
            flexDirection: "column",
            justifyContent: "flex-start",
            position: "relative"
            // height: "30vh"
            // background: "red"

        },
        input: {
            border: "0",
            height: '1.4rem',
            width: "25vw",
            padding: '.4rem 4rem .4rem .25rem',
            // width: props.width,
            borderRadius: '0rem .5rem .5rem 0rem',
            backgroundColor: '#F4FAF9',
            '&::placeholder': {
                fontWeight: 'normal',
                fontFamily: 'Raleway'

            }
        },
        
        

        suggestions: {
            width: "100%",
            position: "absolute",
            top: "2.7rem"

        },
        
        locationIcon: {
            fontSize: "1rem",
            color: "grey",
            marginRight: ".5rem"
            
        },
        searchIconDiv: {
            height: "2.2rem",
            background: "#F4FAF9",
            borderRadius: ".5rem 0rem 0rem .5rem",
            alignItems: "center",
            display: "flex",
            width: "2rem",
            paddingLeft: ".5rem",
            border: "none"


        },
        searchIcon: props => ({
            color: "#717473",
            
            // position: "absolute",
            // left: "0.12em",
            // bottom: "0.12em",
            // transform: "translate(150%)"
        }),
        searchBox: {
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "center"
        }
        
    }))
    
    export const Autocomplete = (props) => {
        const desktopMatches = useMediaQuery('(min-width: 1350px ')
        let elements
        
        if (desktopMatches) {
            elements = {
            // searchIconTransform: "translate(150%)"
        }
    }
    
    else {
        elements = {
            // searchIconTransform: "translate(150%)"
        }
    }
    // console.log(elements.selectedButtons)
    const [location, setLocation] = useState("")
    const [suggestions, setSuggestions] = useState([])
    // const [hovered, setHovered] = useState(false)
    const [input, setInput] = useState("")
    const [selectedIndex, setSelectedIndex] = useState(0)
    const [inputState, setinputState] = useState(true)
    // const [searchState, setSearchState] =  useState(false)
    const classes = useStyle(elements)
    var myHeaders = new Headers();
    // console.log("This is props.location", location) 
    myHeaders.append("Content-Type", "application/json");
    const hitsPerPage = 5
    // const lastIndexSuggestions = hitsPerPage - 1
    var raw = JSON.stringify({ "query": `${input}`, "type": "city", "language": "en", "aroundLatLngViaIP": false, "hitsPerPage": hitsPerPage });
    
    var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow'
    };
    
    useEffect(() => {
        (async function () {
            let max = 3
            let min = 2
            let randomNumber = Math.floor(Math.random() * (max - min)) + min
            let resp = await fetch(`https://places-${randomNumber}.algolianet.com/1/places/query`, requestOptions)
            // let resp = await fetch(`https://places-.algolianet.com/1/places/query`, requestOptions)
            let arrayInfoSuggestions
            if (resp.ok) {
                // console.log(input)
                let json = await resp.json()
                let arrayResp = json["hits"]
                // console.log(arrayResp)
                const arraySuggestions = arrayResp.filter(resp => resp["_highlightResult"]["locale_names"][0]["matchLevel"] === "full")
                arrayInfoSuggestions = arraySuggestions.map(element => {
                    return `${element["locale_names"][0]}, ${element["administrative"][0]}, ${element["country"]}`
                    // return { "city": element["locale_names"][0], "administrative": element["administrative"][0], "country": element["country"] }
                })
                // console.log("its okay!")
                // console.log(arrayInfoSuggestions)
                
                
            }
            else {
                arrayInfoSuggestions = []
            }
            setSuggestions(arrayInfoSuggestions)
        })()
        
    }, [input])
    
    useEffect(() => {
        setLocation(suggestions[selectedIndex])
    }, [selectedIndex])
    
    const handleChange = (e) => {
        // e.preventDefault()
        setLocation(e.target.value)
        setInput(e.target.value)
        
    }
    
    const handleKeyDown = (e) => {
        if (e.keyCode === 40) {
            setSelectedIndex(prevState => {
                let oldIndex
                let newIndex
                oldIndex = JSON.parse(JSON.stringify(prevState))
                if (oldIndex < hitsPerPage - 1) {
                    newIndex = oldIndex + 1
                }
                else {
                    newIndex = 0
                }
                return newIndex
            })
        }
        else if (e.keyCode === 38) {
            setSelectedIndex(prevState => {
                let oldIndex
                let newIndex
                oldIndex = JSON.parse(JSON.stringify(prevState))
                if (oldIndex > 0) {
                    newIndex = oldIndex - 1
                }
                else {
                    newIndex = 0
                }
                
                return newIndex
            })
        }
        else if (e.keyCode === 13) {
            setLocation(suggestions[selectedIndex])
            setinputState(false)
        }
        else if (e.keyCode === 8) {
            setinputState(true)
        }
    }
    
    
    if (inputState) {
        return (
            <>
                <div className={classes.search}>

                    <div className={classes.searchBox}>

                        <div className={classes.searchIconDiv}>
                            <SearchIcon className={classes.searchIcon}></SearchIcon>
                        </div>
                        {/* <form action=""></form> */}
                        <input
                            type="text"
                            placeholder="Where to?"
                            value={location || ''}
                            name="getridofchromeautocompletewithgiberrish-asldkajsldkajsdkaj-location"
                            autoComplete="chrome-off"
                            className={classes.input}
                            onChange={handleChange}
                            style={{"outline" : "none"}}
                            onKeyDown={(e) => {
                                handleKeyDown(e)
                            }}
                            >
                        </input>
                        <Link to=
                            {{
                                pathname: "/results",
                                state: { location: location, selectedButtons: props.selectedButtons }
                            }}
                            style={{ width: "0",textDecoration : "none" }}>
                            <div>
                                <SearchButton></SearchButton>
                            </div>
                        </Link>

                    </div>

                    <div className={classes.suggestions}
                        // style ={{marginTop: inputState ? ".6rem" : "0rem"}}
                        >
                        {suggestions.map((suggestion, index) => (
                            
                            <div className={classes.option}
                            key={index}
                                onClick={(e) => {
                                    setLocation(suggestion)
                                    setSelectedIndex(index)
                                    setinputState(false)
                                }}
                                value={suggestion}
                                style={{
                                    background: index === selectedIndex ? "#E1E1E1" : "white",
                                    cursor: "default",
                                    borderTopLeftRadius: index === 0 ? ".5rem" : null,
                                    borderTopRightRadius: index === 0 ? ".5rem" : null,
                                    borderBottomLeftRadius: index === (suggestions.length - 1) ? ".5rem" : null,
                                    borderBottomRightRadius: index === (suggestions.length - 1) ? ".5rem" : null
                                }}

                            ><LocationOnIcon className={classes.locationIcon}></LocationOnIcon>{suggestion}
                            </div>
                        )
                        )}

                    </div>

                </div>
            </>
        )
    }
    else {
        return (
            <div className={classes.search}>

                <div className={classes.searchBox}>

                    <div className={classes.searchIconDiv}>
                        <SearchIcon className={classes.searchIcon}></SearchIcon>
                    </div>
                    <input
                        type="text"
                        placeholder="Where to?"
                        value={location}
                        name="getridofchromeautocomplete-with-giverrish-asldkajsldkjalskdjlasdkj-location"
                        className={classes.input}
                        onChange={handleChange}
                        // onClick={handleClick}
                        style={{"outline":"none"}}
                        onKeyDown={(e) => {
                            handleKeyDown(e)
                        }}
                    >
                    </input>
                    <Link to=
                        {{
                            pathname: "/results",
                            state: { location: location, selectedButtons: props.selectedButtons }
                        }}
                        style={{ width: "0rem", textDecoration: "none" }}>
                        <SearchButton></SearchButton>
                    </Link>

                </div>
            </div>
        )
    }
}

export default Autocomplete