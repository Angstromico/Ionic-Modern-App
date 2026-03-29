import { Component, OnInit } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle } from '@ionic/angular/standalone';

@Component({
  selector: 'app-main-header',
  templateUrl: './main-header.component.html',
  styleUrls: ['./main-header.component.scss'],
  imports: [IonHeader, IonToolbar, IonTitle],
})
export class MainHeaderComponent implements OnInit {
  constructor() {}

  ngOnInit() {}
}
