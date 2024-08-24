import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Remote2Component } from './remote2.component';

describe('Remote2Component', () => {
  let component: Remote2Component;
  let fixture: ComponentFixture<Remote2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Remote2Component]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Remote2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
