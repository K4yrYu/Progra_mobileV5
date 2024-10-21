import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JuegounicoPage } from './juegounico.page';

describe('JuegounicoPage', () => {
  let component: JuegounicoPage;
  let fixture: ComponentFixture<JuegounicoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(JuegounicoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
