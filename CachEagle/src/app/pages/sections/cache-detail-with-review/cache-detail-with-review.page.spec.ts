import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CacheDetailWithReviewPage } from './cache-detail-with-review.page';

describe('CacheDetailWithReviewPage', () => {
  let component: CacheDetailWithReviewPage;
  let fixture: ComponentFixture<CacheDetailWithReviewPage>;

  beforeEach(async(() => {
    fixture = TestBed.createComponent(CacheDetailWithReviewPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
