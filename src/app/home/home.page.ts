import { Component, inject, signal } from '@angular/core';
import {
  type InfiniteScrollCustomEvent,
  IonContent,
} from '@ionic/angular/standalone';
import { MainHeaderComponent } from '../components/main-header/main-header.component';
import { LoadingSkeletonComponent } from '../components/loading-skeleton/loading-skeleton.component';
import { ErrorBannerComponent } from '../components/error-banner/error-banner.component';
import { Movies } from '../services/movies';
import type { IMovieDetails } from '../services/interfaces';
import { catchError, finalize } from 'rxjs';
import { MovieListComponent } from '../components/movie-list/movie-list.component';
import { PaginationComponent } from '../components/pagination/pagination.component';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [
    IonContent,
    MainHeaderComponent,
    LoadingSkeletonComponent,
    ErrorBannerComponent,
    MovieListComponent,
    PaginationComponent,
  ],
})
export class HomePage {
  private movieService = inject(Movies);
  public currentPage = signal(1);
  public totalPages = signal(0);
  public error = signal<string | null>(null);
  public isLoading = signal(false);
  public movies = signal<IMovieDetails[]>([]);
  public imageBaseUrl = 'https://image.tmdb.org/t/p';

  constructor() {
    this.loadMovies();
    this.loadMoreMovies();
  }

  loadMovies() {
    this.isLoading.set(true);
    this.movieService
      .getTopRatedMovies(this.currentPage())
      .pipe(
        finalize(() => this.isLoading.set(false)),
        catchError((err) => {
          this.error.set(
            `Failed to load movies. Please try again. Error: ${err.message}`,
          );
          this.movies.set([]);
          return [];
        }),
      )
      .subscribe((response) => {
        this.error.set(null);
        this.totalPages.set(response.total_pages);
        this.movies.set(
          response.results.map((movie) => ({
            ...movie,
            poster_path: `${this.imageBaseUrl}/w500${movie.poster_path}`,
          })),
        );
      });
  }

  loadMovieDetails(movieId: number) {
    this.isLoading.set(true);
    this.movieService.getMovieDetails(movieId).subscribe((details) => {
      this.isLoading.set(false);
    });
  }

  loadMoreMovies(event?: InfiniteScrollCustomEvent) {
    this.isLoading.set(true);

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
      .subscribe((response) => {
        this.totalPages.set(response.total_pages);
        this.movies.set(
          response.results.map((movie) => ({
            ...movie,
            poster_path: `${this.imageBaseUrl}/w500${movie.poster_path}`,
          })),
        );
        if (event) {
          event.target.disabled = response.total_pages === this.currentPage();
        }
      });
  }

  nextPage() {
    if (this.hasMorePages()) {
      this.currentPage.set(this.currentPage() + 1);
      this.loadMovies();
    }
  }

  previousPage() {
    if (this.currentPage() > 1) {
      this.currentPage.set(this.currentPage() - 1);
      this.loadMovies();
    }
  }

  hasMorePages() {
    return this.currentPage() < this.totalPages();
  }

  onPageChange(newPage: number) {
    this.currentPage.set(newPage);
    this.loadMovies();
  }
}
