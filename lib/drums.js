"use strict";

var monocle = require('monocle-js')
  , o_O = monocle.o_O
  , instrument = require('./instrument')
  , topDrumsYPct = 0.23
  , botDrumsYPCt = 0.7
  , drum1XPct = 0.12
  , drum2XPct = 0.38
  , drum3XPct = 0.63
  , drum4XPct = 0.88;

var drums = {
  'c': [drum1XPct, topDrumsYPct]
  , 'tb': [drum2XPct, topDrumsYPct]
  , 'tc': [drum3XPct, topDrumsYPct]
  , 'r': [drum4XPct, topDrumsYPct]
  , 'h': [drum1XPct, botDrumsYPCt]
  , 's': [drum2XPct, botDrumsYPCt]
  , 'k': [drum3XPct, botDrumsYPCt]
  , 'ta': [drum4XPct, botDrumsYPCt]
};

var Drums = function(driver, opts) {
  this.driver = driver;
  this.tempo = opts.tempo || 60;
};

Drums.prototype.tap = instrument.tap;

Drums.prototype.chooseFromMainMenu = o_O(function*() {
  yield this.driver.elementByXPath("//expandable/relative[3]").click();
  yield this.driver.sleep(1.5);
});

Drums.prototype.playNote = o_O(function*(note) {
  var xy = drums[note];
  yield this.tap(xy[0], xy[1]);
});

Drums.prototype.playScore = instrument.playScore;

Drums.prototype.playScale = o_O(function*() {
  var score = 'c8 c8 c8 c8 tb8 tb8 tb8 tb8 tc8 tc8 tc8 tc8 r8 r8 r8 r8 ' +
              'h8 h8 h8 h8 s8 s8 s8 s8 k8 k8 k8 k8 ta8 ta8 ta8 ta8';
  yield this.playScore(score);
});

Drums.prototype.playBeat = o_O(function*() {
  var base = 'k8 k8 s8 k8 ';
  var off = 'k8 k8 s8 h8 ';
  var score = base + base + base + off;
  score = score + score;
  yield this.playScore(score);
});

module.exports = Drums;
