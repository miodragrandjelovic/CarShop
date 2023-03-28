import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdvertComponent } from './components/advert/advert.component';
import { CardComponent } from './components/card/card.component';
import { CreateComponent } from './components/create/create.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { MainComponent } from './components/main/main.component';
import { MyprofileComponent } from './components/myprofile/myprofile.component';
import { RegisterComponent } from './components/register/register.component';
import { AuthGuard } from './services/auth.guard';
import { Auth2Guard } from './services/auth2.guard';

const routes: Routes = [

  {path:'main',component:MainComponent,canActivate:[Auth2Guard]},
  {path:'',redirectTo:'main',pathMatch:'full'},
  {path:'register',component:RegisterComponent,canActivate:[Auth2Guard]},
  {path:'login',component:LoginComponent,canActivate:[Auth2Guard]},
  {path:'home',component:HomeComponent,canActivate:[AuthGuard]},
  {path:'card',component:CardComponent},
  {path:'advert/:id', component:AdvertComponent,canActivate:[AuthGuard]},
  {path:'createOffer', component:CreateComponent,canActivate:[AuthGuard]},
  {path:'profile', component:MyprofileComponent,canActivate:[AuthGuard]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
