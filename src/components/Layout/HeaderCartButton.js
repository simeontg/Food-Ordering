import React, { useContext, useEffect, useState } from 'react'
import CartContext from '../../store/cartContext'
import CartIcon from '../Cart/CartIcon'
import styles from './HeaderCartButton.module.css'

const HeaderCartButton = ({openCart}) => {

  const [btnIsHighlighted, setBtnIsHighlighted] = useState(false)
  const cartCtx = useContext(CartContext)
  const amountOfItems = cartCtx.items?.reduce((curNumber, item) => {
    return curNumber + item.amount
  }, 0)

  const btnClasses = `${styles.button} ${btnIsHighlighted ? styles.bump : ''}`

  useEffect(() => {
    if(cartCtx.items.length === 0){
      return
    }
    setBtnIsHighlighted(true)

    const timer = setTimeout(() => {
      setBtnIsHighlighted(false)
    }, 300)

    return () => {
      clearTimeout(timer)
    }
  },[cartCtx.items])

  return (
    <button onClick={openCart} className={btnClasses}>
        <span className={styles.icon}>
            <CartIcon />
        </span>
        <span>
            Your Cart
        </span>
        <span className={styles.badge}>
            {amountOfItems}
        </span>
    </button>
  )
}

export default HeaderCartButton