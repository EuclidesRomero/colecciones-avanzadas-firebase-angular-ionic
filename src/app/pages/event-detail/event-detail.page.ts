import { ActivatedRoute } from '@angular/router';
import { EventService } from './../../services/event/event.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-event-detail',
  templateUrl: './event-detail.page.html',
  styleUrls: ['./event-detail.page.scss'],
})
export class EventDetailPage implements OnInit {
  currenEvent: any = {};
  eventId: any;

  constructor(private eventService: EventService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.eventId = this.route.snapshot.paramMap.get('id');
    this.eventInfo();
  }
  async eventInfo() {
    this.currenEvent = await (
      await this.eventService.getEventDetail(this.eventId)
    ).data();
  }

}
