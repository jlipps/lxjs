"use strict";

var yiewd = require('/Users/jlipps/Code/yiewd/lib/yiewd.js')
    , path = require('path')
    , keyWidthPct = 0.12405
    , keyYPct = 0.41
    , octYPct = 0.1541
    , octWidthPct = 0.1089
    , lowerCXPct = 0.1349
    , tempo = 120;

var keys = {
  'c': 1
  , 'c#': 2
  , 'db': 2
  , 'd': 3
  , 'd#': 4
  , 'eb': 4
  , 'e': 5
  , 'f': 7
  , 'f#': 8
  , 'gb': 8
  , 'g': 9
  , 'g#': 10
  , 'ab': 10
  , 'a': 11
  , 'a#': 12
  , 'bb': 12
  , 'b': 13
  , 'c2': 15
  , 'c#2': 16
  , 'db2': 16
};

var getOctXPct = function(oct) {
  return lowerCXPct + (octWidthPct * (oct - 1)) + (octWidthPct / 2);
};

var tap = function(d, x, y) {
  d.run(function*() {
    yield d.execute("mobile: tap", [{x: x, y: y}]);
  });
};

var getKeyXPct = function(key) {
  if (typeof key !== 'number') {
    key = keys[key];
  }
  var x = (keyWidthPct / 2) * (key - 1) + (keyWidthPct / 2) + 0.005;
  console.log("Key '" + key + "' is at " + x + "%");
  return x;
};

yiewd.remote('localhost', 4723, function*(d) {
  var play = function(key, dur, cb) {
    d.run(function*() {
      var beatDur = 60 / tempo;
      var latency = 0.05;
      var noteMap = {
        4: 1
        , 2: 2
        , 1: 4
        , 8: 0.5
        , 16: 0.25
      };
      var noteDur = beatDur * noteMap[dur] - latency;
      yield d.execute("mobile: tap", [{x: getKeyXPct('c'), y: keyYPct}]);
      yield d.sleep(noteDur);
      cb();
    });
  };
  yield d.init({
    device: 'android',
    'app': path.resolve(__dirname, '..', 'apps', 'souvey.musical_4.0.5.apk'),
    'app-package': 'souvey.musical',
    'app-activity': 'souvey.musical.activities.MainMenu'
  });
  var piano = yield d.elementByXPath("//expandable/relative[1]");
  yield piano.click();
  yield d.sleep(2);
  yield d.execute("mobile: tap", [{x: getOctXPct(4), y: octYPct}]);
  yield d.sleep(1);
  play('c', 4, function() {
    play('c', 4, function() {
      play('c', 4, function() {
      });
    });
  });
  //yield d.quit();
});
