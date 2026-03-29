import { Component, Input, OnInit } from '@angular/core';
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
})
export class MovieListComponent implements OnInit {
  @Input() movies: IMovieDetails[] = [];

  constructor() {}

  ngOnInit() {}
}
