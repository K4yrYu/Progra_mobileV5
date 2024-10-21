import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EliminarjuguetePage } from './eliminarjuguete.page';

describe('EliminarjuguetePage', () => {
  let component: EliminarjuguetePage;
  let fixture: ComponentFixture<EliminarjuguetePage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EliminarjuguetePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
