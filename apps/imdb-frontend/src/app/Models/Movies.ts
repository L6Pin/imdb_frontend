export interface Movie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  title: string;
  vote_average: number;
}

export interface movieEntity {
  id: string | number;
  movies: Movie;
}
