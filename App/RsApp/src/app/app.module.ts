import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgGridModule } from 'ag-grid-angular';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SidebarComponent } from './layout/sidebar/sidebar.component';
import { HeaderComponent } from './layout/header/header.component';
import { FooterComponent } from './layout/footer/footer.component';
import { DashboardComponent } from './layout/dashboard/dashboard.component';
import { BuyersComponent } from './modules/buyers/buyers.component';
import { BuyerListComponent } from './modules/buyers/buyer-list.component';
import { SellersComponent } from './modules/sellers/sellers.component';
import { SellerListComponent } from './modules/sellers/seller-list.component';
import { PlotsComponent } from './modules/plots/plots.component';
import { InstallmentsComponent } from './modules/installments/installments.component';
import { AgentsComponent } from './modules/agents/agents.component';
import { RegistriesComponent } from './modules/registries/registries.component';
import { LoginComponent } from './modules/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    SidebarComponent,
    HeaderComponent,
    FooterComponent,
    DashboardComponent,
    BuyersComponent,
    BuyerListComponent,
    SellersComponent,
    SellerListComponent,
    PlotsComponent,
    InstallmentsComponent,
    AgentsComponent,
    RegistriesComponent,
    LoginComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    AgGridModule.withComponents([])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
