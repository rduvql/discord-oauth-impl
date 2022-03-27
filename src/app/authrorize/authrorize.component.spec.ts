import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthrorizeComponent } from './authrorize.component';

describe('AuthrorizeComponent', () => {
  let component: AuthrorizeComponent;
  let fixture: ComponentFixture<AuthrorizeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AuthrorizeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AuthrorizeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
