// Automated accompaniment to "When There Was Still Code to Write"
// by Jonathan Lipps
"use strict";

var yiewd = require('yiewd')
  , monocle = require('monocle-js')
  , o_O = monocle.o_O
  , ll = monocle.ll
  , run = monocle.run
  , sleep = monocle.utils.sleep
  , scores = require('./code-scores')
  , Drums  = require('../lib/drums')
  , Piano = require('../lib/piano')
  , Director = require('../lib/director')
  , path = require('path')
  , caps = {
      device: 'android',
      'app': path.resolve(__dirname, '..', 'apps', 'souvey.musical_4.0.5.apk'),
      'app-package': 'souvey.musical',
      'app-activity': 'souvey.musical.activities.MainMenu'
    }
  , tempo = 102;


var initPiano = o_O(function*(port, octave) {
  var pianoDriver = yiewd.remote('localhost', port);
  var piano = new Piano(pianoDriver);
  yield pianoDriver.init(caps);
  yield piano.chooseFromMainMenu();
  yield piano.chooseOctave(octave);
  return [pianoDriver, piano];
});

var initDrums = o_O(function*(port) {
  var drumsDriver = yiewd.remote('localhost', port);
  var drums = new Drums(drumsDriver);
  yield drumsDriver.init(caps);
  yield drums.chooseFromMainMenu();
  return [drumsDriver, drums];
});

run(function*() {
  var res = yield ll([
    [initPiano, 4723, 4],
    [initDrums, 4725],
    [initDrums, 4726],
    [initPiano, 4727, 2]
  ]);

  var piano1 = res[0][1];
  var drums1 = res[1][1];
  var drums2 = res[2][1];
  var piano2 = res[3][1];

  var director = new Director(tempo);
  director.addPart(piano1, scores.piano1);
  director.addPart(piano2, scores.piano2);
  director.addPart(drums1, scores.drums1);
  director.addPart(drums2, scores.drums2);
  yield director.playScore();

  yield ll([res[0][0].quit, res[1][0].quit, res[2][0].quit, res[3][0].quitj]);
});
