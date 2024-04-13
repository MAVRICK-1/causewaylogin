import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvalidEmailComponent } from './invalid-email.component';

describe('InvalidEmailComponent', () => {
  let component: InvalidEmailComponent;
  let fixture: ComponentFixture<InvalidEmailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InvalidEmailComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InvalidEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
