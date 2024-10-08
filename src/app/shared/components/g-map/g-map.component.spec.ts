import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GMapComponent } from './g-map.component';

describe('GMapComponent', () => {
  let component: GMapComponent;
  let fixture: ComponentFixture<GMapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [GMapComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GMapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
