import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HotelsComponent } from './components/hotels/hotels.component';
import { ToursComponent } from './components/tours/tours.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { HotelDetailsComponent } from './components/hotels/hotel-details/hotel-details.component';
import { TourDetailsComponent } from './components/tours/tour-details/tour-details.component';
import { BookingsComponent } from './components/booking/booking.component';
import { AuthGuard } from './guards/auth.guard';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'hotels', component: HotelsComponent, canActivate: [AuthGuard] },
  { path: 'hotels/:id', component: HotelDetailsComponent, canActivate: [AuthGuard] },
  { path: 'tours', component: ToursComponent, canActivate: [AuthGuard] },
  { path: 'tours/:id', component: TourDetailsComponent, canActivate: [AuthGuard] },
  { path: 'booking', component: BookingsComponent, canActivate: [AuthGuard] },
  { path: '**', component: NotFoundComponent }
];
