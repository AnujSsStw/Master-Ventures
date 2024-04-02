"use client";
import { Items } from "@/app/page";
import { useMovieSelectionStore } from "@/state";
import { useState } from "react";

export function Ballot({ item, category }: { item: Items; category: string }) {
  const addMovie = useMovieSelectionStore((state) => state.addMovie);
  const removeMovie = useMovieSelectionStore((state) => state.removeMovie);
  const selected = useMovieSelectionStore((state) => state.movies);

  return (
    <div
      onClick={() => {
        if (selected.some((movie) => movie.movie.id === item.id)) {
          removeMovie(item.id, category);
          return;
        }
        addMovie(item, category);
      }}
      key={item.id}
      className={`relative group ${
        selected.some((movie) => movie.movie.id === item.id)
          ? "bg-green-500 bg-opacity-50 border-4 rounded border-transparent border-green-500"
          : ""
      } cursor-pointer`}
    >
      <div className="w-full aspect-w-16 aspect-h-9 md:aspect-w-4 md:aspect-h-3">
        <img
          className="w-full h-full md:h-2/5 object-cover transition duration-300 ease-in-out group-hover:opacity-20"
          src={item.photoUrL}
          alt={item.title}
        />
      </div>
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition duration-300 ease-in-out">
        <span className="text-black text-xl  md:text-4xl font-bold text-shadow-lg text-center px-2">
          {item.title}
        </span>
      </div>
      <div className="lg:hidden text-center font-bold text-3xl p-2">
        {item.title}
      </div>
    </div>
  );
}
