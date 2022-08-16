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
  afterEach(() => {
    fixture.destroy();
  });
  it('should create', () => {
    expect(component).toBeDefined();
  });
  it('can load instance', () => {
    expect(component).toBeTruthy();
  });
  describe('Input validation check', () => {
    it('firstname should throw error when input value contains non alpahbetical characters', async () => {
      fixture.detectChanges();
      const firstName = fixture.nativeElement.querySelector('#firstName');
      firstName.value = 'john123';
      firstName.dispatchEvent(new InputEvent('focus'));
      firstName.dispatchEvent(new InputEvent('blur'));
      fixture.detectChanges();
      expect(firstName.value).toEqual('john123');
      fixture.whenStable().then(() => {
        const firstName = fixture.nativeElement.querySelector('#fn_error');
        expect(firstName.innerHTML).toContain(
          component.fields_label.first_name.error
        );
      });
    });
    it('firstname should not throw error when input value contains alpahbetical characters', async () => {
      fixture.detectChanges();
      const firstName = fixture.nativeElement.querySelector('#firstName');
      firstName.value = 'john';
      firstName.dispatchEvent(new InputEvent('focus'));
      firstName.dispatchEvent(new InputEvent('change'));
      fixture.detectChanges();
      expect(firstName.value).toEqual('john');
      fixture.whenStable().then(() => {
        const firstName = fixture.nativeElement.querySelector('#fn_error');
        expect(firstName).toBeNull();
      });
    });
    it('lastname should throw error when input value contains non alpahbetical characters', async () => {
      fixture.detectChanges();
      const lastname = fixture.nativeElement.querySelector('#lastName');
      lastname.value = 'john123';
      lastname.dispatchEvent(new InputEvent('focus'));
      lastname.dispatchEvent(new InputEvent('blur'));
      fixture.detectChanges();
      expect(lastname.value).toEqual('john123');
      fixture.whenStable().then(() => {
        const lastname = fixture.nativeElement.querySelector('#ln_error');
        expect(lastname.innerHTML).toContain(
          component.fields_label.last_name.error
        );
      });
    });
    it('lastname should not throw error when input value contains alpahbetical characters', async () => {
      fixture.detectChanges();
      const lastname = fixture.nativeElement.querySelector('#lastName');
      lastname.value = 'john';
      lastname.dispatchEvent(new InputEvent('focus'));
      lastname.dispatchEvent(new InputEvent('change'));
      fixture.detectChanges();
      expect(lastname.value).toEqual('john');
      fixture.whenStable().then(() => {
        const lastname = fixture.nativeElement.querySelector('#ln_error');
        expect(lastname).toBeNull();
      });
    });
    it('email should throw error when input value contains non alpahbetical characters', async () => {
      fixture.detectChanges();
      const email = fixture.nativeElement.querySelector('#email');
      email.value = 'test@gmail';
      email.dispatchEvent(new InputEvent('focus'));
      email.dispatchEvent(new InputEvent('blur'));
      fixture.detectChanges();
      expect(email.value).toEqual('test@gmail');
      fixture.whenStable().then(() => {
        const email = fixture.nativeElement.querySelector('#email_error');
        expect(email.innerHTML).toContain(component.fields_label.email.error);
      });
    });
    it('email should not throw error when input value contains non alpahbetical characters', async () => {
      fixture.detectChanges();
      const email = fixture.nativeElement.querySelector('#email');
      email.value = 'test@gmail.com';
      email.dispatchEvent(new InputEvent('focus'));
      email.dispatchEvent(new InputEvent('change'));
      fixture.detectChanges();
      expect(email.value).toEqual('test@gmail.com');
      fixture.whenStable().then(() => {
        const email = fixture.nativeElement.querySelector('#email_error');
        expect(email).toBeNull();
      });
    });
    it('password should throw error when input value contains invalid characters', async () => {
      fixture.detectChanges();
      const password = fixture.nativeElement.querySelector('#password');
      password.value = 'test@';
      password.dispatchEvent(new InputEvent('focus'));
      password.dispatchEvent(new InputEvent('blur'));
      fixture.detectChanges();
      expect(password.value).toEqual('test@');
      fixture.whenStable().then(() => {
        const password = fixture.nativeElement.querySelector('#password_error');
        expect(password.innerHTML).toContain(
          component.fields_label.password.error
        );
      });
    });
    it('password should not throw error when input value contains valid characters', async () => {
      fixture.detectChanges();
      const password = fixture.nativeElement.querySelector('#password');
      password.value = 'abcdefghij';
      password.dispatchEvent(new InputEvent('focus'));
      password.dispatchEvent(new InputEvent('change'));
      fixture.detectChanges();
      expect(password.value).toEqual('abcdefghij');
      fixture.whenStable().then(() => {
        const password = fixture.nativeElement.querySelector('#password_error');
        expect(password).toBeNull();
      });
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
