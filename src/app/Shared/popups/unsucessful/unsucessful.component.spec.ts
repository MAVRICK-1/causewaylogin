import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnsucessfulComponent } from './unsucessful.component';

describe('UnsucessfulComponent', () => {
  let component: UnsucessfulComponent;
  let fixture: ComponentFixture<UnsucessfulComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [UnsucessfulComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(UnsucessfulComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
