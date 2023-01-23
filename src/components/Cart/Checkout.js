import { useRef } from 'react'
import classes from './Checkout.module.css'

const Checkout = (props) => {

    const nameInputRef = useRef()
    const streetInputRef = useRef()
    const postalInputRef = useRef()
    const cityInputRef = useRef()
    const emailInputRef = useRef()
    const phoneInputRef = useRef()

    const confirmHandler = (event) => {
        event.preventDefault()

        const enteredName = nameInputRef.current.value
        const enteredStreet = streetInputRef.current.value
        const enteredPostal = postalInputRef.current.value
        const enteredCity = cityInputRef.current.value
        const enteredEmail = emailInputRef.current.value
        const enteredPhone = phoneInputRef.current.value
    }
    return (
        <form onSubmit={confirmHandler}>
            <div className={classes.control} >
                <label htmlFor="name">Your Name</label>
                <input type='text' id='name' ref={nameInputRef}/>
            </div>
            <div className={classes.control} >
                <label htmlFor="street">Street</label>
                <input type='text' id='street' ref={streetInputRef}/>
            </div>
            <div className={classes.control} >
                <label htmlFor="postalCode">Postal Code</label>
                <input type='text' id='postalCode' ref={postalInputRef}/>
            </div>
            <div className={classes.control} >
                <label htmlFor="city">City</label>
                <input type='text' id='city' ref={cityInputRef}/>
            </div>
            <div className={classes.control} >
                <label htmlFor="email">Email</label>
                <input type='email' id='email' ref={emailInputRef}/>
            </div>
            <div className={classes.control} >
                <label htmlFor="phone">Phone</label>
                <input type='text' id='phone' ref={phoneInputRef}/>
            </div>
            <div className={classes.actions} >
                <button type='button' onClick={props.onCancel} >Cancel</button>
                <button className={classes.submit} >Confirm</button>
            </div>
        </form>
    )
}

export default Checkout