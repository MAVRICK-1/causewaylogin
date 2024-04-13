// eslint-disable-next-line linebreak-style
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { passwordlessLogin } from './login.component';

describe('LoginComponent', () => {
  let component: passwordlessLogin;
  let fixture: ComponentFixture<passwordlessLogin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [passwordlessLogin], // Declare the test component;
    })
    .compileComponents(); // Compile the component
    fixture = TestBed.createComponent(passwordlessLogin); // Create the component
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
