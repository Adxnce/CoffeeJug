import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Jarra } from '../../service/jarra';


@Component({
  selector: 'app-jarra-card',
  templateUrl: './jarra-card.component.html',
  styleUrls: ['./jarra-card.component.scss'],
  standalone: false
})
export class JarraCardComponent  implements OnInit {

  @Input() jarra: Jarra | null = null;
  @Output() onMeGusta = new EventEmitter<Jarra>();

  constructor() {}

  clickMeGusta(){
    this.onMeGusta.emit(this.jarra!);
  }

  ngOnInit() {}

}
