import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
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

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'buyers', component: BuyerListComponent },
  { path: 'buyers/add', component: BuyersComponent },
  { path: 'sellers', component: SellerListComponent },
  { path: 'sellers/add', component: SellersComponent },
  { path: 'plots', component: PlotsComponent },
  { path: 'installments', component: InstallmentsComponent },
  { path: 'installments/plan', component: InstallmentsComponent },
  { path: 'agents', component: AgentsComponent },
  { path: 'registries', component: RegistriesComponent },
  { path: '**', redirectTo: 'login' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
