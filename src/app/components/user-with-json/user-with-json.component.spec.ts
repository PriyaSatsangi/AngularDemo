import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserWithJsonComponent } from './user-with-json.component';

describe('UserWithJsonComponent', () => {
  let component: UserWithJsonComponent;
  let fixture: ComponentFixture<UserWithJsonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UserWithJsonComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserWithJsonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
