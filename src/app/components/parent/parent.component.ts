import { Component, OnInit } from '@angular/core';
import { Message } from 'src/app/interfaces/message';
import { ServiceService } from 'src/app/services/service.service';
import { ObservableService } from '../../services/observable.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html',
  styleUrls: ['./parent.component.css']
})
export class ParentComponent implements OnInit {

  messageInput: Message;
  message: Message;
  type: string;
  activeEmit: string;
  isActive: boolean;

  constructor(
    private observableService: ObservableService,
    private serviceService: ServiceService
  ) {
    this.message = { message: '' };
    this.type = '';
    this.activeEmit = '';
    this.isActive = true;
    this.messageInput = { message: '' };
  }

  ngOnInit(): void { }

  ngDoCheck() {
    if (this.activeEmit === 'serviceChild' && this.isActive) {
      this.message = this.serviceService.getMessage()
    } else if (this.activeEmit === 'observableChild' && this.isActive) {
      this.observableService.messageChild.subscribe((message: any) => { this.message = message })
      console.log(1, this.message)
    }
    this.isActive = true;
  }

  addServiceMessage() {
    this.message = { message: '' }
    this.type = 'serviceParent';
    this.serviceService.insertMessage({ message: 'mensaje desde el padre al hijo servicio' })
    this.isActive = false
  }

  addObservableMessage() {
    this.type = 'observableParent';
    this.observableService.emitMessage({ message: 'mensaje desde el padre al hijo obserbable' })
    console.log('parent')
    this.isActive = false

  }

  addInputMessage() {
    this.message = { message: '' }
    this.type = 'inputParent';
    this.messageInput = { message: 'mensaje desde el padre al hijo Input' }
    this.isActive = false
  }

  onMessageEmit($event: any) {
    if (this.activeEmit = 'outputChild') {
      this.message = $event
    }
  }

  onActiveEmit($event: any) {
    this.activeEmit = $event;
  }

}
