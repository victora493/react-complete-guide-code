import React, {useRef, useState} from 'react';
import classes from './Checkout.module.css';

const isEmpty = value => value.trim() === ''
const isFiveChars = value => value.length === 5

const Checkout = (props) => {
    const [formErrors, setFormErrors] = useState({
        name: true,
        street: true,
        city: true,
        postalCode: true,
    })
    const nameInputRef = useRef()
    const streetInputRef = useRef()
    const postalInputRef = useRef()
    const cityInputRef = useRef()

  const confirmHandler = (event) => {
    event.preventDefault();

    const enteredName = nameInputRef.current.value;
    const enteredStreet = streetInputRef.current.value;
    const enteredPostal = postalInputRef.current.value;
    const enteredCity = cityInputRef.current.value;

    const enteredNameIsValid = !isEmpty(enteredName)
    const enteredStreetIsValid = !isEmpty(enteredStreet)
    const enteredCityIsValid = !isEmpty(enteredCity)
    const enteredPostalIsValid = isFiveChars(enteredPostal)

    setFormErrors({
        name: enteredNameIsValid,
        street: enteredStreetIsValid,
        city: enteredCityIsValid,
        postalCode: enteredPostalIsValid,
    })

    const fromIsValid = enteredNameIsValid && enteredStreetIsValid && enteredCityIsValid && enteredPostalIsValid

    if(!fromIsValid) return
    
    props.onConfirm({
        name: enteredName,
        city: enteredCity,
        street: enteredStreet,
        postal: enteredPostal,
    })
  };

  return (
    <form className={classes.form} onSubmit={confirmHandler}>
      <div className={`${classes.control} ${!formErrors.name ? `${classes.invalid}` : ''}`}>
        <label htmlFor='name'>Your Name</label>
        <input ref={nameInputRef} type='text' id='name' />
        {!formErrors.name && <p>Please entered a valid name</p> }
      </div>
      <div className={classes.control}>
        <label htmlFor='street'>Street</label>
        <input ref={streetInputRef} type='text' id='street' />
      </div>
      <div className={classes.control}>
        <label htmlFor='postal'>Postal Code</label>
        <input ref={postalInputRef} type='text' id='postal' />
      </div>
      <div className={classes.control}>
        <label htmlFor='city'>City</label>
        <input ref={cityInputRef} type='text' id='city' />
      </div>
      <div className={classes.actions}>
        <button type='button' onClick={props.onCancel}>
          Cancel
        </button>
        <button className={classes.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;