import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ButtonClientSearchComponent } from './button-client-search.component';

describe('ButtonClientSearchComponent', () => {
  let component: ButtonClientSearchComponent;
  let fixture: ComponentFixture<ButtonClientSearchComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ButtonClientSearchComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ButtonClientSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
