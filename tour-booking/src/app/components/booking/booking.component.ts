import { Component, OnInit } from '@angular/core';
import { BookingService } from '../../services/booking.service';
import { Booking } from '../../models/booking.model';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-bookings',
  templateUrl: './booking.component.html',
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  styleUrls: ['./booking.component.css'],
  standalone: true
})
export class BookingsComponent implements OnInit {
  bookings: Booking[] = [];

  constructor(private bookingService: BookingService) {}

  ngOnInit(): void {
    this.loadBookings();
  }

  loadBookings(): void {
    this.bookingService.getBookings().subscribe((bookings) => {
      this.bookings = bookings;
    });
  }

  addBooking(booking: Booking): void {
    this.bookingService.createBooking(booking).subscribe(() => {
      this.loadBookings();
    });
  }

  updateBooking(id: string, booking: Booking): void {
    this.bookingService.updateBooking(id, booking).subscribe(() => {
      this.loadBookings();
    });
  }

  deleteBooking(id: string): void {
    this.bookingService.deleteBooking(id).subscribe(() => {
      this.loadBookings();
    });
  }
}
