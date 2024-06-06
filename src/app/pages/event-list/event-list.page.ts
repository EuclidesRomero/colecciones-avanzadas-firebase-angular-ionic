import { Component, OnInit } from '@angular/core';
import { EventService } from 'src/app/services/event/event.service';

@Component({
  selector: 'app-event-list',
  templateUrl: './event-list.page.html',
  styleUrls: ['./event-list.page.scss'],
})
export class EventListPage implements OnInit {
  eventList: any = [];

  constructor(private eventService : EventService) { }

  ngOnInit() {
    console.log(typeof this.eventList);
    this.eventService.getEventList().subscribe((events) => {
      this.eventList = events;
    });
  }

}
