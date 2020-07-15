import React from 'react'
import { useState } from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Typography from "@material-ui/core/Typography"
import StarIcon from '@material-ui/icons/Star';
import StarHalfIcon from '@material-ui/icons/StarHalf';
import { Button, ButtonGroup } from '@material-ui/core';
import useMediaQuery from '@material-ui/core/useMediaQuery'
import useFetch from './withFetch'
import Loader from "./Loader"


const useStyles = makeStyles(theme => ({
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
        // border : `10px solid ${theme.palette.primary}`
    },
    column: {
        display: "flex",
        flexDirection: "column"
    },
    row: {
        display: "flex",
        flexDirection: "row"
    }
})
)

const useCardStyles = makeStyles({
    card: {
        margin: "1rem",
        display: "flex",
        flexDirection: "column",
        maxHeight: "auto",
        borderRadius: "20px",
        boxShadow: "10px 10px 15px rgba(64, 64, 64, 0.4)"
        // flex
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


function Result(props) {
    const classes = useCardStyles();
    const { rating, name, image_url, review_count, price } = props
    // const { loading } = loading
    let ratingStar = []
    for (let i = 1; i <= rating; i++) {
        ratingStar.push(1)
    }
    if (rating % 1 !== 0) {
        ratingStar.push(0.5)
    }

    return (
        <div className={classes.card}>
            <div>
                <img src={image_url} alt={name}
                    image={image_url}
                    title={name}
                    className={classes.media} />

            </div>
            <div className={classes.info}>
                <Typography variant="caption" gutterBottom>{name} <span className={classes.price}> <Typography variant='body2'> {price} </Typography> </span></Typography>
                <Typography variant="body2" gutterBottom >
                    <div className={classes.rating}>
                        {ratingStar.map((rating, index) => rating === 1 ?
                            <StarIcon key={index} className={classes.icons}> </StarIcon> : <StarHalfIcon key={index} className={classes.icons}> </StarHalfIcon>)}

                    </div>
                    <div>
                        {review_count} reviews
                    </div>
                </Typography>
            </div>
        </div>
    )
}

function getSelected(selectedButtons){
    for (let key of Object.keys(selectedButtons)){
        if (selectedButtons[key]){
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
    // alert(selected)
    const [loading, data] = useFetch(`http://127.0.0.1:5000/${selected}?location=` + props.location.state.location)
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
            }

            )
        }
        return handleClick
    }

    if (loading) {
        return (
            <Loader />)
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
                                <Result key={index} {...element} />
                            ))}
                        </div>
                    ))}
                </div>
            </>
        )
    }

}

export default Results