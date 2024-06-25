import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, collectionData, runTransaction } from '@angular/fire/firestore';
import { doc, getDoc } from '@angular/fire/firestore';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private eventListRef: any;

  constructor(public firestore: Firestore, private authService: AuthService) { }

  private initEventListRef() {
    let user = this.authService.currentUser();
    this.eventListRef = collection(this.firestore, `userProfile/${user?.uid}/eventList`);
  }


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

  async addGuest(guestName: string, eventId: string, eventPrice: number): Promise<void> {
    
    if (!this.eventListRef) {
      this.initEventListRef();
    }
    if (!this.eventListRef) {
      console.error('Error: eventListRef no está definido.');
        return;
    }
    const eventDocRef = doc(this.eventListRef, eventId);
    const guestListRef = collection(eventDocRef, 'guestlist');

    try {
      console.log('Añadiendo nuevo invitado:', guestName);
      const newGuest = await addDoc(guestListRef, { guestName });
      await runTransaction(this.firestore, async (transaction) => {
          const eventDocSnapshot = await transaction.get(eventDocRef);

          if (eventDocSnapshot.exists() && eventDocSnapshot.data()?.['revenue'] !== undefined) {
              const currentData = eventDocSnapshot.data()!;
              const currentRevenue = eventDocSnapshot.data()!['revenue'];
              const newRevenue = currentRevenue + eventPrice;

              transaction.update(eventDocRef, {
                  revenue: newRevenue,
                  ['totalPaidGuests']: (currentData['totalPaidGuests'] || 0) + 1
              });
            console.log('Transacción completada. Nuevo revenue:', newRevenue);
          } else {
              console.error('Error: Document does not exist or "revenue" is undefined.');
          }
      });
  } catch (error) {
      console.error('Error al agregar invitado:', error);
  }
  }

  getGuestList(eventId:string) {
    let user = this.authService.currentUser();
    const placeRef = collection(this.firestore, `userProfile/${user?.uid}/eventList/${eventId}/guestlist`); return collectionData(placeRef, { idField: 'id' });
}
}
