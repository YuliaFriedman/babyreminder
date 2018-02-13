/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
  index: 0,
  // Application Constructor
  initialize: function () {
    document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
  },

  // deviceready Event Handler
  //
  // Bind any cordova events here. Common events are:
  // 'pause', 'resume', etc.
  onDeviceReady: function () {
    //this.receivedEvent('deviceready');

    document.getElementById("setTimerButton").onclick = function (event) {
      if (!window.wakeuptimer) {
        alert("timer is undefined");
        return;
      }

      var now = new Date();

      var onceAlarm = {
        type: 'onetime',
        extra: {id: 'once'},
        time: {hour: now.getHours(), minute: now.getMinutes() + 2}
      };

      var dailyAlarm = {
        type: 'daylist',
        extra: {id: 'daily'},
        days: ["wednesday"],
        time: {hour: now.getHours(), minute: now.getMinutes() + 3}
      };

      var alarms = [onceAlarm, dailyAlarm];

      console.log("alarms: " , alarms);

      window.wakeuptimer.wakeup( function (result) {
          if (result.type === 'wakeup') {
            console.log('wakeup alarm detected--' + result.extra);
          } else if (result.type === 'set') {
            console.log('wakeup alarm set--' + result);
          } else {
            console.log('wakeup unhandled type (' + result.type + ')');
          }
        },
        function (error) {
          console.log("error");
        },
        // a list of alarms to set
        {
          alarms : alarms
        }
      );

      //
      // window.wakeuptimer.wakeup(
      //   function (result) {
      //     if (result.type === 'wakeup') {
      //       console.log('wakeup alarm detected--' + result.extra);
      //     } else if (result.type === 'set') {
      //       console.log('wakeup alarm set--' + result);
      //     } else {
      //       console.log('wakeup unhandled type (' + result.type + ')');
      //     }
      //   },
      //   function (error) {
      //     console.log("error");
      //   },
      //   {
      //     alarms: alarms
      //   });

    };

    //this.initBackgroundMode();
    //this.startBackgroundJob();
  },

  initBackgroundMode: function () {
    cordova.plugins.backgroundMode.on('activate', function () {
      cordova.plugins.backgroundMode.disableWebViewOptimizations();
    });
    cordova.plugins.backgroundMode.overrideBackButton();
    this.enableBackground();
  },

  enableBackground: function () {
    cordova.plugins.backgroundMode.enable();
  },

  disableBackground: function () {
    cordova.plugins.backgroundMode.disable();
  },

  startBackgroundJob: function () {
    setInterval(function () {
      $('#background_log').append("<div>" + this.index + "</div>");
      this.index++;
      if (this.index % 10 == 0) {
        this.openAppFromBackground();
      }
    }.bind(this), 2000);

  },

  openAppFromBackground: function () {
    cordova.plugins.backgroundMode.moveToForeground();
    //this.enableBackground();
    //window.plugins.bringtofront();
    alert("in front");
  }

  // // Update DOM on a Received Event
  // receivedEvent: function(id) {
  //     var parentElement = document.getElementById(id);
  //     var listeningElement = parentElement.querySelector('.listening');
  //     var receivedElement = parentElement.querySelector('.received');
  //
  //     listeningElement.setAttribute('style', 'display:none;');
  //     receivedElement.setAttribute('style', 'display:block;');
  //
  //     console.log('Received Event: ' + id);
  // }
};

app.initialize();
