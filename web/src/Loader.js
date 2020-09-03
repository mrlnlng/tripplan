import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Spinner from "react-spinkit"



const SkeletonStyles = makeStyles(theme => ({
  
    colored : {
        color : theme.palette.primary.main,
        transform: "translate(0%,20vh)"
    }
}))

function Loader() {
    const classes = SkeletonStyles()
   
    return (
        <>
            <Spinner name="ball-spin-fade-loader" className={classes.colored} fadeIn='none' />
            
             

        </>
    )
}

export default Loader