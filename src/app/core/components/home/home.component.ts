import { Component } from '@angular/core';
import { MessageService } from '../../../shared/services/index';



@Component({
    moduleId: module.id,
    templateUrl: 'home.component.html'
})

export class HomeComponent {
    constructor(private messageService: MessageService) {}
    
    sendMessage(): void {
        // send message to subscribers via observable subject
        console.log('send:');
        this.messageService.sendMessage('hy waqas');
    }

    clearMessage(): void {
        // clear message
        this.messageService.clearMessage();
    }
}