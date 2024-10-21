import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AcercadenosotrosPage } from './acercadenosotros.page';

describe('AcercadenosotrosPage', () => {
  let component: AcercadenosotrosPage;
  let fixture: ComponentFixture<AcercadenosotrosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AcercadenosotrosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
