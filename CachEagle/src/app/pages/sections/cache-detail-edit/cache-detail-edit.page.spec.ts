import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CacheDetailEditPage } from './cache-detail-edit.page';

describe('CacheDetailEditPage', () => {
  let component: CacheDetailEditPage;
  let fixture: ComponentFixture<CacheDetailEditPage>;

  beforeEach((() => {
    fixture = TestBed.createComponent(CacheDetailEditPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
