import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmailAlreadyexistComponent } from './email-alreadyexist.component';

describe('EmailAlreadyexistComponent', () => {
  let component: EmailAlreadyexistComponent;
  let fixture: ComponentFixture<EmailAlreadyexistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EmailAlreadyexistComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EmailAlreadyexistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
