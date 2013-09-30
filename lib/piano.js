"use strict";

var monocle = require('monocle-js')
  , o_O = monocle.o_O
  , instrument = require('./instrument')
  , keyWidthPct = 0.12405
  , keyYPct = 0.41
  , octYPct = 0.1541
  , octWidthPct = 0.1089
  , lowerCXPct = 0.1349;

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

var Piano = function(driver, opts) {
  if (typeof opts === "undefined") {
    opts = {};
  }
  this.driver = driver;
  this.curOctave = 4;
  this.tempo = opts.tempo || 60;
};

Piano.prototype.tap = instrument.tap;

Piano.prototype.chooseFromMainMenu = o_O(function*() {
  yield this.driver.elementByXPath("//expandable/relative[1]").click();
  yield this.driver.sleep(1.5);
});

Piano.prototype.chooseOctave = o_O(function*(oct) {
  this.curOctave = oct;
  yield this.tap(getOctXPct(oct), octYPct);
});

Piano.prototype.playNote = o_O(function*(note) {
  yield this.tap(getKeyXPct(note), keyYPct);
});

Piano.prototype.playScore = instrument.playScore;

Piano.prototype.playScale = o_O(function*() {
  var score = 'c4 d8 e8 f8 g8 a8 b8 C4 b8 a8 g8 f8 e8 d8 c4';
  yield this.playScore(score);
});

Piano.prototype.playThirds = o_O(function*() {
  var score = 'c8 e8 d8 f8 e8 g8 f8 a8 g8 b8 a8 C8 b8 b8 C4 ' +
              'C8 a8 b8 g8 a8 f8 g8 e8 f8 d8 e8 c8 d8 d8 c4';
  yield this.playScore(score);
});

Piano.prototype.playJurassicPark = o_O(function*() {
  var intro = 'r2. C8 b8 ';
  var verse = 'C2. C8 b8 C2. C8 b8 C4.^ d8 d4. f8 f2. e8 c8 ' +
              'd4.v b8 g4^ e8 c8 d2. g8 c8 f4. e8 e4. d8 d2.v C8 b8 ';
  verse += verse;
  var chorus = 'C4 g4 f4 C8 b8 C4 g4 f4 C8 b8 b8 C4. g4 c4 bb2. C8 b8 ';
  chorus += chorus;
  var outro = 'C1';
  yield this.playScore(intro + verse + chorus + verse + outro);
});

module.exports = Piano;
