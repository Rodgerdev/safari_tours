import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { HotelService } from '../../../services/hotel.service';
import { Hotel } from '../../../models/hotel.model';
import { AuthenticationService } from '../../../services/authentication.service';

@Component({
  standalone: true,
  selector: 'app-hotel-details',
  templateUrl: './hotel-details.component.html',
  styleUrls: ['./hotel-details.component.css'],
  imports: [CommonModule, FormsModule, RouterModule]
})
export class HotelDetailsComponent {
  hotel: Hotel | undefined;

  constructor(
    private route: ActivatedRoute, 
    private hotelService: HotelService,
  private authService: AuthenticationService) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id')!;
    this.hotelService.getHotelById(id).subscribe((hotel) => {
      this.hotel = hotel;
    });
  }

  isAdmin() {
    return this.authService.isAdmin;
  }
}
