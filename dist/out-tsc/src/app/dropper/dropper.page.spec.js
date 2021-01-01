import { async, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';
import { DropperPage } from './dropper.page';
describe('DropperPage', () => {
    let component;
    let fixture;
    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [DropperPage],
            imports: [IonicModule.forRoot()]
        }).compileComponents();
        fixture = TestBed.createComponent(DropperPage);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));
    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
//# sourceMappingURL=dropper.page.spec.js.map