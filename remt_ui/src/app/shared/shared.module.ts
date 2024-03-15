import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatBadgeModule } from '@angular/material/badge';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MAT_SNACK_BAR_DATA } from '@angular/material/snack-bar';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule } from '@angular/router';
import { EntityDataService } from '@ngrx/data';
import { BrokerDetailsComponent } from './broker-details/broker-details.component';
import { ConfirmComponent } from './confirm/confirm.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { LandlordDetailsComponent } from './landlord-details/landlord-details.component';
import { MessageComponent } from './message/message.component';
import { DaysRemainPipe } from './pipes/days-remain.pipe';
import { FormatNamesPipe } from './pipes/format-names.pipe';
import { MonthsDiffPipe } from './pipes/months-diff.pipe';
import { SortInvoicesPipe } from './pipes/sort-invoices.pipe';
import { UserAgePipe } from './pipes/user-age.pipe';
import { ProfileComponent } from './profile/profile.component';
import { HouseDataService } from './services/house-data.service';
import { UserDataService } from './services/user-data.service';
import { SideNavComponent } from './side-nav/side-nav.component';
import { UserlayoutComponent } from './userlayout/userlayout.component';

@NgModule({
  declarations: [
    HeaderComponent,
    SideNavComponent,
    FooterComponent,
    UserlayoutComponent,
    MessageComponent,
    BrokerDetailsComponent,
    LandlordDetailsComponent,
    ConfirmComponent,
    FormatNamesPipe,
    DaysRemainPipe,
    UserAgePipe,
    MonthsDiffPipe,
    ProfileComponent,
    SortInvoicesPipe,
  ],
  imports: [
    CommonModule,
    MatIconModule,
    MatSidenavModule,
    MatDialogModule,
    MatToolbarModule,
    MatButtonModule,
    MatListModule,
    MatBadgeModule,
    FormsModule,
    RouterModule,
    MatMenuModule
  ],
  exports: [
    HeaderComponent,
    SideNavComponent,
    FooterComponent,
    MessageComponent,
    FormatNamesPipe,
    DaysRemainPipe,
    UserAgePipe,
    MonthsDiffPipe,
    ProfileComponent,
    SortInvoicesPipe
  ],
  providers: [
    { provide: MAT_SNACK_BAR_DATA, useValue: MAT_SNACK_BAR_DATA }
  ]
})
export class SharedModule {
  constructor(
    entityDataService: EntityDataService,
    userDataService: UserDataService,
    houseDataService: HouseDataService
  ) {
    entityDataService.registerServices({ User: userDataService, House: houseDataService });
  }
}
