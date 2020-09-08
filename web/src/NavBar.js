import React from "react"
// import { useState } from "react"
import { makeStyles } from '@material-ui/core/styles';
import headerImage from "./tripplanBlue.png"
import { Link } from 'react-router-dom';
// import Button from '@material-ui/core/Button';
import useMediaQuery from '@material-ui/core/useMediaQuery'
import Avatar from '@material-ui/core/Avatar';
import { Autocomplete } from './Autocomplete'

const navBarStyle = makeStyles(() => (
    {
        whiteBar: {
            backgroundColor: "white",
            height: "5rem",
            width: "100vw",
            flexDirection: "row",
            listStyleType: "none",
            position: "fixed",
            top: "0",
            boxShadow: "0px 1px 10px #DEDEDE",
            zIndex: "100"
        },

        navBar: {
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            width: "90%",
            margin: "0 auto"
        },
        title: {
            width: '100%',
            fontSize: "1.75rem",
            fontWeight: 'Bold',

            display: "flex",
            alignItems: "center",
            margin: "0rem 1rem",
            color: "#5DB4AC",
        },
        textField: {
            alignItems: "center",
            display: "flex",
        },
        logo: {
            display: 'flex',
            flexDirection: "row",
            alignItems: "center",
        },
        search: {
            paddingRight: ".75rem"
        },
        avatar: {
            display: "flex",
            
        }

    }

))
// const useColorStyle = makeStyles(
//     {
//         gradient: {
//             background: 'linear-gradient(45deg, #429A8F 30%, #48B09E 90%)',
//             color: "white",
//             marginLeft: "1rem",
//             transform: "translate(0%, 20%)"
//         }
//     }
// )


export const NavBar = () => {
    // const [, setSearchButton] = useState(false)
    const classes = navBarStyle()
    const smallerMatches = useMediaQuery('(max-width:1000px)');


    return (
        <>
            <div className={classes.whiteBar}>
                <div className={classes.navBar}>

                    <div>
                        <Link to="/" exact="true" style={{ textDecoration: "none", color: "black" }}>
                            <div className={classes.logo}>
                                <div>
                                    <img src={headerImage} alt="airplane logo" height="90"></img>
                                </div>
                                <div>
                                    {smallerMatches ? null : <span className={classes.title}>TRIP PLAN</span>}
                                </div>
                            </div>
                        </Link>
                    </div>

                    <div style={{"display" : "flex"}}>
                        <Autocomplete className={classes.textField}></Autocomplete>
                    <div className={classes.avatar}>
                        <Avatar alt="avatar" className={classes.avatar}></Avatar>
                    </div>

                </div>
                </div>
            </div >
        </>
    )
}

export default NavBar