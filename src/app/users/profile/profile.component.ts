// profile.component.ts

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProfileService } from './profile.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  imports: [CommonModule, ReactiveFormsModule],
})
export class ProfileComponent implements OnInit {
  profileForm: FormGroup;
  imgUrl: string = '';
  userId: string | null = null;
  isEditing: boolean = false;
  hasChanges: boolean = false;

  constructor(private fb: FormBuilder, private ps: ProfileService) {
    this.profileForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]],
      profile: ['', Validators.required],
      imgUrl: ['', Validators.required],
      pal: ['', Validators.required],
      weight: ['', [
        Validators.maxLength(5),
        Validators.pattern('^[+]?[0-9]{1,3}(\\.[0-9]{1,2})?$'),
        Validators.max(200),
        Validators.min(0)
      ]],
      height: ['', [
        Validators.maxLength(3),
        Validators.pattern('^[+]?[0-9]{1,3}$'),
        Validators.max(300),
        Validators.min(0)
      ]],
      bfp: ['', Validators.required],
      lbmp: ['', Validators.required],
      sex: ['', Validators.required],
      eatingRegimeId: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.ps.getProfile().subscribe({
      next: (profileData) => {
        // Debug: Log dei dati ricevuti per confermare
        console.log('Profile data:', profileData);

        // Assicurati che i dati siano corretti
        this.profileForm.patchValue(profileData); // Patch dei dati al form
        if (profileData.imgUrl) {
          this.imgUrl = profileData.imgUrl; // Aggiungi l'URL dell'immagine
        }
        if (profileData.id) {
          this.userId = profileData.id;
        }
        // Disabilitare i campi al caricamento iniziale
        this.profileForm.disable();
      },
      error: (err) => {
        console.error('Errore durante il caricamento dei dati del profilo:', err);
      }
    });

    this.profileForm.valueChanges.subscribe(() => {
      if (this.isEditing) {
        this.hasChanges = this.profileForm.dirty;
      }
    });
  }

  enableEditing(): void {
    this.isEditing = true;
    this.profileForm.enable(); // Abilita i campi per la modifica
  }

  disableEditing(): void {
    this.isEditing = false;
    this.profileForm.disable(); // Disabilita i campi
    this.ps.getProfile().subscribe({
      next: (profileData) => {
        this.profileForm.patchValue(profileData); // Ripristina i dati originali
      },
    });
  }

  onSubmit(): void {
    if (this.profileForm.valid) {
      console.log(this.profileForm.value)
      this.ps.saveProfile(this.profileForm.value).subscribe({
        next: (response) => {
          console.log('Dati salvati con successo:', response);
          this.profileForm.patchValue(response); // Aggiorna il form con i nuovi dati
          this.disableEditing()
          alert('Dati salvati correttamente');
        },
        error: (err) => {
          alert('Errore nel salvataggio dei dati');
          console.error('Errore durante la chiamata:', err);
        }
      });
    } else {
      alert('Per favore, compila tutti i campi correttamente');
    }
  }
}
