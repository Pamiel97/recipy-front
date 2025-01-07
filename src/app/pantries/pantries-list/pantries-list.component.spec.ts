import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PantriesListComponent } from './pantries-list.component';

describe('PantriesListComponent', () => {
  let component: PantriesListComponent;
  let fixture: ComponentFixture<PantriesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PantriesListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PantriesListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
