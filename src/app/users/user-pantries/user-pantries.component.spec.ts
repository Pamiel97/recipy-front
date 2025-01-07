import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPantriesComponent } from './user-pantries.component';

describe('UserPantriesComponent', () => {
  let component: UserPantriesComponent;
  let fixture: ComponentFixture<UserPantriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserPantriesComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserPantriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
