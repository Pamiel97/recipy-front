import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { ProfileService } from './profile.service';
import { delay } from 'rxjs';

@Component({
  selector: 'app-profile',
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})

export class ProfileComponent implements OnInit {
  profileForm: FormGroup = new FormGroup({});
  imgUrl: string = '';

  constructor(private fb: FormBuilder, private ps: ProfileService) {}

  ngOnInit(): void {
    
    this.profileForm = this.fb.group({
      imgUrl: [''],
      pal: [''],
      weight: ['', [
        Validators.maxLength(5), 
        Validators.pattern('^[+]?[0-9]{1,3}(\\.[0-9]{1,2})?$'),  // Consente numeri positivi con fino a 2 decimali
        Validators.max(200), // Limita a 200 kg
        Validators.min(0) // Impedisce numeri negativi, 
        ]],
      height: ['', [
        Validators.maxLength(3), 
        Validators.pattern('^[+]?[0-9]{1,3}$'),  // Consente solo numeri positivi fino a 3 cifre
        Validators.max(300), // Limita a 300 cm
        Validators.min(0) // Impedisce numeri negativi
        ]],
      bfp: [''],
      lbmp: [''], 
      sex: [''], 
      eatingRegimeId: [''], 
    });

    this.ps.getProfile().subscribe({
      next: (profileData) => {
        console.log('Dati ricevuti dal backend:', profileData);
        this.profileForm.patchValue(profileData);

        if (profileData.imgUrl) {
          this.imgUrl = profileData.imgUrl;
        }
      },
    });
  }

  onSubmit(): void {
    if (this.profileForm.valid) {
      this.ps.saveProfile(this.profileForm.value).subscribe({
        next: (response) => {
          console.log('Risposta dal server:', response);
          delay(1000)
          window.location.reload();
        },
        error: (err) => {
          alert('Impossibile salvare, controllare i dati')
          console.error('Errore durante la chiamata:', err);
        }
      });
    }
    else {
      alert('Controlla i dati inseriti')
    }
  }
}
