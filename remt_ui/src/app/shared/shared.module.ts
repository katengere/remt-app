import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { SideNavComponent } from './side-nav/side-nav.component';
import { FooterComponent } from './footer/footer.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { UserlayoutComponent } from './userlayout/userlayout.component';
import { MessageComponent } from './message/message.component';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { MatMenuModule } from '@angular/material/menu';
import { FormsModule } from '@angular/forms';
import { defaultDataServiceConfig } from './services/user-entity.service';
import { DefaultDataServiceConfig } from '@ngrx/data';
import { MatDialogModule } from '@angular/material/dialog';
import { BrokerDetailsComponent } from './broker-details/broker-details.component';
import { LandlordDetailsComponent } from './landlord-details/landlord-details.component';

@NgModule({
  declarations: [
    HeaderComponent,
    SideNavComponent,
    FooterComponent,
    UserlayoutComponent,
    MessageComponent,
    BrokerDetailsComponent,
    LandlordDetailsComponent, 
  ],
  exports:[
    HeaderComponent,
    SideNavComponent,
    FooterComponent,
    MessageComponent
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatSidenavModule,
    MatDialogModule,
    MatToolbarModule,
    MatButtonModule,
    MatListModule,
    FormsModule,
    RouterModule,
    MatMenuModule
  ],
  providers:[
    {provide: DefaultDataServiceConfig, useValue: defaultDataServiceConfig},
    {provide: MAT_SNACK_BAR_DATA, useValue:MAT_SNACK_BAR_DATA}
  ]
})
export class SharedModule { }
