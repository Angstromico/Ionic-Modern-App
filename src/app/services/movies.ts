import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment';

const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = environment.apiKey;

@Injectable({
  providedIn: 'root',
})
export class Movies {
  private http = inject(HttpClient);

  constructor() {}

  getTopRatedMovies(page = 1) {
    return this.http.get(
      `${BASE_URL}/movie/popular?page=${page}&api_key=${API_KEY}`,
    );
  }

  getMovieDetails(movieId: number) {
    return this.http.get(`${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`);
  }
}
