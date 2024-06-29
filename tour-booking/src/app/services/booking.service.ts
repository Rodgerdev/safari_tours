import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Booking } from '../models/booking.model';

@Injectable({
  providedIn: 'root'
})
export class BookingService {
  private readonly BASE_URL = 'http://localhost:3000/bookings';

  constructor(private http: HttpClient) {}

  createBooking(booking: Booking): Observable<Booking> {
    return this.http.post<Booking>(this.BASE_URL, booking);
  }

  getBookings(): Observable<Booking[]> {
    return this.http.get<Booking[]>(this.BASE_URL);
  }

  getBookingById(id: string): Observable<Booking> {
    return this.http.get<Booking>(`${this.BASE_URL}/${id}`);
  }

  updateBooking(id: string, booking: Booking): Observable<Booking> {
    return this.http.put<Booking>(`${this.BASE_URL}/${id}`, booking);
  }

  deleteBooking(id: string): Observable<void> {
    return this.http.delete<void>(`${this.BASE_URL}/${id}`);
  }
}
