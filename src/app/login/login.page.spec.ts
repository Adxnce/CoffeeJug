import { ComponentFixture, TestBed,  } from '@angular/core/testing';
import { LoginPage } from './login.page';

import { IonicModule, NavController, AlertController } from '@ionic/angular';
import { RouterTestingModule } from '@angular/router/testing';
import { Router } from '@angular/router';

describe('LoginPage', () => {

  let component: LoginPage;
  let fixture: ComponentFixture<LoginPage>;
  let navControllerSpy: jasmine.SpyObj<Router>;
  let alertControllerSpy: jasmine.SpyObj<AlertController>;

  beforeEach(async () => {

    const alertControllerMock = jasmine.createSpyObj('AlertController', ['create']);
    const navControllerMock = jasmine.createSpyObj('Router', ['navigate']);

    await TestBed.configureTestingModule({
      declarations:[LoginPage],
      imports: [IonicModule.forRoot(), RouterTestingModule],
      providers: [
        {provide: Router, useValue: navControllerMock},
        {provide: AlertController, useValue: alertControllerMock}
      ]
    }).compileComponents();
  
    fixture = TestBed.createComponent(LoginPage);
    component = fixture.componentInstance;
    navControllerSpy = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    alertControllerSpy = TestBed.inject(AlertController) as jasmine.SpyObj<AlertController>;

    //Y por ultimo hacemos un mockup
    alertControllerSpy.create.and.returnValue(Promise.resolve({
      present: jasmine.createSpy('present'),
    }) as any);

    fixture.detectChanges();

  });

  it('Deberia crear el componente LoginPage correctamente', () => {
    expect(component).toBeTruthy();
  });

  it('Debería mostrar una alerta si el campo usuario está vacío', async ()=> {
    component.usuario = '';
    component.password = '123456';
    await component.ingresar();
    expect(alertControllerSpy.create).toHaveBeenCalled();
  });
  
  it('Debería mostrar una alerta si el campo usuario tiene menos de 4 caracteres', async ()=> {
    component.usuario = 'err';
    component.password = '123456';
    await component.ingresar();
    expect(alertControllerSpy.create).toHaveBeenCalled();
  });

  it('Debería mostrar una alerta si el campo contraseña está vacío', async ()=> {
    component.usuario = 'usuarioValido';
    component.password = '';
    await component.ingresar();
    expect(alertControllerSpy.create).toHaveBeenCalled();
  });

  it('Debería mostrar una alerta si el campo contraseña tiene menos de 4 caracteres', async ()=> {
    component.usuario = 'usuarioValido';
    component.password = '123';
    await component.ingresar();
    expect(alertControllerSpy.create).toHaveBeenCalled();
  });

  it('Debería mostrar una alerta si el campo contraseña tiene mas de 12 caracteres', async ()=> {
    component.usuario = 'usuarioValido';
    component.password = '1234567890abc';
    await component.ingresar();
    expect(alertControllerSpy.create).toHaveBeenCalled();
  });

  it('Debería iniciar sesión correctamente', async ()=> {
    component.usuario = 'usuarioValido';
    component.password = '123456';
    await component.ingresar();
    expect(component.isAuthenticated).toBeTrue();
    expect(navControllerSpy.navigate).toHaveBeenCalled();
  });

    it('Debería arrojar credenciales invalidas', async ()=> {
    component.usuario = 'usuarioInvalido';
    component.password = '111222';
    await component.ingresar();
    expect(component.isAuthenticated).toBeFalse();
    expect(alertControllerSpy.create).toHaveBeenCalled();
  });




});




// import { ComponentFixture, TestBed } from '@angular/core/testing';
// import { LoginPage } from './login.page';

// describe('LoginPage', () => {
//   let component: LoginPage;
//   let fixture: ComponentFixture<LoginPage>;

//   beforeEach(() => {
//     fixture = TestBed.createComponent(LoginPage);
//     component = fixture.componentInstance;
//     fixture.detectChanges();
//   });

//   it('should create', () => {
//     expect(component).toBeTruthy();
//   });
// });
