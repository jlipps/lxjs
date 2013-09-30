"use strict";

var monocle = require('monocle-js')
  , o_O = monocle.o_O
  , ll = monocle.ll
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
  var llArgs = [];
  _.each(this.parts, function(part) {
    part.instrument.tempo = this.tempo;
    llArgs.push([part.instrument.playScore.bind(part.instrument), part.score]);
  }.bind(this));

  try {
    yield ll(llArgs);
  } catch (e) {
    console.log(e.allErrors);
    throw e;
  }
});

module.exports = Director;
