import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BernComponent } from './bern.component';

describe('BernComponent', () => {
  let component: BernComponent;
  let fixture: ComponentFixture<BernComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BernComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BernComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
