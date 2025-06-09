import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { NavigationExtras } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { state } from '@angular/animations';


@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false
})
export class LoginPage implements OnInit {

  usuario: string = '';
  password: string = '';

  constructor(private router: Router, 
              private alertController: AlertController  
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

  ingresar(){
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
    // Si todos los campos son válidos, redirigir a la página de tabs
    this.router.navigate(['/tabs/tab3'], {state: { usuario: this.usuario}});
  }
}
