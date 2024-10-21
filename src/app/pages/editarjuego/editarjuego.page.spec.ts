import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditarjuegoPage } from './editarjuego.page';

describe('EditarjuegoPage', () => {
  let component: EditarjuegoPage;
  let fixture: ComponentFixture<EditarjuegoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarjuegoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
