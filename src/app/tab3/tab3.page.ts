import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { Usuario } from '../service/usuario';
import { DbserviceService } from '../service/dbservice.service';
import { Jarra } from '../service/jarra';
import { Like } from '../service/like';
import { OnInit } from '@angular/core';

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss'],
  standalone: false,
})
export class Tab3Page implements OnInit {

  usuarioActivo: Usuario | null = null;
  jarras: Jarra[] = [];

  constructor(private dbservice: DbserviceService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(){
  
    this.dbservice.getUsuarioActivo().subscribe(usuario => {
      this.usuarioActivo = usuario;
    })
  }

  ionViewWillEnter() {
    if (this.usuarioActivo && this.usuarioActivo.id){
      this.dbservice.getJarrasFavoritas(this.usuarioActivo.id).then(data =>{
        this.jarras = data;
      }).catch(error => {
        console.error('Error al obtener las jarras favoritas:', error);
      });
    }
  }

  borrarJarra(jarra: Jarra){
    this.dbservice.deleteLike(jarra.id!)
    this.jarras = this.jarras.filter(j => j.id !== jarra.id);
  }

  logout(){
    this.dbservice.logout();
    this.router.navigate(['/login']);
  }
}
