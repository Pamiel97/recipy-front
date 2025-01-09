import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PantryAddFormComponent } from './pantry-add-form.component';

describe('PantryAddFormComponent', () => {
  let component: PantryAddFormComponent;
  let fixture: ComponentFixture<PantryAddFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PantryAddFormComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PantryAddFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
