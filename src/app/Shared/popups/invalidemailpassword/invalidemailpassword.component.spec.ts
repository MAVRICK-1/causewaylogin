import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvalidemailpasswordComponent } from './invalidemailpassword.component';

describe('InvalidemailpasswordComponent', () => {
  let component: InvalidemailpasswordComponent;
  let fixture: ComponentFixture<InvalidemailpasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvalidemailpasswordComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InvalidemailpasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
