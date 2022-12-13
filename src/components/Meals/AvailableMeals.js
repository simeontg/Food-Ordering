import React, { useEffect, useState } from 'react'
import Card from '../UI/Card';
import styles from './AvaiableMeals.module.css'
import MealItem from './MealItem/MealItem';


const AvailableMeals = () => {

  const [meals,setMeals] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [httpError, setHttpError] = useState()

   useEffect(() => {
    const fetchData = async () => {
    
     const response = await fetch('https://foodordering-3dff2-default-rtdb.europe-west1.firebasedatabase.app/meals.json')
     if(!response.ok){
      throw new Error('Something went wrong!')
     }
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

     setIsLoading(false)
     setMeals(mealsArray)
    }

    
      fetchData().catch(err => {
        setHttpError(err.message)
        setIsLoading(false)
      })
   },[])

   if(isLoading){
    return <section className={styles.mealsLoading}>
      <p>Loading...</p>
    </section>
   }

   if(httpError){
    return <section className={styles.mealsError}>
      <p>{httpError}</p>
    </section>
   }

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