import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { AlertController } from '@ionic/angular';
import { Usuario } from '../service/usuario';
import { DbserviceService } from '../service/dbservice.service';


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
  fechaNacimiento: Date | null = null;
  nivelEducacion: string = '';

  constructor(private router:Router, 
              private dbservice: DbserviceService) { };


  ngOnInit() {
  };

  async registrar() {
    if (!this.firstName) {
      this.dbservice.presentToast('El campo nombre es obligatorio');
      return;
    }
    if (!this.lastName) {
      this.dbservice.presentToast('El campo apellido es obligatorio');
      return;
    }
    if (!this.username) {
      this.dbservice.presentToast('El campo usuario es obligatorio');
      return;
    }
    if (this.username.length < 4) {
      this.dbservice.presentToast('El campo usuario debe tener al menos 4 caracteres');
      return;
    }
    if (!this.password) {
      this.dbservice.presentToast('El campo contraseña es obligatorio');
      return;
    }
    if (this.password.length < 4 || this.password.length > 12) {
      this.dbservice.presentToast('El campo contraseña debe tener entre 4 y 12 caracteres');
      return;
    }
    if (!this.fechaNacimiento) {
      this.dbservice.presentToast('El campo fecha de nacimiento es obligatorio');
      return;
    }
    if (!this.nivelEducacion) {
      this.dbservice.presentToast('El campo nivel de educación es obligatorio');
      return;
      }

    let fechaNacimientoFormateada: string | undefined;
    if(this.fechaNacimiento){
      const date = new Date(this.fechaNacimiento);
      if (!isNaN(date.getTime())) {
        fechaNacimientoFormateada = date.toISOString().split('T')[0]; // Formato YYYY-MM-DD
      }else{
        this.dbservice.presentToast('Fecha de nacimiento inválida');
        return;
      }
    }

    const nuevoUsuario = new Usuario(
      this.firstName,
      this.lastName,
      this.username,
      this.password,
      fechaNacimientoFormateada,
      this.nivelEducacion
    );

    try {
      await this.dbservice.addUsuario(nuevoUsuario);
      this.dbservice.presentToast('Usuario registrado correctamente');
      this.router.navigate(['/login']);
    }catch(error: any){
      this.dbservice.presentToast('Error al registrar el usuario: ' + error.message);
      console.error('Error al registrar el usuario:', error);
    }

    
  }

}
