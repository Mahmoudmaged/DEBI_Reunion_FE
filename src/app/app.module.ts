import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SuperAdminComponent } from './component/super-admin/super-admin.component';
import {HttpClientModule} from "@angular/common/http"
import { from } from 'rxjs';
import {ReactiveFormsModule} from '@angular/forms';

import { NavBarComponent } from './component/nav-bar/nav-bar.component';
import { MapComponent } from './component/map/map.component'
import { AgmCoreModule } from '@agm/core';
import { LoginComponent } from './component/login/login.component';
import { SignUpComponent } from './component/sign-up/sign-up.component';
import { HomeComponent } from './component/home/home.component';
import { ReportSearchPipe } from './report-search.pipe';
import { HomeLessSearchPipe } from './home-less-search.pipe';
import { UserSearchPipe } from './user-search.pipe';
import { NotFoundComponent } from './component/not-found/not-found.component';
import { FooterComponent } from './component/footer/footer.component';
import { ReportComponent } from './component/report/report.component';
import { SideNavComponent } from './component/side-nav/side-nav.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatSliderModule } from '@angular/material/slider';
import { MatrialModule } from './matrial/matrial.module';
import { QuickSearchComponent } from './component/quick-search/quick-search.component';
import { QuickSearchInReportComponent } from './component/quick-search-in-homeless-before-add-report/quick-search-in-homeless-before-add-report.component';
import { AddReportComponent } from './component/add-report/add-report.component';
import { HomeLessComponent } from './component/home-less/home-less.component';
import { AddHomelessComponent } from './component/add-homeless/add-homeless.component';
import { AdminstrationComponent } from './component/adminstration/adminstration.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ClintReportComponent } from './component/clint-report/clint-report.component';
import { DisplayReportComponent } from './component/display-report/display-report.component';
import { DisplayMatchResultComponent } from './component/display-match-result/display-match-result.component';

declare var google:any;
@NgModule({
  declarations: [
    AppComponent,
    SuperAdminComponent,
    NavBarComponent,
    MapComponent,
    LoginComponent,
    SignUpComponent,
    HomeComponent,
    ReportSearchPipe,
    HomeLessSearchPipe,
    UserSearchPipe,
    NotFoundComponent,
    FooterComponent,
    ReportComponent,
    SideNavComponent,
    QuickSearchComponent,
    QuickSearchInReportComponent,
    AddReportComponent,
    HomeLessComponent,
    AddHomelessComponent,
    AdminstrationComponent,
    ClintReportComponent,
    DisplayReportComponent,
    DisplayMatchResultComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    MatrialModule,
    MatSliderModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDHras_JUHP0M-wD0WpzYG-_6JDBIOUSN0'
    }),
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
