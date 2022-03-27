import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { AuthrorizeComponent } from './authrorize/authrorize.component';
import { ConnectedComponent } from './connected/connected.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { TokenGuard } from './token.guard';

const routes: Routes = [
    {
        path: "authorize",
        component: AuthrorizeComponent,
    },
    {
        path: "login",
        component: LoginComponent
    },
    {
        path: "home",
        component: HomeComponent
    },
    {
        path: "connected",
        component: ConnectedComponent,
        canActivate: [TokenGuard]
    },
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
