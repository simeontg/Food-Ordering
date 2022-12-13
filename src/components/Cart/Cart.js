import React, { useContext, useState } from 'react'
import CartContext from '../../store/cartContext'
import Modal from '../UI/Modal'
import styles from './Cart.module.css'
import CartItem from './CartItem'
import Chekout from './Chekout'

const Cart = ({onCloseCart}) => {
    const [showOrderForm, setShowOrderForm] = useState(false)
    const [isSubmitting, setIsSubmitting] = useState(false)
    const [didSubmit, setDidSubmit] = useState(false)
    let cartCtx = useContext(CartContext)

    const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`

    const cartItemRemoveHandler = id => {
      cartCtx.removeItem(id)
    }

    const cartItemAddHandler = item => {
      cartCtx.addItem({...item, amount: 1})
    }

    const showOrder = () => {
      setShowOrderForm(true)
    }

    const submitOrderHandler = async (userData) => {
      setIsSubmitting(true)
      await fetch('https://foodordering-3dff2-default-rtdb.europe-west1.firebasedatabase.app/orders.json', {
        method: 'POST',
        body: JSON.stringify({
          user: userData,
          orderedItems: cartCtx.items
        })
      })

      setIsSubmitting(false)
      setDidSubmit(true)
      cartCtx.clearCart()
    }

    const modalActions = <div className={styles.actions}>
    <button className={styles['button--alt']} onClick={onCloseCart}>Close</button>
    {cartCtx.items.length > 0 &&  <button className={styles.button} onClick={showOrder}>Order</button>}</div>

    const cartModalContent = <>   
    <ul className={styles['cart-items']}>
    {cartCtx.items.length === 0 ? <p>Cart is empty.</p>: cartCtx.items.map((item) => (
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
  {showOrderForm && <Chekout submitOrderHandler={submitOrderHandler} onCloseCart={onCloseCart}/> }
  {!showOrderForm && modalActions}
    </>

  
  const isSubmittingModalContent = <p>Sending order data...</p>

  const didSubmitModalContent =<>
  <p>Order submitted succesfully!</p>
  <div className={styles.actions}>
    <button className={styles.button} onClick={onCloseCart}>Close</button>
  </div>
  </> 

  return (
    <Modal onCloseCart={onCloseCart}>
     {isSubmitting && isSubmittingModalContent}
     {!isSubmitting && !didSubmit && cartModalContent}
     {didSubmit && didSubmitModalContent}
    </Modal>
  )
}

export default Cart