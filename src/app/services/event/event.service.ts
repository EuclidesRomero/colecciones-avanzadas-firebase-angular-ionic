import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData } from '@angular/fire/firestore';
import { doc, getDoc } from '@angular/fire/firestore';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class EventService {

  constructor(public firestore: Firestore, private authService: AuthService) { }


  async createEvent(
    eventName: string,
    eventPrice: number,
    eventCost: number,
    eventDate: string
    ) {
    let user = await this.authService.currentUser();
    const placeRef = collection(this.firestore, `userProfile/${user?.uid}/eventList`);
    return addDoc(placeRef, {
      name: eventName,
      date: eventDate,
      price: eventPrice * 1,
      cost: eventCost * 1,
      revenue: eventCost * -1,
    });
  }


  getEventList() {
    let user = this.authService.currentUser();
    const placeRef = collection(this.firestore,`userProfile/${user?.uid}/eventList`);
    return collectionData(placeRef, {idField: 'id'});
  }

  getEventDetail(eventId: string) {
    let user = this.authService.currentUser();
    const placeDocRef = doc(this.firestore,`userProfile/${user?.uid}/eventList/${eventId}`);
    return getDoc(placeDocRef)
  }
}
