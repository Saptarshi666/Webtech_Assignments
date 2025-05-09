import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Summary2Component } from './summary2.component';

describe('Summary2Component', () => {
  let component: Summary2Component;
  let fixture: ComponentFixture<Summary2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [Summary2Component]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(Summary2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
