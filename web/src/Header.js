import React from 'react'
import { makeStyles } from '@material-ui/core/styles';
import {Link} from 'react-router-dom';
import headerImage from "./header.png"

const useStyles = makeStyles({
    header : {
        width : '100%',  
        fontWeight: 'SemiBold',

    },
    div : {
        backgroundColor: '#83CFC8',
        minHeight: '.5rem',
        transform : "translate(-110%,-280%)",
        minWidth: '4rem'
    }

    
})

function Header() {
    const classes = useStyles()

    return(
        <>
        <div><img src={headerImage} alt="airplane logo" height="80"></img></div>
        <Link to="/" exact="true" style={{ textDecoration: "none", color: "black"}}>
        <h1 className={classes.header}> TRIP PLAN</h1>
        </Link>
        <div className={classes.div}> </div>
        </>
    )
}

export default Header 
 