"use client";

import React, { useState } from "react";

import axios from "axios";

import { Search } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const Home = () => {
  const [fetchedMeals, setFetchedMeals] = useState([]);
  const [ingredient, setIngredient] = useState("");

  // useEffect(() => {
  //   getMeals();
  // }, []);

  const getMeals = async () => {
    try {
      const meals = await axios.get(
        `https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredient}`
      );
      if (meals && meals.data) {
        setFetchedMeals(meals.data.meals);
      }
    } catch (error) {
      console.log("Error: ", error.message);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="mt-10 h-full flex flex-col items-center justify-center">
        <h1 className="font-bold text-3xl md:text-4xl text-amber-600">
          Pro Chef
        </h1>
        <h3 className="font-semibold text-md md:text-lg text-gray-700">
          Make your own food, all at home!
        </h3>

        <div className="mt-20 flex gap-2 bg-gray-200 p-6 rounded-md items-center justify-center">
          <input
            type="text"
            name="search-meals"
            placeholder="What is your main ingredient?"
            value={ingredient}
            onChange={(e) => setIngredient(e.target.value)}
            className="w-full border border-amber-600 px-4 py-2 rounded-md text-xl text-neutral-600"
          />
          <button type="button" onClick={getMeals}>
            <Search size={34} className="text-amber-600" />
          </button>
        </div>
      </div>

      <div className="mt-10">
        <h1 className="font-semibold text-2xl text-gray-700">
          Search results for: <span>{ingredient}</span>
        </h1>
      </div>

      {fetchedMeals ? (
        fetchedMeals.map((meal) => (
          <div key={meal.idMeal}>
            <div className="grid md:grid-cols-3 grid-cols-none gap-4">
              <div className="flex flex-col space-y-2 items-center justify-center rounded-lg shadow-md w-full p-2">
                <img
                  src={meal.strMealThumb}
                  alt="meal thumbnail"
                  // height={200}
                  // width={200}
                  className="rounded"
                />
                <h2>
                  {meal.strMeal.length > 20
                    ? meal.strMeal.slice(0, 20) + "..."
                    : meal.strMeal}
                </h2>

                <Link
                  href={`/recipe/${meal.idMeal}`}
                  className="btn bg-amber-600 text-white p-2 rounded-lg"
                >
                  View Recipe
                </Link>
              </div>
            </div>
          </div>
        ))
      ) : (
        <div className="mt-10">
          <h1 className="font-semibold text-xl text-neutral-600">
            Sorry, we couldn&#39;t find results for your search.
          </h1>
        </div>
      )}

      {/* {fetchedMeals.map((meal) => (
        <div key={meal.idMeal}>
          <div className="grid grid-cols-3 gap-4 mt-6">
            <div className="flex flex-col space-y-2 items-center justify-center rounded-lg shadow-md w-full p-2">
              <img
                src={meal.strMealThumb}
                alt="meal thumbnail"
                height={200}
                width={200}
                className="rounded"
              />
              <h2>
                {meal.strMeal.length > 20
                  ? meal.strMeal.slice(0, 20) + "..."
                  : meal.strMeal}
              </h2>

              <Link
                href={`/recipe/${meal.idMeal}`}
                className="btn bg-amber-600 text-white p-2 rounded-lg"
              >
                View Recipe
              </Link>
            </div>
          </div>
        </div>
      ))} */}
    </div>
  );
};

export default Home;
