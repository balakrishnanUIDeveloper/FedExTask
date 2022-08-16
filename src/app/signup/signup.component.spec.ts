import { ComponentFixture, TestBed } from '@angular/core/testing';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AppService } from '../app.service';
import { SignupComponent } from './signup.component';
import { By } from '@angular/platform-browser';

describe('SignupComponent', () => {
  let component: SignupComponent;
  let fixture: ComponentFixture<SignupComponent>;

  beforeEach(async () => {
    const routerStub = () => ({ navigateByUrl: (a: any) => ({}) });
    const appServiceStub = () => ({
      sendSignupData: (a: any) => ({
        subscribe: (f: any) => f({ _id: 'bala' })
      })
    });
    TestBed.configureTestingModule({
      schemas: [NO_ERRORS_SCHEMA],
      declarations: [SignupComponent],
      imports: [FormsModule],
      providers: [
        { provide: Router, useFactory: routerStub },
        { provide: AppService, useFactory: appServiceStub }
      ]
    }).compileComponents();
    fixture = TestBed.createComponent(SignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  it('should create', () => {
    expect(component).toBeDefined();
  });
  it('can load instance', () => {
    expect(component).toBeTruthy();
  });
  it('Set firstname text value', async () => {
    fixture.detectChanges();
    fixture.whenStable().then(() => {
      const firstName = fixture.debugElement.query(By.css('#firstName'));
      firstName.nativeElement.value = 'john';
      firstName.nativeElement.dispatchEvent(new Event('input'));
      fixture.detectChanges();
      expect(firstName.nativeElement.value).toContain('john');
    });
  });
  describe('onSubmit', () => {
    it('makes expected calls', () => {
      const ngFormStub: NgForm = <any>{
        value: {
          firstName: 'john',
          lastName: 'timothe',
          email: 'testemail@gmail.com',
          password: 'abcdefgh',
          confirmPassword: 'abcdefgh'
        },
        valid: true
      };
      const routerStub: Router = fixture.debugElement.injector.get(Router);
      const appServiceStub: AppService =
        fixture.debugElement.injector.get(AppService);
      spyOn(routerStub, 'navigateByUrl').and.callThrough();
      spyOn(appServiceStub, 'sendSignupData').and.callThrough();
      component.onSubmit(ngFormStub);
      expect(routerStub.navigateByUrl).toHaveBeenCalled();
      expect(appServiceStub.sendSignupData).toHaveBeenCalled();
    });
  });
});
