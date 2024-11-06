import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HistorialventasPage } from './historialventas.page';

describe('HistorialventasPage', () => {
  let component: HistorialventasPage;
  let fixture: ComponentFixture<HistorialventasPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(HistorialventasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
