import axios from "axios";

export const getMeals = async () => {
  const meals = await axios.get(
    `https://www.themealdb.com/api/json/v1/1/filter.php?i=egg`
  );
  if (meals && meals.data) {
    console.log(meals.data.meals);
  }
};
