import { Component, inject, signal } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  type InfiniteScrollCustomEvent,
} from '@ionic/angular/standalone';
import { Movies } from '../services/movies';
import type { IMovieDetails } from '../services/interfaces';
import { catchError, finalize } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent],
})
export class HomePage {
  private movieService = inject(Movies);
  private currentPage = signal(1);
  private error = signal<string | null>(null);
  private isLoading = signal(false);
  private movies = signal<IMovieDetails[]>([]);
  public imageBaseUrl = 'https://image.tmdb.org/t/p';

  constructor() {
    this.loadMovies();
    this.loadMovieDetails(550); // Example movie ID for "Fight Club"
    this.loadMoreMovies();
  }

  loadMovies() {
    this.movieService
      .getTopRatedMovies(this.currentPage())
      .subscribe((movies) => {
        console.log(movies);
        this.error.set(null);
        this.movies.set(
          movies.results.map((movie) => ({
            ...movie,
            poster_path: `${this.imageBaseUrl}/w500${movie.poster_path}`,
          })),
        );
      });
  }

  loadMovieDetails(movieId: number) {
    this.movieService.getMovieDetails(movieId).subscribe((details) => {
      console.log(details);
    });
  }

  loadMoreMovies(event?: InfiniteScrollCustomEvent) {
    if (!event) {
      this.isLoading.set(true);
    }

    this.movieService
      .getTopRatedMovies(this.currentPage())
      .pipe(
        finalize(() => {
          if (event) {
            event.target.complete();
            event.target.disabled = false;
          }
          this.isLoading.set(false);
        }),
        catchError((err) => {
          this.error.set(
            `Failed to load movies. Please try again. Error: ${err.message}`,
          );
          this.movies.set([]);
          return [];
        }),
      )
      .subscribe((movies) => {
        console.log(movies);
        next: (res: any) => {
          console.log(res);
          this.movies.set(
            movies.results.map((movie) => ({
              ...movie,
              poster_path: `${this.imageBaseUrl}/w500${movie.poster_path}`,
            })),
          );
          if (event) {
            event.target.disabled = res.total_pages === this.currentPage();
          }
        };
      });
  }
}
