import { BrowserModule } from '@angular/platform-browser';
import { ApplicationRef, ComponentRef, DoBootstrap, NgModule, NgZone } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: []
})
export class AppModule implements DoBootstrap{

  constructor(private ngZone: NgZone){}

  ngDoBootstrap(appRef: ApplicationRef): void {

    const zone = this.ngZone;
    let rootRef : ComponentRef<AppComponent>;
    
    window['startApp'] = () => {
      zone.run(() => {
        rootRef = appRef.bootstrap(AppComponent)
      })
    }

    window['killApp'] = () => {
      if(rootRef){
        zone.run(() => {
          rootRef.destroy();
          rootRef = null;
        })
      }
    }

  } 
}