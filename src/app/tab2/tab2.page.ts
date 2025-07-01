import { Component, ViewChild, OnInit } from '@angular/core';
import { DbserviceService } from '../service/dbservice.service';
import { Jarra } from '../../app/service/jarra';
import { Usuario } from '../service/usuario';
import { Like } from '../service/like';


@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: false,
})
export class Tab2Page implements OnInit {

  @ViewChild('popover') popover!: HTMLIonPopoverElement;

  jarras: Jarra[] = [];
  usuarioActivo: Usuario | null = null;


  constructor(private dbservice: DbserviceService) { }

  ngOnInit() {

    this.dbservice.getUsuarioActivo().subscribe(usuario => {
      this.usuarioActivo = usuario;
    });


    this.dbservice.dbState().subscribe((isReady) => {
      if (isReady) {
        this.dbservice.getJarras().then(data => {
          this.jarras = data;
        });
      }
    });
  }

  async meGusta(jarra: Jarra){
    const nuevoLike = new Like(this.usuarioActivo!.id!, jarra!.id!);
    try {
      await this.dbservice.addLike(nuevoLike);  
    }catch (error) {
      console.error('Error al agregar el like:', error);
    }
    this.dbservice.presentToast('Me gusta la jarra: ' + jarra.nombre);
  }
}
