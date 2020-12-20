import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-loccart',
  templateUrl: './loccart.component.html',
  styleUrls: ['./loccart.component.scss'],
})
export class LoccartComponent implements OnInit {
@Input() show:any;
  constructor() { }

  ngOnInit() {}

}
