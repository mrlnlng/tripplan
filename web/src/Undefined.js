import React from 'react'
import { makeStyles } from '@material-ui/core'
import headerImage from "./tripplanBlue.png"
const useStyle = makeStyles(
    {
        mainTitle: {
            fontWeight: "bolder",
            fontSize: "5rem",
            color: "#5DB4AC"
        },
        subtitle: {
            fontSize: "1rem",
            color: "#5DB4AC"
        },
        container: {
            display: "flex",
            flexDirection: "column",
            height: "100vh",
            alignItems: "center",
            justifyContent: "center"
        },
        icon: {
            height: "13rem"
        }

    }
)
export const Undefined = () => {
    const classes = useStyle()
    return (
        <>
            <div className={classes.container}>
                <img src={headerImage} className={classes.icon}></img>
                <div className={classes.mainTitle}>
                    Error 404
        </div>
                <div className={classes.subtitle}>
                    Oops, something went wrong
        </div>
            </div>
        </>
    )
}

export default Undefined
