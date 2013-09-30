"use strict";

var yiewd = require('yiewd')
  , monocle = require('monocle-js')
  , sleep = monocle.utils.sleep
  , Drums  = require('../lib/drums')
  , path = require('path');

var driver = yiewd.remote('localhost', 4723);
driver.run(function*() {
  yield this.init({
    device: 'android',
    'app': path.resolve(__dirname, '..', 'apps', 'souvey.musical_4.0.5.apk'),
    'app-package': 'souvey.musical',
    'app-activity': 'souvey.musical.activities.MainMenu'
  });
  var drums = new Drums(this, {tempo: 96});
  yield drums.chooseFromMainMenu();
  yield sleep(0.6);
  yield drums.playBeat();
  yield this.quit();
});

