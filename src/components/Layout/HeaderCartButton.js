import React, { useContext } from 'react'
import CartContext from '../../store/cartContext'
import CartIcon from '../Cart/CartIcon'
import styles from './HeaderCartButton.module.css'

const HeaderCartButton = ({openCart}) => {

  const cartCtx = useContext(CartContext)
  console.log(cartCtx)

  const amountOfItems = cartCtx.items?.reduce((curNumber, item) => {
    return curNumber + item.amount
  }, 0)

  return (
    <button onClick={openCart} className={styles.button}>
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