import { Component, Input, Output, EventEmitter } from '@angular/core';
import {
  IonList,
  IonItem,
  IonBadge,
  IonLabel,
  IonIcon,
} from '@ionic/angular/standalone';
import type { IMovieDetails } from '../../services/interfaces';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss'],
  imports: [IonList, IonItem, IonBadge, IonLabel, IonIcon],
  standalone: true,
})
export class MovieListComponent {
  @Input() movies: IMovieDetails[] = [];
  @Output() movieClick = new EventEmitter<IMovieDetails>();

  constructor() {}

  onMovieClick(movie: IMovieDetails) {
    this.movieClick.emit(movie);
  }
}
