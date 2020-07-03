import React from 'react'
import { useEffect } from "react"
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from "@material-ui/core/Typography"
import StarIcon from '@material-ui/icons/Star';
import StarHalfIcon from '@material-ui/icons/StarHalf';

const useStyles = makeStyles({
    result: {
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "row",
        flexWrap: "wrap",
        margin: "2rem"

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
        color: "dark grey"
    }
}
)

const useCardStyles = makeStyles({
    card: {
        margin: ".5rem",
        display: "flex",
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
    }
})

function Result({ rating, name, image_url, review_count, }) {
    const classes = useCardStyles();

    let ratingStar = []
    for (let i = 1; i <= rating; i++) {
        ratingStar.push(1)
    }
    if (rating % 1 != 0) {
        ratingStar.push(0.5)
    }

    return (
        <Card className={classes.card}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    alt={name}
                    height="200rem"
                    image={image_url}
                    title={name}
                />

                <CardContent>
                    <Typography variant="caption" gutterBottom>{name}</Typography>
                    <Typography variant="body2" gutterBottom>
                        <div className={classes.rating}>
                            {ratingStar.map((rating) => rating == 1 ?
                                <StarIcon className={classes.icons}> </StarIcon> : <StarHalfIcon className={classes.icons}> </StarHalfIcon>)}

                        </div>
                        <div>{review_count} reviews</div>
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    )
}

const UpdatedComponent = (OriginalComponent) => {
    function NewResults() {
        if (loading) {
            return "Loading"
        } else {
            return (

                <>
                    <div className={classes.header}>Take a look at your next adventure in <span className={classes.bold}>{cityName}</span></div>
                    <div className={classes.subtitle}>{restaurants.length} places found in {cityName}</div>
                    <div className={classes.result}>
                        {restaurants.map(restaurant => <Result {...restaurant} />)}
                    </div>

                </>)
        }
    }
    return NewResults
}

export default UpdatedComponent