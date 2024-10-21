import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EliminarjuegoPage } from './eliminarjuego.page';

describe('EliminarjuegoPage', () => {
  let component: EliminarjuegoPage;
  let fixture: ComponentFixture<EliminarjuegoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EliminarjuegoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
