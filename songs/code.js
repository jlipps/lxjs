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
  , lyrics = require('./code-lyrics')
  , Drums  = require('../lib/drums')
  , Writer = require('../lib/writer')
  , Piano = require('../lib/piano')
  , Director = require('../lib/director')
  , writerServer = require('../apps/writer/server')
  , writerPort = 8989
  , path = require('path')
  , tempo = 102;

var souveyCaps = {
  device: 'android',
  'app': path.resolve(__dirname, '..', 'apps', 'souvey.musical_4.0.5.apk'),
  'app-package': 'souvey.musical',
  'app-activity': 'souvey.musical.activities.MainMenu'
};

var writerCaps = {
  device: 'iphone simulator',
  app: 'safari',
  version: '6.1'
};

var initPiano = o_O(function*(port, octave) {
  var pianoDriver = yiewd.remote('localhost', port);
  var piano = new Piano(pianoDriver);
  yield pianoDriver.init(souveyCaps);
  yield piano.chooseFromMainMenu();
  yield piano.chooseOctave(octave);
  return [pianoDriver, piano];
});

var initDrums = o_O(function*(port) {
  var drumsDriver = yiewd.remote('localhost', port);
  var drums = new Drums(drumsDriver);
  yield drumsDriver.init(souveyCaps);
  yield drums.chooseFromMainMenu();
  return [drumsDriver, drums];
});

var initWriter = o_O(function*(port) {
  yield writerServer.start(writerPort);
  var writerPage = "http://localhost:" + writerPort;
  var writerDriver = yiewd.remote('localhost', port);
  yield writerDriver.init(writerCaps);
  yield writerDriver.get(writerPage);
  var box = yield writerDriver.elementById('box');
  var writer = new Writer(box, tempo, 4);
  return [writerDriver, writer];
});

run(function*() {
  var res = yield ll([
    [initPiano, process.env.PIANO1_PORT, 4],
    [initDrums, process.env.DRUMS1_PORT],
    [initDrums, process.env.DRUMS2_PORT],
    [initPiano, process.env.PIANO2_PORT, 2],
    [initWriter, process.env.LYRICS_PORT]
  ]);

  var piano1 = res[0][1];
  var drums1 = res[1][1];
  var drums2 = res[2][1];
  var piano2 = res[3][1];
  var writer = res[4][1];

  var songParts = [], lyricParts = [];
  _.each(scores.structure, function(part) {
    var director = new Director(tempo);
    director.addPart(piano1, scores.piano1[part]);
    director.addPart(piano2, scores.piano2[part]);
    director.addPart(drums1, scores.drums1[part]);
    director.addPart(drums2, scores.drums2[part]);
    songParts.push(director);
    lyricParts.push(lyrics[part]);
  });

  for (var i = 0; i < songParts.length; i++ ) {
    yield ll([
      songParts[i].playScore.bind(songParts[i]),
      [writer.writeSegment.bind(writer), lyricParts[i]]
    ]);
  }

  yield sleep(5);

  yield ll([res[0][0].quit, res[1][0].quit, res[2][0].quit, res[3][0].quit,
      res[4][0].quit, writerServer.stop]);
});
