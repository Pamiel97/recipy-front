import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../model/login/auth-service';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule,RouterModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent  implements OnInit {

  loginForm!: FormGroup;

  constructor(private fb: FormBuilder, private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.email, Validators.required]],
      password: ['', [Validators.required, Validators.minLength(5)]]
    });
  }

  onSubmit(): void {
    this.authService.login(this.loginForm.value).subscribe({
      next: (r) => {
        localStorage.setItem('jwtToken', r.token);  // Memorizza il token
        localStorage.setItem('userEmail', this.loginForm.value.email);  // Memorizza l'email
        this.authService.loginSuccessful(this.loginForm.value.email);   // Salva l'email come "utente connesso"
        this.authService.loginSuccessful('User');   // Puoi sostituire 'User' con un nome utente più specifico
        this.router.navigate(['/home']);            // Redirigi alla home o alla pagina dell'utente
      },
      error: (err) => alert('Login failed.')
    });
  }
}