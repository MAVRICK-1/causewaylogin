import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LinksendComponent } from './linksend.component';

describe('LinksendComponent', () => {
  let component: LinksendComponent;
  let fixture: ComponentFixture<LinksendComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LinksendComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(LinksendComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
