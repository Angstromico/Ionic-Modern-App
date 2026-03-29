import { Component, inject } from '@angular/core';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
} from '@ionic/angular/standalone';
import { Movies } from '../services/movies';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent],
})
export class HomePage {
  private movieService = inject(Movies);

  constructor() {
    this.loadMovies();
    this.loadMovieDetails(550); // Example movie ID for "Fight Club"
  }

  loadMovies() {
    this.movieService.getTopRatedMovies().subscribe((movies) => {
      console.log(movies);
    });
  }

  loadMovieDetails(movieId: number) {
    this.movieService.getMovieDetails(movieId).subscribe((details) => {
      console.log(details);
    });
  }
}
