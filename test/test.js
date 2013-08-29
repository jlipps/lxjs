"use strict";

var yiewd = require('yiewd')
  , monocle = require('monocle.js')
  , o_O = monocle.o_O
  , o_C = monocle.o_C
  , path = require('path')
  , keyWidthPct = 0.12405
  , keyYPct = 0.41
  , octYPct = 0.1541
  , octWidthPct = 0.1089
  , lowerCXPct = 0.1349
  , curOctave = 4
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
  , 'C': 15
  , 'C#': 16
  , 'Db2': 16
};

var noteDurations = {
  4: 1
  , 2: 2
  , 1: 4
  , 8: 0.5
  , 16: 0.25
};

var getOctXPct = function(oct) {
  return lowerCXPct + (octWidthPct * (oct - 1)) + (octWidthPct / 2);
};

var getKeyXPct = function(key) {
  if (typeof key !== 'number') {
    key = keys[key];
  }
  var x = (keyWidthPct / 2) * (key - 1) + (keyWidthPct / 2) + 0.005;
  return x;
};

var driver = yiewd.remote('localhost', 4723);
var sleepTimes = 0;
var sleep = o_O(function*(ms) {
  var cb = o_C();
  var outerCb = function() {
    cb();
  };
  var timer = setTimeout(outerCb, ms);
  yield cb;
});

var tap = o_O(function*(x, y) {
  yield driver.execute("mobile: tap", [{x: x, y: y}]);
});

var choosePianoFromMain = o_O(function*() {
  var piano = yield driver.elementByXPath("//expandable/relative[1]");
  yield piano.click();
  yield driver.sleep(0.5);
});

var chooseOctave = o_O(function*(oct) {
  curOctave = oct;
  yield tap(getOctXPct(oct), octYPct);
});

var play = o_O(function*(score) {
  var notes = score.trim().split(" ");
  var re = /^([^\d]+)(\d+)(\.)?(v|\^)?$/;
  var fullNote, match, key, dur, beatDur, noteDur, start, desiredEnd, end,
    shift, half;
  for (var i = 0; i < notes.length; i++ ) {
    fullNote = notes[i];
    match = re.exec(fullNote);
    if (!match) {
      throw new Error("Couldn't parse note data from " + fullNote);
    }
    console.log(match);
    key = match[1];
    dur = match[2];
    half = (match[3] === ".") ? 1.5 : 1;
    shift = match[4];
    beatDur = 60 / tempo;
    noteDur = beatDur * (noteDurations[dur] * half);
    start = Date.now();
    desiredEnd = start + (noteDur * 1000);
    if (key !== 'r') {
      console.log("about to tap " + fullNote);
      yield tap(getKeyXPct(key), keyYPct);
      if (shift) {
        if (shift === 'v' && curOctave > 1) {
          console.log('moving down an octave');
          chooseOctave(curOctave - 1);
        } else if (shift === '^' && curOctave < 8) {
          console.log('moving up an octave');
          chooseOctave(curOctave + 1);
        }
      }
    }
    end = Date.now();
    if (desiredEnd > end) {
      console.log("sleeping for " + Math.floor(desiredEnd - end) + " ms");
      yield sleep(Math.floor(desiredEnd - end));
    } else {
      console.log("no time!");
    }
  }
});

var playScale = o_O(function*() {
  var score = 'c4 d8 e8 f8 g8 a8 b8 C4 b8 a8 g8 f8 e8 d8 c4';
  yield play(score);
});

var playThirds = o_O(function*() {
  var score = 'c8 e8 d8 f8 e8 g8 f8 a8 g8 b8 a8 C8 b8 b8 C4 ' +
              'C8 a8 b8 g8 a8 f8 g8 e8 f8 d8 e8 c8 d8 d8 c4';
  yield play(score);
});

var jurassicPark = o_O(function*() {
  var intro = 'r2. C8 b8 ';
  var verse = 'C2. C8 b8 C2. C8 b8 C4.^ d8 d4. f8 f2. e8 c8 ' +
              'd4.v b8 g4^ e8 c8 d2. g8 c8 f4. e8 e4. d8 d2.v C8 b8 ';
  verse += verse;
  var chorus = 'C4 g4 f4 C8 b8 C4 g4 f4 C8 b8 b8 C4. g4 c4 bb2. C8 b8 ';
  chorus += chorus;
  var outro = 'C1';
  yield play(intro + verse + chorus + verse + outro);
});

driver.run(function*() {
  yield this.init({
    device: 'android',
    'app': path.resolve(__dirname, '..', 'apps', 'souvey.musical_4.0.5.apk'),
    'app-package': 'souvey.musical',
    'app-activity': 'souvey.musical.activities.MainMenu'
  });
  tempo = 96;
  yield choosePianoFromMain();
  yield sleep(1000);
  yield chooseOctave(4);
  yield sleep(600);
  yield jurassicPark();
  yield this.quit();
});
