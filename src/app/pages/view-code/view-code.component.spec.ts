import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewCodeComponent } from './view-code.component';

describe('ViewCodeComponent', () => {
  let component: ViewCodeComponent;
  let fixture: ComponentFixture<ViewCodeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewCodeComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewCodeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
