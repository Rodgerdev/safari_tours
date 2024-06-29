import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../services/authentication.service';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-register',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;

  constructor(private authService: AuthenticationService, private router: Router) {}

  ngOnInit(): void {
    this.registerForm = new FormGroup({
      Name: new FormControl(null, [Validators.required]), // Ensure these names match the template
      Email: new FormControl(null, [Validators.required, Validators.email]), // Ensure these names match the template
      Password: new FormControl(null, [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]), // Ensure these names match the template
      confirmPassword: new FormControl(null, [Validators.required, this.matchPasswordValidator.bind(this)])
    });
  }

  matchPasswordValidator(control: FormControl): { [s: string]: boolean } | null {
    if (this.registerForm && control.value !== this.registerForm.get('Password')?.value) { // Ensure these names match the template
      return { passwordsMismatch: true };
    }
    return null;
  }

  onSubmit() {
    if (this.registerForm.valid) {
      const { confirmPassword, ...formValue } = this.registerForm.value; // Exclude confirmPassword coz of my endpoint (backend)
      formValue.isAdmin = 0; 

      this.authService.registerUser(formValue).subscribe(response => {
        this.router.navigate(['/login']);
      });
    }
  }
}
