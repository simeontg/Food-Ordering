import React, { useContext } from 'react'
import CartContext from '../../store/cartContext'
import Modal from '../UI/Modal'
import styles from './Cart.module.css'
import CartItem from './CartItem'

const Cart = ({onCloseCart}) => {
    let cartCtx = useContext(CartContext)

    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`

    const cartItemRemoveHandler = id => {}

    const cartItemAddHandler = item => {}
  return (
    <Modal onCloseCart={onCloseCart}>
        <ul className={styles['cart-items']}>
          {cartCtx.items.map((item) => (
        <CartItem 
        key={item.id}
        price={item.price} 
        amount={item.amount} 
        name={item.name}
        onRemove={cartItemRemoveHandler.bind(null,item.id)}
        onAdd={cartItemAddHandler.bind(null, item)}
        />
        ))}
        </ul>
        <div className={styles.total}>
            <span>Total Amount</span>
            <span>{totalAmount}</span>
        </div>
        <div className={styles.actions}>
            <button className={styles['button--alt']} onClick={onCloseCart}>Close</button>
            {cartCtx.items.length > 0 && <button className={styles.button}>Order</button>}
        </div>
    </Modal>
  )
}

export default Cart