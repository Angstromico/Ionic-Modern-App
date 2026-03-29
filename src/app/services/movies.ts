import { HttpClient } from '@angular/common/http';
import { Injectable, inject } from '@angular/core';
import { environment } from '../../environments/environment';
import type { IMovie, IMovieDetails } from './interfaces';
import { Observable } from 'rxjs';

const BASE_URL = 'https://api.themoviedb.org/3';
const API_KEY = environment.apiKey;

@Injectable({
  providedIn: 'root',
})
export class Movies {
  private http = inject(HttpClient);

  constructor() {}

  getTopRatedMovies(page = 1): Observable<IMovie> {
    return this.http.get<IMovie>(
      `${BASE_URL}/movie/popular?page=${page}&api_key=${API_KEY}`,
    );
  }

  getMovieDetails(movieId: number): Observable<IMovieDetails> {
    return this.http.get<IMovieDetails>(
      `${BASE_URL}/movie/${movieId}?api_key=${API_KEY}`,
    );
  }
}
