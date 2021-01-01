import { TestBed } from '@angular/core/testing';
import { RoleGuardService } from './role-guard.service';
describe('RoleGuardService', () => {
    let service;
    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(RoleGuardService);
    });
    it('should be created', () => {
        expect(service).toBeTruthy();
    });
});
//# sourceMappingURL=role-guard.service.spec.js.map