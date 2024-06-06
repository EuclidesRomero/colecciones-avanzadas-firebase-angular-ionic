import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { ReactiveFormsModule } from '@angular/forms';
import { getAuth, provideAuth } from '@angular/fire/auth';


@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule,ReactiveFormsModule ],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, provideFirebaseApp(() => initializeApp({"projectId":"colecciones-avanzadas","appId":"1:720488396434:web:f8e5cd4695703fb9bd184b","storageBucket":"colecciones-avanzadas.appspot.com","apiKey":"AIzaSyAGWQn2e0_HUBnkb2MPC9pOe_43_hSVfrM","authDomain":"colecciones-avanzadas.firebaseapp.com","messagingSenderId":"720488396434"})), provideFirestore(() => getFirestore()), provideAuth(()=> getAuth())],
  bootstrap: [AppComponent],
})
export class AppModule {}
