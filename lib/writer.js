"use strict";

var monocle = require('monocle-js')
  , o_O = monocle.o_O
  , sleep = monocle.utils.sleep;

var Writer = function(textEl, tempo, beatsPerMeasure) {
  this.tempo = tempo || 60;
  this.segments = [];
  this.textEl = textEl;
  this.beatsPerMeasure = beatsPerMeasure;
};

Writer.prototype.writeSegment = o_O(function*(segment) {
  var lyric
    , bars
    , start
    , desiredEnd
    , desiredDur
    , desiredDurPerWord
    , actualEnd
    , words
    , i
    , j
    , beatDur = 60 / this.tempo;

  for (i = 0; i < segment.length; i++) {
    start = Date.now();
    lyric = segment[i][1];
    bars = segment[i][0];
    console.log([lyric, bars]);
    desiredDur = 1000 * beatDur * this.beatsPerMeasure * bars;
    desiredEnd = start + desiredDur;
    if (lyric) {
      words = lyric.split(" ");
      desiredDurPerWord = desiredDur / words.length;
      for (j = 0; j < words.length; j++) {
        yield this.textEl.sendKeys(words[j] + (j < words.length - 1 ? " " : ""));
        if (j < words.length - 1) {
          yield sleep(desiredDurPerWord / 1000);
        }
      }
    }
    actualEnd = Date.now();
    if (desiredEnd > actualEnd) {
      yield sleep((desiredEnd - actualEnd) / 1000);
    }
  }
});

module.exports = Writer;

