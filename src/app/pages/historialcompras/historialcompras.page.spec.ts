import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HistorialcomprasPage } from './historialcompras.page';

describe('HistorialcomprasPage', () => {
  let component: HistorialcomprasPage;
  let fixture: ComponentFixture<HistorialcomprasPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(HistorialcomprasPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
