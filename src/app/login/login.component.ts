import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../model/login/auth-service';
import { Router, RouterModule } from '@angular/router';
import { UserDto } from '../model/users/user-dto';
import { jwtDecode } from 'jwt-decode';  // Assicurati che l'importazione sia corretta

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
  
        // Crea l'oggetto UserDto utilizzando i dati del token decodificato
        const decodedToken: any = jwtDecode(r.token);
        const user: UserDto = {
          id: decodedToken.userId,
          firstname: decodedToken.firstname,
          lastname: decodedToken.lastname,
          profile: decodedToken.profile || '',
        };
  
        this.authService.loginSuccessful(user);   // Passa l'oggetto UserDto
        this.router.navigate(['/home']);           // Redirigi alla home o alla pagina dell'utente
      },
      error: (err) => alert('Login failed.')
    });
  }
}