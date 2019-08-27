import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynocomponentComponent } from './dynocomponent.component';

describe('DynocomponentComponent', () => {
  let component: DynocomponentComponent;
  let fixture: ComponentFixture<DynocomponentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DynocomponentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynocomponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
