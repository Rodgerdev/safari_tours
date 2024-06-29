import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { TourService } from '../../../services/tour.service';
import { Tour } from '../../../models/tour.model';
import { AuthenticationService } from '../../../services/authentication.service';

@Component({
  standalone: true,
  selector: 'app-tour-details',
  templateUrl: './tour-details.component.html',
  styleUrls: ['./tour-details.component.css'],
  imports: [CommonModule, FormsModule, RouterModule]
})
export class TourDetailsComponent {
  tour: Tour | undefined;

  constructor(
    private route: ActivatedRoute, 
    private tourService: TourService,
  private authService: AuthenticationService) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.tourService.getTourById(id).subscribe((tour) => {
      this.tour = tour;
    });
  }

  isAdmin() {
    return this.authService.isAdmin;
  }
}
