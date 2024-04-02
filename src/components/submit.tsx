"use client";

import { useMovieSelectionStore } from "@/state";
import { useState } from "react";

export function Submit() {
  const [modalOpen, setModalOpen] = useState(false);
  const selected = useMovieSelectionStore((state) => state.movies);
  const done = useMovieSelectionStore((state) => state.removeAllMovies);

  function handleSubmit() {
    console.log(selected);
    setModalOpen(false);
    // some api req to send selected movies to server
    done();
  }

  if (modalOpen) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg">
          <h2 className="text-2xl font-bold mb-4">Your Selection</h2>
          <ul className="h-28 overflow-auto">
            {selected.map((movie) => (
              <li key={movie.movie.id} className="flex items-center space-x-4">
                <p>{movie.movie.title}</p>
              </li>
            ))}
          </ul>
          <div className="flex flex-col">
            <button
              className="bg-green-500 p-4 rounded-lg mt-4 "
              onClick={handleSubmit}
            >
              Done
            </button>
            <button
              className="bg-green-500 p-4 rounded-lg mt-4 "
              onClick={() => {
                setModalOpen(false);
              }}
            >
              Select Another
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <button
      className="fixed right-10 bottom-6 bg-green-500 p-4 rounded-lg"
      onClick={() => {
        if (selected.length > 0) {
          setModalOpen(true);
        } else {
          alert("Please select a movie");
        }
      }}
    >
      Submit
    </button>
  );
}
