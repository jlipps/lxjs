"use strict";

var monocle = require('monocle-js')
  , o_O = monocle.o_O
  , sleep = monocle.utils.sleep;

var noteDurations = {
  4: 1
  , 2: 2
  , 1: 4
  , 8: 0.5
  , 16: 0.25
};

exports.tap = o_O(function*(x, y) {
  yield this.driver.execute("mobile: tap", [{x: x, y: y}]);
});


exports.playScore = o_O(function*(score) {
  var notes = score.trim().split(" ");
  var re = /^([^\d]+)(\d+)(\.)?(v|\^)?$/;
  var fullNote, match, note, dur, beatDur, noteDur, start, desiredEnd, end,
    shift, half;
  for (var i = 0; i < notes.length; i++ ) {
    fullNote = notes[i];
    match = re.exec(fullNote);
    if (!match) {
      throw new Error("Couldn't parse note data from " + fullNote);
    }
    note = match[1];
    dur = match[2];
    half = (match[3] === ".") ? 1.5 : 1;
    shift = match[4];
    beatDur = 60 / this.tempo;
    noteDur = beatDur * (noteDurations[dur] * half);
    start = Date.now();
    desiredEnd = start + (noteDur * 1000);
    if (note !== 'r') {
      yield this.playNote(note);
      if (shift) {
        if (shift === 'v' && this.curOctave > 1) {
          yield this.chooseOctave(this.curOctave - 1);
        } else if (shift === '^' && this.curOctave < 8) {
          yield this.chooseOctave(this.curOctave + 1);
        }
      }
    }
    end = Date.now();
    if (desiredEnd > end) {
      yield sleep((desiredEnd - end) / 1000);
    }
  }
});
