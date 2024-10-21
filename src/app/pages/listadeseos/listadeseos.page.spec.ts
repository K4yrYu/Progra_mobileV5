import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ListadeseosPage } from './listadeseos.page';

describe('ListadeseosPage', () => {
  let component: ListadeseosPage;
  let fixture: ComponentFixture<ListadeseosPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(ListadeseosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
