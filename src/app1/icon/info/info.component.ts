import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.scss'],
})
export class InfoComponent implements OnInit {
  @Input() title:any;
  @Input() content:any;
  showInfo:any = 0;
  constructor() { }

  ngOnInit() {}

}
