"use strict";

var yiewd = require('yiewd')
  , monocle = require('monocle-js')
  , sleep = monocle.utils.sleep
  , Piano  = require('../lib/piano')
  , path = require('path');

var driver = yiewd.remote('localhost', 4723);
driver.run(function*() {
  yield this.init({
    device: 'android',
    'app': path.resolve(__dirname, '..', 'apps', 'souvey.musical_4.0.5.apk'),
    'app-package': 'souvey.musical',
    'app-activity': 'souvey.musical.activities.MainMenu'
  });
  var piano = new Piano(this, {tempo: 96});
  yield piano.chooseFromMainMenu();
  yield piano.chooseOctave(4);
  yield sleep(0.6);
  yield piano.playScale();
  yield this.quit();
});
