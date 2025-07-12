import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { NavigationExtras } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { state } from '@angular/animations';
// import { DbserviceService } from '../service/dbservice.service';
import { Usuario } from '../service/usuario';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false
})
export class LoginPage implements OnInit {

  usuario: string = '';
  password: string = '';
  isAuthenticated: boolean = false;

  constructor(private router: Router, 
              private alertController: AlertController
              // private DbserviceService: DbserviceService  
  ) { }

  ngOnInit() {
  }

   // Método para mostrar alerta de error
   async mostrarAlerta(mensaje: string) {
    const alert = await this.alertController.create({
      header: 'Error',
      message: mensaje,
      buttons: ['OK']
    });
    await alert.present();
  }

  irRegistro(){
    // Redirigir a la página de registro
    this.router.navigate(['/registro']);
  }

  async ingresar(){
    if(!this.usuario){
      this.mostrarAlerta('El campo usuario es obligatorio');
      return;
    }
    if(this.usuario.length < 4){
      this.mostrarAlerta('El campo usuario debe tener al menos 4 caracteres');
      return;
    }
    if(!this.password){
      this.mostrarAlerta('El campo contraseña es obligatorio');
      return;
    }
    if(this.password.length < 4 || this.password.length > 12){
      this.mostrarAlerta('El campo contraseña debe tener entre 4 y 12 caracteres');
      return;
    }

    if (this.usuario === 'usuarioValido' && this.password === '123456') {
      this.isAuthenticated = true;
      this.router.navigate(['/tabs/tab2'], {state: { usuario: this.usuario}})
    }else {
      this.mostrarAlerta('Usuario o contraseña incorrectos');
      this.isAuthenticated = false;
    }

  }

    


    // try {
    //   const usuarioEncontrado: Usuario | null = await this.DbserviceService.getUsuarioByUsuario(this.usuario);
    //   if (usuarioEncontrado && usuarioEncontrado.password === this.password){
    //     this.DbserviceService.presentToast('Bienvenido ' + usuarioEncontrado.firstname);
    //     this.DbserviceService.setUsuarioActivo(usuarioEncontrado);
    //     this.DbserviceService.presentToast('Bienvenido, ' + usuarioEncontrado.firstname);
    //     this.router.navigate(['/tabs']);
    //   }else {
    //     this.mostrarAlerta('Usuario o contraseña incorrectos')};
    //   }catch (error: any) {
    //     this.mostrarAlerta('Error al verificar el usuario: ' + error.message);
    //     console.error('Error al verificar el usuario:', error);
    //   }

  }
