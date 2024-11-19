import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickshareComponent } from './quickshare.component';

describe('QuickshareComponent', () => {
  let component: QuickshareComponent;
  let fixture: ComponentFixture<QuickshareComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [QuickshareComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuickshareComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
