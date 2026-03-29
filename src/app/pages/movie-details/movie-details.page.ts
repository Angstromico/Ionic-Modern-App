import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import {
  IonHeader,
  IonToolbar,
  IonTitle,
  IonContent,
  IonBackButton,
  IonButtons,
  IonIcon,
  IonButton,
} from '@ionic/angular/standalone';
import { Movies } from '../../services/movies';
import type { IMovieDetails } from '../../services/interfaces';

@Component({
  selector: 'app-movie-details',
  templateUrl: './movie-details.page.html',
  styleUrls: ['./movie-details.page.scss'],
  imports: [
    IonButton,
    IonIcon,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonBackButton,
    IonButtons,
  ],
  standalone: true,
})
export class MovieDetailsPage implements OnInit {
  private route = inject(ActivatedRoute);
  private router = inject(Router);
  private movies = inject(Movies);

  public movie: IMovieDetails | null = null;
  public isLoading = false;
  public error: string | null = null;

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      const movieId = params.get('id');
      if (movieId) {
        this.loadMovieDetails(parseInt(movieId));
      } else {
        this.error = 'Movie ID not found';
      }
    });
  }

  loadMovieDetails(movieId: number) {
    this.isLoading = true;
    this.error = null;

    this.movies.getMovieDetails(movieId).subscribe({
      next: (movie) => {
        this.movie = movie;
        this.isLoading = false;
      },
      error: (err) => {
        this.error = `Failed to load movie details: ${err.message}`;
        this.isLoading = false;
      },
    });
  }

  goBack() {
    this.router.navigate(['/home']);
  }

  formatDate(dateString: string): string {
    if (!dateString) return 'Unknown';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  }

  formatRuntime(minutes: number): string {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}min`;
  }
}
