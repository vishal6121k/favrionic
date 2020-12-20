import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FavrPage } from './favr.page';

describe('FavrPage', () => {
  let component: FavrPage;
  let fixture: ComponentFixture<FavrPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FavrPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FavrPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
