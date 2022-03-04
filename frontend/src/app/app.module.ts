import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './home/header/header.component';
import { FooterComponent } from './home/footer/footer.component';
import { RegisterComponent } from './home/register/register.component';
import { LoginComponent } from './home/login/login.component';
import { SaveTaskComponent } from './board/save-task/save-task.component';
import { ListTaskComponent } from './board/list-task/list-task.component';
import { RegisterUserComponent } from './admin/register-user/register-user.component';
import { ListUserComponent } from './admin/list-user/list-user.component';
import { UpdateUserComponent } from './admin/update-user/update-user.component';
import { RegisterRoleComponent } from './admin/register-role/register-role.component';
import { ListRoleComponent } from './admin/list-role/list-role.component';
import { UpdateRoleComponent } from './admin/update-role/update-role.component';
import { BoardService } from './services/board.service';
import { RoleService } from './services/role.service';
import { TokenInterceptorService } from './services/token-interceptor.service';
import { UserService } from './services/user.service';
import { AuthGuard } from "./guard/auth.guard";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    RegisterComponent,
    LoginComponent,
    SaveTaskComponent,
    ListTaskComponent,
    RegisterUserComponent,
    ListUserComponent,
    UpdateUserComponent,
    RegisterRoleComponent,
    ListRoleComponent,
    UpdateRoleComponent,
  ],
  imports: [BrowserModule, AppRoutingModule, BrowserAnimationsModule],
  providers: [BoardService, RoleService, TokenInterceptorService, UserService, AuthGuard],
  bootstrap: [AppComponent],
})
export class AppModule {}
