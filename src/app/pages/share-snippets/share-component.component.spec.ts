import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShareComponentComponent } from './share-component.component';

describe('ShareComponentComponent', () => {
  let component: ShareComponentComponent;
  let fixture: ComponentFixture<ShareComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShareComponentComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShareComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
