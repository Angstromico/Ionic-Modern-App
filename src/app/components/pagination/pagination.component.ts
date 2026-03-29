import { Component, EventEmitter, Input, Output } from '@angular/core';
import { IonButton, IonIcon } from '@ionic/angular/standalone';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
  imports: [IonButton, IonIcon],
  standalone: true,
})
export class PaginationComponent {
  @Input() currentPage: number = 1;
  @Input() totalPages: number = 0;
  @Input() isLoading: boolean = false;
  
  @Output() pageChange = new EventEmitter<number>();

  get hasPreviousPage(): boolean {
    return this.currentPage > 1;
  }

  get hasNextPage(): boolean {
    return this.currentPage < this.totalPages;
  }

  get hasMorePages(): boolean {
    return this.currentPage < this.totalPages;
  }

  nextPage(): void {
    if (this.hasNextPage && !this.isLoading) {
      this.pageChange.emit(this.currentPage + 1);
    }
  }

  previousPage(): void {
    if (this.hasPreviousPage && !this.isLoading) {
      this.pageChange.emit(this.currentPage - 1);
    }
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages && page !== this.currentPage && !this.isLoading) {
      this.pageChange.emit(page);
    }
  }
}
