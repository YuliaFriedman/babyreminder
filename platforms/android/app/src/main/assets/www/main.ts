declare var cordova;
declare var device;

import 'zone.js/dist/zone.js';
import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

if(environment.production){

  (function () {
    'use strict';

    window.addEventListener = function () {
      EventTarget.prototype.addEventListener.apply(this, arguments);
    };

    window.removeEventListener = function () {
      EventTarget.prototype.removeEventListener.apply(this, arguments);
    };

    document.addEventListener = function () {
      EventTarget.prototype.addEventListener.apply(this, arguments);
    };

    document.removeEventListener = function () {
      EventTarget.prototype.removeEventListener.apply(this, arguments);
    };
  })();

  document.addEventListener("deviceready", onDeviceReady, false);

}
else{
  onDeviceReady();
}

function onDeviceReady() {
  platformBrowserDynamic().bootstrapModule(AppModule)
    .catch(err => console.log(err));
}
