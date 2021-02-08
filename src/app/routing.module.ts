import { RouterModule, Routes } from '@angular/router';
import { ModuleWithProviders } from '@angular/core';
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
export const AppRoutes: Routes = [
   { path: 'approve', component: ApproveComponent }
  , { path: 'report', component: ReportComponent }
  , { path: 'menu', component: MenuComponent }
  , { path: 'content', component: ContentComponent }
  , { path: 'picture', component: PictureComponent }
  , { path: 'layout', component: LayoutComponent }
  , { path: 'metatag', component: MetatagComponent }
  , { path: 'metaparameter', component: MetaparameterComponent }
  , { path: 'home', component: HomeComponent }
  , { path: 'login', component: LoginComponent }
  , { path: 'admincontent', component: AdmincontentComponent }
  , { path: 'systemcontent', component: SystemcontentComponent }
  , { path: 'request', component: RequestComponent }
  , { path: 'prefix', component: PrefixComponent }
  , { path: 'occupation', component: OccupationComponent }
  , { path: 'city', component: CityComponent }
  , { path: 'header', component: HeaderComponent }
  , { path: 'footer', component: FooterComponent }
  , { path: 'newrequest', component: NewrequestComponent }
  , { path: 'generatepage', component: GeneratepageComponent }
  , { path: 'manageuser', component: ManageuserComponent }
  , { path: 'managerole', component: ManageroleComponent }
  , { path: 'managemenurole', component: ManagemenuroleComponent }
  , { path: 'pagination', component: PaginationComponent }
  , { path: '', component: LoginComponent }
  , { path: '**', redirectTo: 'not-found', pathMatch: 'full' }
];
export const ROUTING: ModuleWithProviders = RouterModule.forRoot(AppRoutes);