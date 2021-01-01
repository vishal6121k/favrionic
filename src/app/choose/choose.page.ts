import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-choose',
  templateUrl: './choose.page.html',
  styleUrls: ['./choose.page.scss'],
})
export class ChoosePage implements OnInit {

	choose:any = 0;
  constructor(private router: Router, private api: ApiService) { }

  ngOnInit() {

  }

  chooseRole(){
  	window.localStorage.setItem('user_type', this.choose);
    // switchRole: any;
    this.api.switchRole()
    .then( resp => {
        if(this.choose == 2){
            this.router.navigate(['/shopper']);
        }
        else if(this.choose == 3){
            this.router.navigate(['/dropper']);
        }
    })
    .catch( err => {

    });
  }

}
