import { Component, OnInit } from '@angular/core';
import { PantryDto } from '../../model/pantries/pantry-dto';
import { PantryService } from '../../model/pantries/pantry-service';
import { Router} from '@angular/router';

@Component({
  selector: 'app-user-pantries',
  imports: [],
  templateUrl: './user-pantries.component.html',
  styleUrl: './user-pantries.component.css'
})
export class UserPantriesComponent implements OnInit{
  pantries! : PantryDto[];

  constructor(private pantryService: PantryService, private router: Router){}

  ngOnInit(): void {
    this.pantryService.getPantries().subscribe({
      next: p => {
              console.log(p);
              this.pantries = p;
      },
      error: () => alert('Dati mancanti o richiesta troppo lenta')
    })
  }

  goToCreatePantry(){
    this.router.navigate(['create-pantry']);
  }

  goToEditPantry(id: number){
    this.router.navigate(['edit-pantry', id]);
  }

  goToIngredientDetails(id: number) {
    this.router.navigate(['ingredient-details', id]);
  }

  deletePantry(id: number) {
    this.pantryService.deletePantry(id).subscribe({
      next: () => {
        alert('Ingrediente eliminato con successo dalla dispensa');
        window.location.reload();
      },
      error: () => alert('Errore durante l\'eliminazione dell\'ingrediente')
    })
  }

}
