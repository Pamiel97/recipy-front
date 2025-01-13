// profile.component.ts

import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProfileService } from './profile.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { IntoleranceDto } from '../../model/intolerances/intolerance-dto';
import { AllergyDto } from '../../model/allergies/allergy-dto';

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
  isEditingPassword: boolean = false;
  intoleranceOptions: IntoleranceDto[] = [];
  allergyOptions: AllergyDto[] = [];
  hasIntolerances: string = 'no';
  hasAllergies: string = 'no';

  constructor(
    private fb: FormBuilder,
    private ps: ProfileService,
    private router: Router
  ) {
    this.profileForm = this.fb.group({
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(5)]],
      profile: ['', Validators.required],
      imgUrl: ['', Validators.required],
      pal: ['', Validators.required],
      weight: [
        '',
        [
          Validators.maxLength(5),
          Validators.pattern('^[+]?[0-9]{1,3}(\\.[0-9]{1,2})?$'),
          Validators.max(200),
          Validators.min(0),
        ],
      ],
      height: [
        '',
        [
          Validators.maxLength(3),
          Validators.pattern('^[+]?[0-9]{1,3}$'),
          Validators.max(300),
          Validators.min(0),
        ],
      ],
      bfp: ['', Validators.required],
      lbmp: ['', Validators.required],
      sex: ['', Validators.required],
      eatingRegimeId: ['', Validators.required],
      intolerances: this.fb.array([]),
      allergies: this.fb.array([]),
    });
  }

  ngOnInit(): void {
    this.ps.getProfile().subscribe({
      next: (profileData) => {
        if (profileData.imgUrl) {
          this.imgUrl = profileData.imgUrl;
        }
        if (profileData.id) {
          this.userId = profileData.id;
        }

        this.hasIntolerances =
        profileData.intolerances && profileData.intolerances.length > 0
          ? 'yes'
          : 'no';

      this.hasAllergies =
        profileData.allergies && profileData.allergies.length > 0
          ? 'yes'
          : 'no';

        this.loadIntolerances(profileData);
        this.loadAllergies(profileData);
        this.profileForm.patchValue(profileData);
      },
      error: (err) => {
        console.error(
          'Errore durante il caricamento dei dati del profilo:',
          err
        );
      },
    });

    this.profileForm.valueChanges.subscribe(() => {
      if (this.isEditing) {
        this.hasChanges = this.profileForm.dirty;
      }
    });
  }
  onIntolerancesChange(event: any): void {
    this.hasIntolerances = event.target.value;
  }

  onAllergiesChange(event: any): void {
    this.hasAllergies = event.target.value;
  }

  loadIntolerances(profileData: any): void {
    this.ps.getAvailableIntolerances().subscribe({
      next: (intolerances) => {
        this.intoleranceOptions = intolerances.map((intolerance: any) => ({
          id: intolerance.id,
          name: intolerance.name,
        }));

        const intoleranceFormArray = this.intoleranceOptions.map(() => false);
        this.profileForm.setControl(
          'intolerances',
          this.fb.array(intoleranceFormArray)
        );

        if (profileData.intolerances) {
          profileData.intolerances.forEach((intolerance: any) => {
            const intoleranceIndex = this.intoleranceOptions.findIndex(
              (option) => option.id === intolerance.id
            );
            if (intoleranceIndex >= 0) {
              this.intolerances.at(intoleranceIndex).setValue(true);
            }
          });
        }

        this.profileForm.get('intolerances')?.disable();
      },
      error: (err) => {
        console.error('Errore nel recupero delle intolleranze:', err);
      },
    });
  }

  loadAllergies(profileData: any): void {
    this.ps.getAvailableAllergies().subscribe({
      next: (allergies) => {
        this.allergyOptions = allergies.map((allergy: any) => ({
          id: allergy.id,
          name: allergy.name,
        }));

        const allergyFormArray = this.allergyOptions.map(() => false);
        this.profileForm.setControl(
          'allergies',
          this.fb.array(allergyFormArray)
        );

        if (profileData.allergies) {
          profileData.allergies.forEach((allergy: any) => {
            const allergiesIndex = this.allergyOptions.findIndex(
              (option) => option.id === allergy.id
            );
            if (allergiesIndex >= 0) {
              this.allergies.at(allergiesIndex).setValue(true);
            }
          });
        }
        this.profileForm.get('allergies')?.disable();
      },
      error: (err) => {
        console.error('Errore nel recupero delle intolleranze:', err);
      },
    });
  }

  enableEditing(): void {
    this.isEditing = true;
    this.profileForm.enable();
    this.profileForm.get('password')?.disable();
  }

  disableEditing(): void {
    this.isEditing = false;
    this.profileForm.disable();
    this.ps.getProfile().subscribe({
      next: (profileData) => {
        this.profileForm.patchValue(profileData);
      },
    });
  }

  enableEditingPassword(): void {
    this.profileForm.enable();
    this.profileForm.get('allergies')?.disable();
    this.profileForm.get('intolerances')?.disable();
    this.isEditingPassword = true;
  }

  disableEditingPassword(): void {
    this.isEditingPassword = false;
    this.profileForm.disable();
    this.ps.getProfile().subscribe({
      next: (profileData) => {
        this.profileForm.patchValue(profileData);
      },
    });
  }

  get intolerances() {
    return this.profileForm.get('intolerances') as FormArray;
  }

  get allergies() {
    return this.profileForm.get('allergies') as FormArray;
  }

  onSubmit(): void {
    if (this.profileForm.valid) {
      const selectedIntolerances = this.intoleranceOptions
        .filter((option, index) => this.intolerances.at(index).value)
        .map((option, index) => ({
          id: option.id,
          name: option.name,
        }));

      const selectedAllergies = this.allergyOptions
        .filter((option, index) => this.allergies.at(index).value)
        .map((option, index) => ({
          id: option.id,
          name: option.name,
        }));

      const profileData = {
        ...this.profileForm.value,
        intolerances: selectedIntolerances,
        allergies: selectedAllergies,
      };

      this.ps.saveProfile(profileData).subscribe({
        next: (response) => {
          console.log('Dati salvati con successo:', response);
          this.profileForm.patchValue(response);
          this.disableEditing();
          this.disableEditingPassword();
          alert('Dati salvati correttamente');
          window.location.reload();
        },
        error: (err) => {
          alert('Errore nel salvataggio dei dati');
          console.error('Errore durante la chiamata:', err);
        },
      });
    } else {
      alert('Per favore, compila tutti i campi correttamente');
    }
  }

  goToPantriesList(): void {
    this.router.navigate(['user-pantries']);
  }
  goToRecipesList(): void {
    this.router.navigate(['user-recipes']);
  }
  goToShoppingList(): void {
    this.router.navigate(['shopping-list']);
  }
}
