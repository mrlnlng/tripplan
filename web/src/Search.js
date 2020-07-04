import React, { useState } from 'react'
import { makeStyles } from "@material-ui/styles"
import { styled } from "@material-ui/styles"
import { Link } from "react-router-dom"

const useStyles = makeStyles({
    form: {
        display: 'flex',
        flexDirection: 'column'
    },
    input: {
        border:"0",
        height: '1.4rem',
        padding: '.4rem .8rem',
        borderRadius: '.2rem',
        backgroundColor: '#F4FAF9',
        '&::placeholder': {
            fontWeight: 'normal',
            fontFamily: 'Raleway'

        }
    },
    button: {
        backgroundColor: "#83CFC8",
        color: "#FFFFFF",
        borderRadius: ".2rem",
        borderColor: "#83CFC8"
    }
})
const MyButton = styled('button')({
    padding: '0.5em 3em',
    marginTop: '1rem',
    fontFamily: 'Raleway',
    fontWeight: 'Medium',
    backgroundColor: '#ffffff ',
    border: '1px solid #E1E1E1',
    borderRadius: '.2rem',
    width: '100%',
    outline: 'none',
    color: '000000'

})

function Search() {
    const [location, setLocation] = useState("")
    const [selectedButtons, setButtons] = useState({
        "hotel": false,
        "thingsToDo": false,
        "restaurants": false
    })

    const handleChange = (e) => {
        setLocation(e.target.value)
    }

    function createChangeHandler(buttonName){
        function buttonHandler() {
            setButtons(prevState => {
                let newSelectedButtons = JSON.parse(JSON.stringify(prevState))
                newSelectedButtons[buttonName] = !newSelectedButtons[buttonName]
                return newSelectedButtons
            })
            
        }
        return buttonHandler
    }
    
    const classes = useStyles()
    return (
        <div className="Search">
            <input
                type="text"
                placeholder="Where to?"
                value={location}
                name="location"
                className={classes.input}
                onChange={handleChange}>
            </input>

            <form className={classes.form}>
                <MyButton 
                    type="button"
                    name="hotel" 
                    onClick={createChangeHandler("hotel")}
                    style={{borderColor: selectedButtons["hotel"] ? "black" : "#E1E1E1"}}
                    >Hotels</MyButton>
                <MyButton 
                    type="button"
                    name="thingsToDo" 
                    onClick={createChangeHandler("thingsToDo")}
                    style={{borderColor: selectedButtons["thingsToDo"] ? "black" : "#E1E1E1"}}
                    >Things to do</MyButton>
                <MyButton 
                    type="button"
                    name="restaurants" 
                    onClick={() => createChangeHandler("restaurants")()}
                    style={{borderColor: selectedButtons["restaurants"] ? "black" : "#E1E1E1"}}
                    >Restaurants</MyButton>
            </form>
            <Link to={{
                pathname: "/results",
                state: {location: location, selectedButtons: selectedButtons}
                }}>
                    
            <MyButton style={{
                backgroundColor: "#83CFC8",
                color: "#FFFFFF",
                border: "0",
                borderRadius: ".2rem",
                height: '2.5rem'
            }}>Let's Go!</MyButton>
            </Link>

        </div>

    )
}

export default Search