import { useEffect, useState } from "react";
import Card from "../UI/Card";
import MealItem from "./MealItem/MealItem";
import classes from "./AvailableMeals.module.css";

const AvailableMeals = () => {
  const [meals, setMeals] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMeals = async () => {
      setIsLoading(true);

      const response = await fetch(
        "https://react-http-4ef0a-default-rtdb.firebaseio.com/Meals.json"
      );

      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const responseData = await response.json();
      const loadedMeals = [];

      for (const key in responseData) {
        loadedMeals.push({
          id: key,
          name: responseData[key].name,
          description: responseData[key].description,
          price: responseData[key].price,
        });
      }
      setMeals(loadedMeals);
      setIsLoading(false);
    };

    fetchMeals().catch((error)=>{
      setIsLoading(false);
      setError(error.message)
    })
  }, []);

  if (isLoading) {
    return (
      <section className={classes.MealsLoading}>
        <p>Is Loading</p>
      </section>
    );
  }

  if (error) {
    return (
      <section className={classes.MealsError}>
        <p>Error</p>
      </section>
    );
  }

  const mealsList = meals.map((meal) => (
    <MealItem
      key={meal.id}
      id={meal.id}
      name={meal.name}
      description={meal.description}
      price={meal.price}
    />
  ));

  // if (mealsList.length > 0) {
  //   content = <ul>{mealsList}</ul>;
  // }

  // if (error) {
  //   content = <p>{error}</p>;
  // }

  // if (isLoading) {
  //   content = <p>Loading...</p>;
  // }

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
