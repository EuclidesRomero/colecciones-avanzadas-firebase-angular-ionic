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
  public guestName = '';
  currentGuest: any[] = [];
  guestList: any[] = [];
    totalPaidGuests: number = 0;


  isEventInfoLoaded: boolean = false;

  constructor(private eventService: EventService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.eventId = this.route.snapshot.paramMap.get('id');
    this.eventInfo();
    const eventId = this.eventId;
    this.route.paramMap.subscribe(params => {
      this.eventId = params.get('id');
      if (this.eventId) {
        this.loadGuestList();
        this.loadTotalPaidGuests();
      }
    });
    
  }

  async loadTotalPaidGuests() {
    try {
      const eventDetail = await this.eventService.getEventDetail(this.eventId);
      const eventData = eventDetail.data();
      if (eventData && eventData['totalPaidGuests'] !== undefined) {
        this.totalPaidGuests = eventData['totalPaidGuests'];
      } else {
        this.totalPaidGuests = 0; 
      }
    } catch (error) {
      console.error('Error al cargar el total de invitados pagados:', error);
      this.totalPaidGuests = 0; 
    }
  }
  

  private loadGuestList() {
    this.eventService.getGuestList(this.eventId!).subscribe(
      (guestList) => {
        this.guestList = guestList;
        this.isEventInfoLoaded = true;
        console.log('Guest List:', this.guestList);
      },
      (error) => {
        console.error('Error fetching guest list:', error);
        this.isEventInfoLoaded = true;
      }
    );
  }

  async eventInfo() {
    try {
      this.currenEvent = await (
        await this.eventService.getEventDetail(this.eventId)
      ).data();
      this.isEventInfoLoaded = true;
    } catch (error) {
      console.error('Error al cargar la información del evento:', error);
    }
  }

  getGuests() {
    this.eventService.getGuestList(this.eventId).subscribe((guest) => {
      this.currentGuest = guest;
    });
  }

  addGuest(guestName: string) {
    if (this.isEventInfoLoaded && this.eventId) {
      console.log(this.currenEvent);
      
      this.eventService
        .addGuest(
          guestName, 
          this.eventId, 
          this.currenEvent.price
        )
        .then(() => { 
          this.guestName = '';
          this.getGuests();
        })
        .catch(error => {
          console.error('Error al agregar el invitado:', error);
        });
    } else {
      console.error('Error: currenEvent o eventId no está definido.');
    }
  }
}
