import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  
  model: any = {};
 
  constructor(
    private authService: AuthService
  ) {}
 
  ngOnInit() {
    this.authService.logout();
  }
 
  login() {
    this.model.action = 'login';
    this.authService.loginForm(this.model).subscribe(response => {
      console.log(response)
      if (response.token != null) {
        this.authService.setUser(response);
      }
   }, error => {
     console.error(error);
    });
  }

  logout(){
    this.authService.logout()
  }
}
