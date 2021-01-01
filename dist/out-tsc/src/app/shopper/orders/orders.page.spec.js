import { async, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { OrdersPage } from './orders.page';
describe('OrdersPage', () => {
    let component;
    let fixture;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [OrdersPage],
            imports: [IonicModule.forRoot()]
        }).compileComponents();
        fixture = TestBed.createComponent(OrdersPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=orders.page.spec.js.map