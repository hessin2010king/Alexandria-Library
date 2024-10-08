import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReadListComponent } from './read-list.component';

describe('ReadListComponent', () => {
  let component: ReadListComponent;
  let fixture: ComponentFixture<ReadListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReadListComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReadListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
