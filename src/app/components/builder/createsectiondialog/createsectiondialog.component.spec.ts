import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreatesectiondialogComponent } from './createsectiondialog.component';

describe('CreatesectiondialogComponent', () => {
  let component: CreatesectiondialogComponent;
  let fixture: ComponentFixture<CreatesectiondialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CreatesectiondialogComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreatesectiondialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
