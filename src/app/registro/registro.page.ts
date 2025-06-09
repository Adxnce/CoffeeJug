import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
  standalone: false
})
export class RegistroPage implements OnInit {

  firstName: string = '';
  lastName: string = '';
  password: string = '';
  username: string = '';
  fechaNacimiento: any;
  nivelEducacion: string = '';


  constructor(private router: Router , private alertController: AlertController) { }

  ngOnInit() {
  }

     async mostrarAlerta(mensaje: string) {
    const alert = await this.alertController.create({
      header: 'Error',
      message: mensaje,
      buttons: ['OK']
    });
    await alert.present();
  }

  registrar() {
    if (!this.firstName) {
      this.mostrarAlerta('El campo nombre es obligatorio');
      return;
    }
    if (!this.lastName) {
      this.mostrarAlerta('El campo apellido es obligatorio');
      return;
    }
    if (!this.username) {
      this.mostrarAlerta('El campo usuario es obligatorio');
      return;
    }
    if (this.username.length < 4) {
      this.mostrarAlerta('El campo usuario debe tener al menos 4 caracteres');
      return;
    }
    if (!this.password) {
      this.mostrarAlerta('El campo contraseña es obligatorio');
      return;
    }
    if (this.password.length < 4 || this.password.length > 12) {
      this.mostrarAlerta('El campo contraseña debe tener entre 4 y 12 caracteres');
      return;
    }
    if (!this.fechaNacimiento) {
      this.mostrarAlerta('El campo fecha de nacimiento es obligatorio');
      return;
    }
    if (!this.nivelEducacion) {
      this.mostrarAlerta('El campo nivel de educación es obligatorio');
      return;
      }
    this.router.navigate(['/login']);
  }

}
