import { BrowserModule } from '@angular/platform-browser';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpModule } from '@angular/http';
import { ROUTING } from './routing.module';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AppComponent } from './app.component';
import { EnvService } from './services/config.service';
import { HttpClient, HttpClientModule,  HttpInterceptor } from '@angular/common/http';
import { ApproveComponent } from './components/change requests/approve/approve.component';
import { ReportComponent } from './components/report/report.component';
import { MenuComponent } from './components/editors/menu/menu.component';
import { ContentComponent } from './components/editors/content/content.component';
import { PictureComponent } from './components/editors/picture/picture.component';
import { LayoutComponent } from './components/editors/layout/layout.component';
import { MetatagComponent } from './components/editors/metatag/metatag.component';
import { MetaparameterComponent } from './components/parameters/metaparameter/metaparameter.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { TemplatemenuComponent } from './components/template/templatemenu/templatemenu.component';
import { TemplateheaderComponent } from './components/template/templateheader/templateheader.component';
import { TemplatefooterComponent } from './components/template/templatefooter/templatefooter.component';
import { AdmincontentComponent } from './components/editors/admincontent/admincontent.component';
import { SystemcontentComponent } from './components/editors/systemcontent/systemcontent.component';
import { RequestComponent } from './components/change requests/request/request.component';
import { PrefixComponent } from './components/parameters/prefix/prefix.component';
import { OccupationComponent } from './components/parameters/occupation/occupation.component';
import { CityComponent } from './components/parameters/city/city.component';
import { HeaderComponent } from './components/editors/header/header.component';
import { FooterComponent } from './components/editors/footer/footer.component';
import { NewrequestComponent } from './components/change requests/newrequest/newrequest.component';
import { GeneratepageComponent } from './components/change requests/generatepage/generatepage.component';
import { ManageuserComponent } from './components/parameters/manageuser/manageuser.component';
import { ManageroleComponent } from './components/parameters/managerole/managerole.component';
import { ManagemenuroleComponent } from './components/parameters/managemenurole/managemenurole.component';
import { PaginationComponent } from './components/parameters/pagination/pagination.component';
import { RichTextEditorAllModule } from '@syncfusion/ej2-angular-richtexteditor';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ChartsModule } from 'ng2-charts';
const appInitializerFn = (appConfig: EnvService) => {
  return () => {
    return appConfig.loadEnvConfig();
  }
};
@NgModule({
  declarations: [
    AppComponent,
    ApproveComponent,
    ReportComponent,
    MenuComponent,
    ContentComponent,
    PictureComponent,
    LayoutComponent,
    MetatagComponent,
    MetaparameterComponent,
    HomeComponent,
    LoginComponent,
    TemplatemenuComponent,
    TemplateheaderComponent,
    TemplatefooterComponent,
    AdmincontentComponent,
    SystemcontentComponent,
    RequestComponent,
    PrefixComponent,
    OccupationComponent,
    CityComponent,
    HeaderComponent,
    FooterComponent,
    NewrequestComponent,
    GeneratepageComponent,
    ManageuserComponent,
    ManageroleComponent,
    ManagemenuroleComponent,
    PaginationComponent
  ],
  imports: [
    BrowserModule,
    ROUTING,
    HttpModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    RichTextEditorAllModule,
    BsDatepickerModule.forRoot(),
    BrowserAnimationsModule,
    ChartsModule
  ],
  providers: [
    { provide: LocationStrategy, useClass: HashLocationStrategy }, 
    EnvService,
    {
      provide: APP_INITIALIZER,
      useFactory: appInitializerFn,
      multi: true,
      deps: [EnvService]
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }