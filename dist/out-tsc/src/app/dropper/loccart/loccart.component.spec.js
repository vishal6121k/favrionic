import { async, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { LoccartComponent } from './loccart.component';
describe('LoccartComponent', () => {
    let component;
    let fixture;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [LoccartComponent],
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
//# sourceMappingURL=loccart.component.spec.js.map