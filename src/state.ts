import { create } from "zustand";
import { Ballot, Items } from "./app/page";

interface Movie {
  movies: {
    movie: Items;
    category: string;
  }[];
  count: number;
  addMovie: (details: Items, category: string) => void;
  removeMovie: (id: string, category: string) => void; // Fixed function name
  removeAllMovies: () => void;
}

export const useMovieSelectionStore = create<Movie>((set) => ({
  count: 0,
  movies: [],
  addMovie: (details: Items, category: string) =>
    set((state) => ({
      count: state.count + 1,
      movies: state.movies
        .filter((movie) => movie.category !== category)
        .concat({ movie: details, category }),
    })),
  removeMovie: (id: string, category: string) =>
    set((state) => ({
      count: state.count - 1,
      movies: state.movies.filter((movie) => {
        return movie.movie.id !== id || movie.category !== category;
      }),
    })),
  removeAllMovies: () =>
    set(() => ({
      count: 0,
      movies: [],
    })),
}));
