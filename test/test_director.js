"use strict";

var yiewd = require('yiewd')
  , monocle = require('monocle-js')
  , o_O = monocle.o_O
  , ll = monocle.ll
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

var initPiano = o_O(function*() {
  var pianoDriver = yiewd.remote('localhost', 4723);
  var piano = new Piano(pianoDriver);
  yield pianoDriver.init(caps);
  yield piano.chooseFromMainMenu();
  yield sleep(0.6);
  yield piano.chooseOctave(4);
  yield sleep(0.5);
  return [pianoDriver, piano];
});

var initDrums = o_O(function*() {
  var drumsDriver = yiewd.remote('localhost', 4725);
  var drums = new Drums(drumsDriver);
  yield drumsDriver.init(caps);
  yield drums.chooseFromMainMenu();
  yield sleep(0.6);
  return [drumsDriver, drums];
});

run(function*() {
  var res = yield ll([initPiano, initDrums]);

  var director = new Director(96);
  director.addPart(res[1][1], drumScore);
  director.addPart(res[0][1], pianoScore);
  yield director.playScore();

  yield ll([res[0][0].quit, res[1][0].quit]);
});

