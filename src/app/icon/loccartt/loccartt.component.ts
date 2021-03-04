import { Component, OnInit, Input } from '@angular/core';
import { ApiService } from '../../services/api.service';
import { MiscService } from '../../services/misc.service';
@Component({
  selector: 'app-loccartt',
  templateUrl: './loccartt.component.html',
  styleUrls: ['./loccartt.component.scss'],
})
export class LoccarttComponent implements OnInit {
@Input() show:any;
@Input() address:any;
userDets:any = "";
  ProdImgUrl:any = "http://admin.favr.ie/uploads/";
  constructor(private api:ApiService, private misc:MiscService) { }

  ionViewDidEnter() {
    console.log('loccartt updated on enter');
    this.userDets = this.misc.getUserDets();
  }
  ngOnInit() {
    console.log('loccartt updated');
    this.userDets = this.misc.getUserDets();
  }
  getUserDetails(){
    console.log('getDets');
    this.userDets = this.misc.getUserDets();
  // 	this.api.getUserDetails()
  //     .then(resp => {
  //       this.userDets = resp;
  //     })
  //     .catch(err => {

  //     });
  }
}