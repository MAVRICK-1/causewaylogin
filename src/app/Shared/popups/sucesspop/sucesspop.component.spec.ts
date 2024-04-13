import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SucesspopComponent } from './sucesspop.component';

describe('SucesspopComponent', () => {
  let component: SucesspopComponent;
  let fixture: ComponentFixture<SucesspopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SucesspopComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SucesspopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
