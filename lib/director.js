"use strict";

var monocle = require('monocle-js')
  , o_O = monocle.o_O
  , o_C = monocle.o_C
  , _ = require('underscore');

var Director = function(tempo) {
  this.tempo = tempo || 60;
  this.parts = [];
};

Director.prototype.addPart = function(instrument, score) {
  if (typeof instrument === "undefined" || typeof score === "undefined") {
    throw new Error("Adding a part requires an instrument and a score");
  }

  this.parts.push({
    instrument: instrument
    , score: score
  });
};

Director.prototype.playScore = o_O(function*() {
  if (this.parts.length < 1) {
    throw new Error("Nothing to play! use director.addPart()");
  }

  _.each(this.parts, function(part) {
    part.instrument.tempo = this.tempo;
  }.bind(this));

  var partsDone = 0;
  var doneCb = o_C();
  var partDoneHandler = function() {
    partsDone++;
    if (partsDone === this.parts.length) {
      doneCb();
    }
  }.bind(this);

  _.each(this.parts, function(part) {
    part.instrument.playScore(part.score).add(partDoneHandler);
  });

  yield doneCb;
});

module.exports = Director;
