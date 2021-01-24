import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-loccartt',
  templateUrl: './loccartt.component.html',
  styleUrls: ['./loccartt.component.scss'],
})
export class LoccarttComponent implements OnInit {
@Input() show:any;
@Input() address:any;
  constructor() { }

  ngOnInit() {}

}
