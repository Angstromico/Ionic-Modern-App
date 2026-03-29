import { Component, OnInit } from '@angular/core';
import {
  IonList,
  IonItem,
  IonAvatar,
  IonSkeletonText,
  IonLabel,
} from '@ionic/angular/standalone';

@Component({
  selector: 'app-loading-skeleton',
  templateUrl: './loading-skeleton.component.html',
  styleUrls: ['./loading-skeleton.component.scss'],
  imports: [IonList, IonItem, IonAvatar, IonSkeletonText, IonLabel],
})
export class LoadingSkeletonComponent implements OnInit {
  public dummyArray = Array(5);

  constructor() {}

  ngOnInit() {}
}
