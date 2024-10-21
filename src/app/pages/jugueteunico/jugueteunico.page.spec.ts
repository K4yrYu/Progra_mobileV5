import { ComponentFixture, TestBed } from '@angular/core/testing';
import { JugueteunicoPage } from './jugueteunico.page';

describe('JugueteunicoPage', () => {
  let component: JugueteunicoPage;
  let fixture: ComponentFixture<JugueteunicoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(JugueteunicoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
