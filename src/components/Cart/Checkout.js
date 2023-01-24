import { useRef, useState } from 'react'
import classes from './Checkout.module.css'

const Checkout = (props) => {

    const isEmpty = value => value.trim() === ''
    const isFiveChars = value => value.trim().length === 5

    const [formInputsValidity, setFormInputsValidity] = useState({
        name: true,
        street: true,
        postal: true,
        city: true,
        email: true,
        phone: true
    })

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

        const enteredNameIsValid = !isEmpty(enteredName)
        const enteredStreetIsValid = !isEmpty(enteredStreet)
        const enteredPostalIsValid = !isEmpty(enteredPostal)
        const enteredCityIsValid = !isEmpty(enteredCity)
        const enteredEmailIsValid = !isEmpty(enteredEmail)
        const enteredPhoneIsValid = !isEmpty(enteredPhone)

        setFormInputsValidity({
            name: enteredNameIsValid,
            street: enteredStreetIsValid,
            postal: enteredPostalIsValid,
            city: enteredCityIsValid,
            email: enteredEmailIsValid,
            phone: enteredPhoneIsValid
        })

        const formIsValid = enteredCityIsValid && enteredNameIsValid && enteredStreetIsValid && enteredPostalIsValid && enteredEmailIsValid && enteredPhoneIsValid

        if (!formIsValid) {
            return
        }

        props.onConfirm({
            name: enteredName,
            street: enteredStreet,
            postal: enteredPostal,
            city: enteredCity,
            email: enteredEmail,
            phone: enteredPhone
        })
    }

    const nameControlClasses = `${classes.control} ${
        formInputsValidity.name ? '' : classes.invalid
    }`
    const streetControlClasses = `${classes.control} ${
        formInputsValidity.street ? '' : classes.invalid
    }`
    const postalControlClasses = `${classes.control} ${
        formInputsValidity.postal ? '' : classes.invalid
    }`
    const cityControlClasses = `${classes.control} ${
        formInputsValidity.city ? '' : classes.invalid
    }`
    const emailControlClasses = `${classes.control} ${
        formInputsValidity.email ? '' : classes.invalid
    }`
    const phoneControlClasses = `${classes.control} ${
        formInputsValidity.phone ? '' : classes.invalid
    }`

    return (
        <form className={classes.form} onSubmit={confirmHandler}>
            <div className={nameControlClasses} >
                <label htmlFor="name">Your Name</label>
                <input type='text' id='name' ref={nameInputRef}/>
                {!formInputsValidity.name && <p>Please enter a valid value!</p>}
            </div>
            <div className={streetControlClasses} >
                <label htmlFor="street">Street</label>
                <input type='text' id='street' ref={streetInputRef}/>
                {!formInputsValidity.street && <p>Please enter a valid value!</p>}
            </div>
            <div className={postalControlClasses} >
                <label htmlFor="postal">Postal Code</label>
                <input type='text' id='postal' ref={postalInputRef}/>
                {!formInputsValidity.postal && <p>Please enter a valid value!</p>}
            </div>
            <div className={cityControlClasses} >
                <label htmlFor="city">City</label>
                <input type='text' id='city' ref={cityInputRef}/>
                {!formInputsValidity.city && <p>Please enter a valid value!</p>}
            </div>
            <div className={emailControlClasses} >
                <label htmlFor="email">Email</label>
                <input type='email' id='email' ref={emailInputRef}/>
                {!formInputsValidity.email && <p>Please enter a valid value!</p>}
            </div>
            <div className={phoneControlClasses} >
                <label htmlFor="phone">Phone</label>
                <input type='text' id='phone' ref={phoneInputRef}/>
                {!formInputsValidity.phone && <p>Please enter a valid value!</p>}
            </div>
            <div className={classes.actions} >
                <button type='button' onClick={props.onCancel} >Cancel</button>
                <button className={classes.submit} >Confirm</button>
            </div>
        </form>
    )
}

export default Checkout