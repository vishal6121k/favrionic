import { async, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { ShopperPage } from './shopper.page';
describe('ShopperPage', () => {
    let component;
    let fixture;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ShopperPage],
            imports: [IonicModule.forRoot()]
        }).compileComponents();
        fixture = TestBed.createComponent(ShopperPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=shopper.page.spec.js.map