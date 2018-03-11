import { Subscription } from 'rxjs/Subscription';
import { Component, OnDestroy } from '@angular/core';
import { MessageService } from './shared/services/index';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnDestroy  {
  ngOnDestroy(): void {
this.subscription.unsubscribe();
  }
 // title = 'app';
 message: any;
 subscription: Subscription;

 constructor(private messageService: MessageService) {
     // subscribe to home component messages
  //  this.subscription = this.messageService.getMessage().subscribe(message => { this.message = message;console.log(message) });
    // console.log('receving'+this.message);
     
   }

}