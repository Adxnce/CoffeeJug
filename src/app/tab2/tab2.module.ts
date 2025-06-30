import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Tab2Page } from './tab2.page';
import { ExploreContainerComponentModule } from '../explore-container/explore-container.module';

import {MatCardModule} from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';

import { JarraCardComponent } from '../components/jarra-card/jarra-card.component';


import { Tab2PageRoutingModule } from './tab2-routing.module';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ExploreContainerComponentModule,
    Tab2PageRoutingModule,
    MatCardModule,
    MatButtonModule
  ],
  declarations: [Tab2Page, JarraCardComponent]
})
export class Tab2PageModule {}
