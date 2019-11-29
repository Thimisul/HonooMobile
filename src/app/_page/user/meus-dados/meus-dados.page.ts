import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/_services/api.service';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-meus-dados',
  templateUrl: './meus-dados.page.html',
  styleUrls: ['./meus-dados.page.scss'],
})
export class MeusDadosPage implements OnInit {

  router: any;

  constructor(public Apiservice: ApiService,
              public authService: AuthService) { }

  isDisabled = true;
  model: any = {};

  ngOnInit() {
    this.getUser()
  }

  getUser(){ 
    this.Apiservice.getUser().subscribe(response => {
        this.model = response
        console.log(response)
        
    })
  }

  updateUser(){
    this.model.action = 'update';
    this.Apiservice.updateUser(this.model).subscribe(response => {
      console.log(response)
      alert(response.username + " Atualizado!" + JSON.stringify(response))
      
   }, error => {
     console.error(error);
    });
  }

  deleteUser(){
    this.Apiservice.deleteUser().subscribe(response => {
      alert(" Deletado!" + JSON.stringify(response));
      this.authService.logout();
      
    })
  }

  logout(){
    this.authService.logout()
  }
}