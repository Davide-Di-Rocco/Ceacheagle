import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CacheDetailCompletedPage } from './cache-detail-completed.page';

describe('CacheDetailCompletedPage', () => {
  let component: CacheDetailCompletedPage;
  let fixture: ComponentFixture<CacheDetailCompletedPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CacheDetailCompletedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
