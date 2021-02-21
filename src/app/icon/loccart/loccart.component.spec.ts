import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { LoccartComponent } from './loccart.component';

describe('LoccartComponent', () => {
  let component: LoccartComponent;
  let fixture: ComponentFixture<LoccartComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoccartComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(LoccartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
