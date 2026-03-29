import { Component, Input, OnInit } from '@angular/core';
import { IonIcon, IonButton } from '@ionic/angular/standalone';

@Component({
  selector: 'app-error-banner',
  templateUrl: './error-banner.component.html',
  styleUrls: ['./error-banner.component.scss'],
  imports: [IonIcon, IonButton],
})
export class ErrorBannerComponent implements OnInit {
  @Input() errorMessage: string | null =
    'An unexpected error occurred. Please try again later.';

  @Input() retry: Function = () => {};

  constructor() {}

  ngOnInit() {}
}
