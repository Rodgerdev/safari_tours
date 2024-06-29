export interface User {
    id: number;
    Name: string;
    Email: string;
    Password: string;
    isAdmin: number;
  }
  
  export interface AddUser {
    Name: string;
    Email: string;
    Password: string;
    isAdmin: number; // Added isAdmin field
  }
  
  export interface RegisterResponse {
    Message: string;
  }
  
  export interface LoginReq {
    Email: string;
    Password: string;
  }
  
  export interface LoginResponse {
    message: string;
    token: string;
    isSuccess: boolean;
  }