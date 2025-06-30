import { Component, ViewChild, OnInit } from '@angular/core';
import { DbserviceService } from '../service/dbservice.service';
import { Jarra } from '../../app/service/jarra';



@Component({
  selector: 'app-tab2',
  templateUrl: 'tab2.page.html',
  styleUrls: ['tab2.page.scss'],
  standalone: false,
})
export class Tab2Page implements OnInit {

  @ViewChild('popover') popover!: HTMLIonPopoverElement;

  jarras: Jarra[] = [];

  constructor(private dbservice: DbserviceService) { }

  ngOnInit() {
    this.dbservice.dbState().subscribe((isReady) => {
      if (isReady) {
        this.dbservice.getJarras().then(data => {
          this.jarras = data;
        });
      }
    });
  }

  meGusta(jarra: Jarra){
    this.dbservice.presentToast('Me gusta la jarra: ' + jarra.nombre);
  }
}
