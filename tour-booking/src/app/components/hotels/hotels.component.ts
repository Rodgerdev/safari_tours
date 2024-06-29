import { Component, OnInit } from '@angular/core';
import { HotelService } from '../../services/hotel.service';
import { Hotel } from '../../models/hotel.model';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BookingService } from '../../services/booking.service';
import { AuthenticationService } from '../../services/authentication.service';

@Component({
  selector: 'app-hotels',
  templateUrl: './hotels.component.html',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  styleUrls: ['./hotels.component.css'],
  standalone: true
})
export class HotelsComponent implements OnInit {
  hotels: Hotel[] = [];
  selectedTour: any;
  selectedTourId: string | null = null;
  confirmationMessage: string | null = null;

  constructor(private hotelService: HotelService, 
    private router: Router,
    private bookingService: BookingService,
    private authenticationService: AuthenticationService) {
    const navigation = this.router.getCurrentNavigation();
    this.selectedTour = navigation?.extras.state?.['selectedTour'];
  }

  ngOnInit(): void {
    this.loadHotels();
  }

  loadHotels(): void {
    this.hotelService.getHotels().subscribe((hotels) => {
      this.hotels = hotels;
    });
  }

  addHotel(hotel: Hotel): void {
    this.hotelService.addHotel(hotel).subscribe(() => {
      this.loadHotels();
    });
  }

  updateHotel(id: string, hotel: Hotel): void {
    this.hotelService.updateHotel(id, hotel).subscribe(() => {
      this.loadHotels();
    });
  }

  deleteHotel(id: string): void {
    this.hotelService.deleteHotel(id).subscribe(() => {
      this.loadHotels();
    });
  }

  confirmBooking(hotel: Hotel): void {
    const userId = this.authenticationService.getUserId();
    if (!userId) {
      console.log("No user ID found");
      this.router.navigate(['/login']);
      return;
    }
    const booking = {
      id: '',
      tourId: this.selectedTour.id,
      hotelId: hotel.id,
      userId: userId,
      date: new Date().toISOString()
    };
    this.bookingService.createBooking(booking).subscribe(() => {
      this.confirmationMessage = 'Booking was successful, redirecting to homepage now!';
      setTimeout(() => {
        this.confirmationMessage = null;
        this.router.navigate(['']);
      }, 5000);
    });
  }
}
