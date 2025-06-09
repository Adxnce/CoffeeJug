import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: false,
})
export class Tab3Page {

  usuario: any;

  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    
    // Verificamos si la navegación actual tiene un 'state'
    if (navigation?.extras.state) {
      this.usuario = navigation.extras.state['usuario'];
      console.log('¡Datos de usuario recibidos en Tab1Page!', this.usuario);
    }
  }




}
