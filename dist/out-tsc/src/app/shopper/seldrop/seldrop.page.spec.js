import { async, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { SeldropPage } from './seldrop.page';
describe('SeldropPage', () => {
    let component;
    let fixture;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [SeldropPage],
            imports: [IonicModule.forRoot()]
        }).compileComponents();
        fixture = TestBed.createComponent(SeldropPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=seldrop.page.spec.js.map