// Automated accompaniment to "When There Was Still Code to Write"
// by Jonathan Lipps
"use strict";

var yiewd = require('yiewd')
  , _ = require('underscore')
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
    [initPiano, process.env.PIANO1_PORT, 4],
    [initDrums, process.env.DRUMS1_PORT],
    [initDrums, process.env.DRUMS2_PORT],
    [initPiano, process.env.PIANO2_PORT, 2]
  ]);

  var piano1 = res[0][1];
  var drums1 = res[1][1];
  var drums2 = res[2][1];
  var piano2 = res[3][1];

  var songParts = [];
  _.each(scores.structure, function(part) {
    var director = new Director(tempo);
    director.addPart(piano1, scores.piano1[part]);
    director.addPart(piano2, scores.piano2[part]);
    director.addPart(drums1, scores.drums1[part]);
    director.addPart(drums2, scores.drums2[part]);
    songParts.push(director);
  });

  for (var i = 0; i < songParts.length; i++ ) {
    yield songParts[i].playScore();
  }

  yield sleep(5);

  yield ll([res[0][0].quit, res[1][0].quit, res[2][0].quit, res[3][0].quit]);
});
