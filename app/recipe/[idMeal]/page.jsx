"use client";

import React, { useEffect, useState } from "react";
import axios from "axios";

const RecipeDetails = ({ params }) => {
  const id = params.idMeal;

  const [mealDetails, setMealDetails] = useState([]);

  useEffect(() => {
    getMealDetails();
  }, []);

  const getMealDetails = async () => {
    const mealData = await axios.get(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
    );
    if (mealData && mealData.data) {
      setMealDetails(mealData.data.meals);
    } else {
      return (
        <h1 className="font-semibold text-2xl">
          Sorry, we couldn't find results for your search.
        </h1>
      );
    }
  };

  const ingredientIndexes = (meal) => {
    if (!meal) return [];

    let indexes = [];

    for (let i = 1; i <= 20; i++) {
      if (meal["strIngredient" + i]) {
        indexes.push(i);
      }
    }

    return indexes;
  };

  return (
    <div className="py-8 md:px-20 px-8">
      {mealDetails.map((meal) => (
        <div
          key={meal.idMeal}
          className="flex flex-col items-center justify-center space-y-2"
        >
          <img
            src={meal.strMealThumb}
            alt=""
            className="w-full md:h-[480px] h-[300px] rounded-lg"
          />

          <div className="flex flex-col gap-4">
            <div className="flex gap-10 items-start">
              <h1 className="font-semibold text-black/80 text-2xl md:text-3xl">
                {meal.strMeal}
              </h1>
            </div>
            <div>
              <h1 className="font-semibold text-black/80 text-xl md:text-2xl">
                Ingredients:
              </h1>
              {ingredientIndexes(meal).map((i) => {
                return (
                  <div key={i} className="flex flex-row space-x-4 items-center">
                    <div className="h-2 w-2 rounded-full bg-amber-600" />
                    <div className="flex flex-row space-x-2">
                      <h1 className="font-bold text-neutral-700 text-lg">
                        {meal["strMeasure" + i]}
                      </h1>
                      <h1 className="font-medium text-neutral-600 text-lg">
                        {meal["strIngredient" + i]}
                      </h1>
                    </div>
                  </div>
                );
              })}
            </div>
            <div>
              <h1 className="font-semibold text-black/80 text-xl md:text-2xl">
                Instructions:
              </h1>
              <p className="text-gray-700">{meal.strInstructions}</p>
            </div>

            <div>
              <a href={meal.strYoutube} className="text-blue-800">
                Watch it on YouTube
              </a>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default RecipeDetails;
