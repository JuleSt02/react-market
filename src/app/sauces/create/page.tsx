"use client";

import { useActionState } from "react";
import { createSauce } from "./action";
import { SauceState } from "../types/sauce-state";
import { heatLevelSchema } from "../validation/heat-level";
const initialState: SauceState = {};

export default function CreateSaucePage() {
  const [state, formAction, isPending] = useActionState(
    createSauce,
    initialState,
  );

  return (
    <form action={formAction} className="max-w-md mx-auto flex flex-col gap-4">
      <h1 className="text-xl font-bold">Create a Sauce</h1>

      {/* General/non-field error banner */}
      {state.error && (
        <p className="text-red-600 bg-red-50 p-2 rounded">{state.error}</p>
      )}

      <div>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          name="title"
          type="text"
          className="border p-1 w-full"
        />
        {state.errors?.title?.[0] && (
          <p className="text-red-600 text-sm">{state.errors.title[0]}</p>
        )}
      </div>

      <div>
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          className="border p-1 w-full"
        />
        {state.errors?.description?.[0] && (
          <p className="text-red-600 text-sm">{state.errors.description[0]}</p>
        )}
      </div>

      <div>
        <label htmlFor="price">Price</label>
        <input
          id="price"
          name="price"
          type="number"
          step="0.01"
          className="border p-1 w-full"
        />
        {state.errors?.price?.[0] && (
          <p className="text-red-600 text-sm">{state.errors.price[0]}</p>
        )}
      </div>

      <div>
        <label htmlFor="heatLevel">Heat Level</label>
        <select id="heatLevel" name="heatLevel" className="border p-1 w-full">
          {heatLevelSchema.options.map((level) => (
            <option key={level} value={level}>
              {level}
            </option>
          ))}
        </select>
        {state.errors?.heatLevel?.[0] && (
          <p className="text-red-600 text-sm">{state.errors.heatLevel[0]}</p>
        )}
      </div>

      <div>
        <label htmlFor="originCountry">Origin Country</label>
        <input
          id="originCountry"
          name="originCountry"
          type="text"
          className="border p-1 w-full"
        />
        {state.errors?.originCountry?.[0] && (
          <p className="text-red-600 text-sm">
            {state.errors.originCountry[0]}
          </p>
        )}
      </div>

      <div>
        <label htmlFor="image">Image URL (optional)</label>
        <input
          id="image"
          name="image"
          type="text"
          className="border p-1 w-full"
        />
        {state.errors?.image?.[0] && (
          <p className="text-red-600 text-sm">{state.errors.image[0]}</p>
        )}
      </div>

      <button
        type="submit"
        disabled={isPending}
        className="bg-black text-white p-2 rounded disabled:opacity-50"
      >
        {isPending ? "Creating..." : "Create Sauce"}
      </button>
    </form>
  );
}
