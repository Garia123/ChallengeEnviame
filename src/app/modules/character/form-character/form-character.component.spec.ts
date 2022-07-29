import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormCharacterComponent } from './form-character.component';

describe('FormCharacterComponent', () => {
  let component: FormCharacterComponent;
  let fixture: ComponentFixture<FormCharacterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FormCharacterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FormCharacterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
