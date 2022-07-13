import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-choose',
  templateUrl: './choose.page.html',
  styleUrls: ['./choose.page.scss'],
})
export class ChoosePage {

	choose:any = 0;
  constructor(private router: Router, private api: ApiService) { }

  // ngOnInit() {

  // }

  chooseRole(){
  	window.localStorage.setItem('user_type', this.choose);
    // switchRole: any;
    var data = {
      'role_id': this.choose
    };
    this.api.updateRole(data)
    .then( resp => {
        if(this.choose == 2){
            this.router.navigate(['/shopper/home']);
        }
        else if(this.choose == 3){
            this.router.navigate(['/dropper/home']);
        }
    })
    .catch( err => {

    });
  }

}
