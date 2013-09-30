"use strict";

var yiewd = require('yiewd')
  , monocle = require('monocle-js')
  , run = monocle.run
  , sleep = monocle.utils.sleep
  , Drums  = require('../lib/drums')
  , Piano = require('../lib/piano')
  , Director = require('../lib/director')
  , path = require('path')
  , caps = {
      device: 'android',
      'app': path.resolve(__dirname, '..', 'apps', 'souvey.musical_4.0.5.apk'),
      'app-package': 'souvey.musical',
      'app-activity': 'souvey.musical.activities.MainMenu'
    };

var drumScore = (function() {
  var base = 'k8 k8 s8 k8 ';
  var off = 'k8 k8 s8 h8 ';
  var score = base + base + base + off;
  return score + score + 'k8';
})();

var pianoScore = 'c4 d8 e8 f8 g8 a8 b8 C4 b8 a8 g8 f8 e8 d8 ';
pianoScore = pianoScore + pianoScore + 'c4';

run(function*() {
  var pianoDriver = yiewd.remote('localhost', 4723);
  var drumsDriver = yiewd.remote('localhost', 4725);
  yield pianoDriver.init(caps);
  yield drumsDriver.init(caps);
  var drums = new Drums(drumsDriver);
  var piano = new Piano(pianoDriver);
  yield drums.chooseFromMainMenu();
  yield sleep(0.6);
  yield piano.chooseFromMainMenu();
  yield sleep(0.6);
  yield piano.chooseOctave(4);
  yield sleep(0.5);

  var director = new Director(96);
  director.addPart(drums, drumScore);
  director.addPart(piano, pianoScore);
  yield director.playScore();

  yield pianoDriver.quit();
  yield drumsDriver.quit();
});

