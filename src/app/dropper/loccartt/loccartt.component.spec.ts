import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LoccarttComponent } from './loccartt.component';

describe('LoccarttComponent', () => {
  let component: LoccarttComponent;
  let fixture: ComponentFixture<LoccarttComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoccarttComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LoccarttComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
