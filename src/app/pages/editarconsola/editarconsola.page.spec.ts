import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditarconsolaPage } from './editarconsola.page';

describe('EditarconsolaPage', () => {
  let component: EditarconsolaPage;
  let fixture: ComponentFixture<EditarconsolaPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EditarconsolaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
