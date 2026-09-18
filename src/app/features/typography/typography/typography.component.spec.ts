import {ComponentFixture, TestBed} from '@angular/core/testing';

import {TypographyComponent} from './typography.component';

describe('TypographyComponent', () => {
    let component: TypographyComponent;
    let fixture: ComponentFixture<TypographyComponent>;

    beforeEach(() => {
        fixture = TestBed.createComponent(TypographyComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
