import { Component, OnInit } from '@angular/core';
import { TourService } from '../../services/tour.service';
import { Tour } from '../../models/tour.model';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-tours',
  templateUrl: './tours.component.html',
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  styleUrls: ['./tours.component.css'],
  standalone: true
})
export class ToursComponent implements OnInit {
  tours: Tour[] = [];

  constructor(private tourService: TourService, private router: Router) {}

  ngOnInit(): void {
    this.loadTours();
  }

  loadTours(): void {
    this.tourService.getTours().subscribe((tours) => {
      this.tours = tours;
    });
  }

  addTour(tour: Tour): void {
    this.tourService.addTour(tour).subscribe(() => {
      this.loadTours();
    });
  }

  updateTour(id: string, tour: Tour): void {
    this.tourService.updateTour(id, tour).subscribe(() => {
      this.loadTours();
    });
  }

  deleteTour(id: string): void {
    this.tourService.deleteTour(id).subscribe(() => {
      this.loadTours();
    });
  }

  selectTour(tour: Tour): void {
    this.router.navigate(['/hotels'], { state: { selectedTour: tour } });
  }
}
