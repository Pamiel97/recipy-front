import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
@Component({
  selector: 'app-profile',
  imports: [RouterModule, ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent implements OnInit {

  profileForm: FormGroup = new FormGroup({});

  constructor(private fb: FormBuilder) {}

  ngOnInit(): void {
    this.profileForm = this.fb.group({
      imgUrl: [''], 
      pal: [''], 
      weight: ['', [Validators.maxLength(3)]], 
      height: ['', [Validators.maxLength(3)]], 
      bfp: [''], 
      lbmp: [''], 
      sex: [''], 
      eatingRegimeId: [''], 
    });
  }
  

  onSubmit(): void {
    if (this.profileForm.valid) {
      console.log('Dati salvati')
    }
    else {
      alert('Controlla i dati inseriti')
    }
  }

}
