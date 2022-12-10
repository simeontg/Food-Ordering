import React from 'react'
import Input from '../../UI/Input'
import styles from './MealItemForm.module.css'

const MealItemForm = (props) => {
  return (
    <form className={styles.form}>
        <Input label='Amount' input={{type: 'number', id: 'amount_'+props.id, min: '1', max: '5', step: '1', default: '1'}}/>
        <button>+ Add</button>
    </form>
  )
}

export default MealItemForm