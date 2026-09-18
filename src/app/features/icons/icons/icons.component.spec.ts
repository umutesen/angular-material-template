import {ComponentFixture, TestBed} from '@angular/core/testing';

import {IconsComponent} from './icons.component';

describe('IconsComponent', () => {
    let component: IconsComponent;
    let fixture: ComponentFixture<IconsComponent>;

    beforeEach(() => {
        fixture = TestBed.createComponent(IconsComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
