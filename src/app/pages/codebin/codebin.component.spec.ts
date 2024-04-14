import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CodebinComponent } from './codebin.component';

describe('CodebinComponent', () => {
  let component: CodebinComponent;
  let fixture: ComponentFixture<CodebinComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CodebinComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CodebinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
