import { Component, Input, inject } from '@angular/core';
import { ModalController, IonButton, IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonIcon } from '@ionic/angular/standalone';
import type { IMovieDetails } from '../../services/interfaces';

@Component({
  selector: 'app-movie-modal',
  templateUrl: './movie-modal.component.html',
  styleUrls: ['./movie-modal.component.scss'],
  imports: [IonHeader, IonToolbar, IonTitle, IonContent, IonButtons, IonButton, IonIcon],
  standalone: true,
})
export class MovieModalComponent {
  @Input() movie: IMovieDetails | null = null;
  private modalController = inject(ModalController);

  constructor() {}

  dismiss() {
    this.modalController.dismiss();
  }

  goToMovieDetails() {
    if (this.movie) {
      this.modalController.dismiss({
        action: 'navigate',
        movieId: this.movie.id
      });
    }
  }

  formatDate(dateString: string): string {
    if (!dateString) return 'Unknown';
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  }

  formatRuntime(minutes: number): string {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    return `${hours}h ${mins}min`;
  }
}
