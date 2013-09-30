"use strict";

var monocle = require('monocle.js')
  , o_O = monocle.o_O
  , sleep = monocle.utils.sleep;

var noteDurations = {
  4: 1
  , 2: 2
  , 1: 4
  , 8: 0.5
  , 16: 0.25
};

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
    console.log(match);
    note = match[1];
    dur = match[2];
    half = (match[3] === ".") ? 1.5 : 1;
    shift = match[4];
    beatDur = 60 / this.tempo;
    noteDur = beatDur * (noteDurations[dur] * half);
    start = Date.now();
    desiredEnd = start + (noteDur * 1000);
    if (note !== 'r') {
      console.log("about to tap " + fullNote);
      yield this.playNote(note);
      if (shift) {
        if (shift === 'v' && this.curOctave > 1) {
          console.log('moving down an octave');
          yield this.chooseOctave(this.curOctave - 1);
        } else if (shift === '^' && this.curOctave < 8) {
          console.log('moving up an octave');
          yield this.chooseOctave(this.curOctave + 1);
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
