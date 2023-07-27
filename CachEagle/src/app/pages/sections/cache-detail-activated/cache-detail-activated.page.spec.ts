import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CacheDetailActivatedPage } from './cache-detail-activated.page';

describe('CacheDetailActivatedPage', () => {
  let component: CacheDetailActivatedPage;
  let fixture: ComponentFixture<CacheDetailActivatedPage>;

  beforeEach((() => {
    fixture = TestBed.createComponent(CacheDetailActivatedPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
