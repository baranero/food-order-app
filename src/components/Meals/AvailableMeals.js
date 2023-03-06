import React, { useEffect, useState } from "react";
import Card from "../UI/Card"
import classes from './AvailableMeals.module.css'
import MealItem from "./MealItem/MealItem";

const AvailableMeals = (props) => {

  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState()

  useEffect(() => {
    const getMeals = async () => {
      const res = await fetch('https://react-http-bc64c-default-rtdb.europe-west1.firebasedatabase.app/availableMeals.json')

      if (!res.ok) {
        throw new Error('Something went wrong!')
      }

      const resData = await res.json()
      const loadedMeals = []

      for (const key in resData) {
        loadedMeals.push({
          id: key,
          name: resData[key].name,
          description: resData[key].description,
          price: resData[key].price
        })
      }
      setMeals(loadedMeals)
      setIsLoading(false)
    }

      getMeals().catch((err) =>{
        setIsLoading(false)
        setIsError(err.message)}
  )
    
    }, [])

    if (isLoading) {
      return (
        <section className={classes.MealsLoading}>
          <p>Loading...</p>
        </section>
      )
    }

    if (isError) {
      return (
        <section className={classes.MealsError}>
          <p>{isError}</p>
        </section>
      )
    }

  const mealsList = meals.map(meal =>
    <MealItem
      id={meal.id}
      key={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />)

  return (
    <section className={classes.meals}>
      <Card>
        <ul>
          {mealsList}
        </ul>
      </Card>
    </section>
  )
}

export default AvailableMeals