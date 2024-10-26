import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FlagDropDownComponent } from './flag-drop-down.component';

describe('FlagDropDownComponent', () => {
  let component: FlagDropDownComponent;
  let fixture: ComponentFixture<FlagDropDownComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FlagDropDownComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FlagDropDownComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
