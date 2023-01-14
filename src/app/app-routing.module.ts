import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from './Guards/auth.guard';
import { HomeComponent } from './component/home/home.component';
import { LoginComponent } from './component/login/login.component';
import { NotFoundComponent } from './component/not-found/not-found.component';
import { SignUpComponent } from './component/sign-up/sign-up.component';
import { SuperAdminComponent } from './component/super-admin/super-admin.component';
import { ReportComponent } from './component/report/report.component';
import { QuickSearchComponent } from './component/quick-search/quick-search.component';
import { QuickSearchInReportComponent } from './component/quick-search-in-homeless-before-add-report/quick-search-in-homeless-before-add-report.component';
import { AddReportComponent } from './component/add-report/add-report.component';
import { HomeLessComponent } from './component/home-less/home-less.component';
import { AddHomelessComponent } from './component/add-homeless/add-homeless.component';
import { AdminstrationComponent } from './component/adminstration/adminstration.component';
import { ClintReportComponent } from './component/clint-report/clint-report.component';
import { DisplayReportComponent } from './component/display-report/display-report.component';
import { DisplayMatchResultComponent } from './component/display-match-result/display-match-result.component';

const routes: Routes = [
  {path:"" , component:HomeComponent},
  {path:"admin" ,canActivate:[AuthGuard], component:AdminstrationComponent},
  {path:"login" , component:LoginComponent},
  {path:"search" , component:QuickSearchComponent},
  {path:"searchInReport" , component:QuickSearchInReportComponent},
  {path:"searchHomeLess", component:QuickSearchComponent},
  {path:"addReport" , canActivate:[AuthGuard],component:AddReportComponent},
  {path:"report" , canActivate:[AuthGuard] , component:ReportComponent},
  {path:'homeless',canActivate:[AuthGuard] , component:HomeLessComponent},
  {path:"addHomeless" ,  canActivate:[AuthGuard] , component:AddHomelessComponent},
  {path:"clintReport" , component:ClintReportComponent},
  {path:"displayReport/:id" , component:DisplayReportComponent},
  {path:"displayMatchHomeless/:id" , component:DisplayMatchResultComponent}

];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
