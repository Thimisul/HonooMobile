import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/_services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.page.html',
  styleUrls: ['./cadastro.page.scss'],
})
export class CadastroPage implements OnInit {

  model: any = {};

  constructor(private apiService: ApiService,
              public router: Router) { }

  ngOnInit() {
  }

  cadastro() {
    //this.model.action = 'cadastro';
    console.log(this.model)
    this.apiService.addUser(this.model).subscribe(response => {
      if (response.id != null) {
        console.log(response)
        alert("Cadastro Realizado com Sucesso")
        this.router.navigate(['/login']);
      }
   }, error => {
     console.error(error);
    });
  }
}
