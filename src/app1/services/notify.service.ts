import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class NotifyService {

  constructor(private router: Router) {}

  notify(data){
  	var notifyData = JSON.parse(data.notification);
  	var msgData = JSON.parse(data.message);
  	document.getElementById("innoteTitle").innerHTML = notifyData.title;
  	document.getElementById("innoteContent").innerHTML = notifyData.body;
  	document.getElementById('intNotify').classList.add('active');
  	document.getElementById('intNotePrimLink').addEventListener("click", () =>{
  		console.log('clicked'+msgData.action_url);
  		document.getElementById('intNotify').classList.remove('active');
  		this.router.navigate(['/'+msgData.action_url]);
  	});
  	document.getElementById('intNoteEndLink').addEventListener("click", () =>{
  		document.getElementById('intNotify').classList.remove('active');
  	});
  	
  }

}
