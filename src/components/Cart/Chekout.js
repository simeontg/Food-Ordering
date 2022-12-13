import { useRef, useState } from 'react';
import styles from './Chekout.module.css';

const isValid = (value) => value.trim() !== '';
const isPostalCodeValid = (value) => value.trim().length === 5;



const Checkout = ({submitOrderHandler, onCloseCart}) => {
    const [formInputsValidity, setFormInputsValidity] = useState({
        name: true,
        street: true,
        city: true,
        postalCode: true
    })

    const nameInputRef = useRef()
    const streetInputRef = useRef()
    const postalCodeInputRef = useRef()
    const cityInputRef = useRef()

    const confirmHandler = (e) => {
        e.preventDefault()

        const enteredName = nameInputRef.current.value
        const enteredStreet = streetInputRef.current.value
        const enteredPostalCode = postalCodeInputRef.current.value
        const enteredCity = cityInputRef.current.value 

        const enteredNameIsValid = isValid(enteredName)
        const enteredStreetIsValid = isValid(enteredStreet)
        const enteredPostalCodeIsValid = isPostalCodeValid(enteredPostalCode)
        const enteredCityIsValid = isValid(enteredCity)

        setFormInputsValidity({
            name: enteredNameIsValid,
            street: enteredStreetIsValid,
            postalCode: enteredPostalCodeIsValid,
            city: enteredCityIsValid,
        })

        const formIsValid = enteredNameIsValid && enteredStreetIsValid && enteredPostalCodeIsValid && enteredCityIsValid

        if(!formIsValid){
            return;
        }

        submitOrderHandler({
            name: enteredName,
            street: enteredStreet,
            city: enteredCity,
            postalCode: enteredPostalCode
        })
    }


  return (
    <form className={styles.form} onSubmit={confirmHandler}>
      <div className={`${styles.control} ${formInputsValidity.name ? '' : styles.invalid}`}>
        <label htmlFor='name'>Your Name</label>
        <input ref={nameInputRef} type='text' id='name' />
        {!formInputsValidity.name && <p>Please enter a valid name!</p>}
      </div>
      <div className={`${styles.control} ${formInputsValidity.street ? '' : styles.invalid}`}>
        <label htmlFor='street'>Street</label>
        <input ref={streetInputRef} type='text' id='street' />
        {!formInputsValidity.street && <p>Please enter a valid street!</p>}
      </div>
      <div className={`${styles.control} ${formInputsValidity.postalCode ? '' : styles.invalid}`}>
        <label htmlFor='postal'>Postal Code</label>
        <input ref={postalCodeInputRef} type='text' id='postal' />
        {!formInputsValidity.postalCode && <p>Please enter a valid postal code!</p>}
      </div>
      <div className={`${styles.control} ${formInputsValidity.city ? '' : styles.invalid}`}>
        <label htmlFor='city'>City</label>
        <input ref={cityInputRef} type='text' id='city' />
        {!formInputsValidity.city && <p>Please enter a valid city!</p>}
      </div>
      <div className={styles.actions}>
        <button type='button' onClick={onCloseCart}>
          Cancel
        </button>
        <button className={styles.submit}>Confirm</button>
      </div>
    </form>
  );
};

export default Checkout;