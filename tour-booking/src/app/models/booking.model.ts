export interface Booking {
  id: string;
  tourId: string;
  hotelId: string;
  userId: string;
  date: string;
}

  
  export interface AddBooking {
    userId: number;
    hotelId?: number;
    tourId?: number;
    date: string;
  }
  