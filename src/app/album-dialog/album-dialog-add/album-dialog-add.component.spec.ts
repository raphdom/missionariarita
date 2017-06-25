import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AlbumDialogAddComponent } from './album-dialog-add.component';

describe('AlbumDialogAddComponent', () => {
  let component: AlbumDialogAddComponent;
  let fixture: ComponentFixture<AlbumDialogAddComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AlbumDialogAddComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AlbumDialogAddComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
