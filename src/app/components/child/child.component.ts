import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { Message } from 'src/app/interfaces/message';
import { ObservableService } from '../../services/observable.service';
import { ServiceService } from '../../services/service.service';
import { ObservableChildService } from '../../services/observable-child.service';

@Component({
  selector: 'app-child',
  templateUrl: './child.component.html',
  styleUrls: ['./child.component.css']
})
export class ChildComponent implements OnInit {
  @Input() messageInput: Message;
  message: Message;
  @Output() messageEmit: EventEmitter<Message>
  @Output() activeEmit: EventEmitter<string>
  @Input() type: string;
  isActive: boolean;

  constructor(
    private observableServiceChild: ObservableChildService,
    private serviceService: ServiceService,
    private observableService: ObservableService
  ) {
    this.message = { message: '' }
    this.messageEmit = new EventEmitter()
    this.activeEmit = new EventEmitter()
    this.messageInput = { message: '' }
    this.type = '';
    this.isActive = true;
  }

  ngOnInit(): void { }

  ngDoCheck() {
    if (this.type === 'serviceParent' && this.isActive) {
      this.message = this.serviceService.getMessage()
    } else if (this.type === 'observableParent' && this.isActive) {
      this.observableService.messageParent.subscribe((message: any) => { this.message = message })
    } else if (this.type === 'inputParent') {
      this.message = this.messageInput
    }
    this.isActive = true;
  }

  addServiceMessage() {
    this.message = { message: '' }
    this.activeEmit.emit('serviceChild')
    this.serviceService.insertMessage({ message: ' Child using Service' })
    this.isActive = false;
  }

  addObservableMessage() {
    this.activeEmit.emit('observableChild')
    this.observableService.emitMessage({ message: '' })
    this.observableServiceChild.emitMessage({ message: ' Child using Subject' })
    this.isActive = false;
  }

  addOutputMessage() {
    this.messageInput = { message: '' }
    this.message = { message: '' }
    this.activeEmit.emit('outputChild')
    let message = { message: ' Child using output property' }
    this.messageEmit.emit(message)
    this.isActive = false;
  }

}
