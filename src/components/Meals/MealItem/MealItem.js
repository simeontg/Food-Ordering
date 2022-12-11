import React, { useContext } from 'react'
import CartContext from '../../../store/cartContext'
import styles from './MealItem.module.css'
import MealItemForm from './MealItemForm'

const MealItem = (props) => {
    const price = `$${props.price.toFixed(2)}`
    const {addItem} = useContext(CartContext)

    const addToCartHandler = amount => {
      addItem({
        id: props.id,
        name: props.name,
        price: props.price,
        amount
      })
    }
  return (
    <li className={styles.meal}>
        <div>
            <h3>{props.name}</h3>
            <div className={styles.description}>{props.description}</div>
            <div className={styles.price}>{price}</div>
        </div>
        <div>
            <MealItemForm onAddToCart={addToCartHandler} id={props.id}/>
        </div>
    </li>
  )
}

export default MealItem