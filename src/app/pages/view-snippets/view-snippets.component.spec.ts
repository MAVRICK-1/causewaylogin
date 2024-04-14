import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewSnippetsComponent } from './view-snippets.component';

describe('ViewSnippetsComponent', () => {
  let component: ViewSnippetsComponent;
  let fixture: ComponentFixture<ViewSnippetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ViewSnippetsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ViewSnippetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
