import React, { useEffect, useState } from 'react'
import Card from '../UI/Card';
import styles from './AvaiableMeals.module.css'
import MealItem from './MealItem/MealItem';


const AvailableMeals = () => {

  const [meals,setMeals] = useState([])

   useEffect(() => {
    const fetchData = async () => {
     const response = await fetch('https://foodordering-3dff2-default-rtdb.europe-west1.firebasedatabase.app/meals.json')
     const meals = await response.json()

     const mealsArray = []
     for(let key in meals) {
      mealsArray.push({
        id: key,
        // name: meals[key].name,
        // description: meals[key].description,
        // price: meals[key].price
        ...meals[key]
      })
     }

     setMeals(mealsArray)
    }

    fetchData()
   },[])

    const mealsList = meals.map(meal => <MealItem key={meal.id} id={meal.id} price={meal.price} name={meal.name} description={meal.description}/>)

  return (
    <section className={styles.meals}>
        <Card>
        <ul>
            {mealsList}
        </ul>
        </Card>
    </section>
  )
}

export default AvailableMeals