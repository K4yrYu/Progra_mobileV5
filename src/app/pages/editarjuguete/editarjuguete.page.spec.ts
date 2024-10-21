import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditarjuguetePage } from './editarjuguete.page';

describe('EditarjuguetePage', () => {
  let component: EditarjuguetePage;
  let fixture: ComponentFixture<EditarjuguetePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarjuguetePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
