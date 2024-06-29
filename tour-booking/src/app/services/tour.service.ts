import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tour } from '../models/tour.model';

@Injectable({
  providedIn: 'root'
})
export class TourService {
  private readonly BASE_URL = 'http://localhost:3000/tours';

  constructor(private http: HttpClient) {}

  getTours(): Observable<Tour[]> {
    return this.http.get<Tour[]>(this.BASE_URL);
  }

  getTourById(id: string): Observable<Tour> {
    return this.http.get<Tour>(`${this.BASE_URL}/${id}`);
  }

  addTour(tour: Tour): Observable<Tour> {
    return this.http.post<Tour>(this.BASE_URL, tour);
  }

  updateTour(id: string, tour: Tour): Observable<Tour> {
    return this.http.put<Tour>(`${this.BASE_URL}/${id}`, tour);
  }

  deleteTour(id: string): Observable<void> {
    return this.http.delete<void>(`${this.BASE_URL}/${id}`);
  }
}
