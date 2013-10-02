"use strict";
var _ = require('underscore');

// tempo: 102, 4/4
// song structure:
// tapoff: 2 bars
// intro: 4 bars
// verse1: 8 bars
// verse2: 8 bars
// bridge: 8 bars
// chorus: 16 bars
// chorusOut: 8 bars
// preverse3: 2 bars
// verse3: 8 bars
// bridge2: 8 bars
// chorus: 16 bars
// chorusOut: 16 bars
// outro: 2 bars

var repeat = function(str, times) {
  var ret = '';
  for (var i = 0; i < times; i++) {
    ret += str;
  }
  return ret;
};

exports.structure = [
  'tapoff',
  'intro1',
  'verse1',
  'verse2',
  'bridge1',
  'chorus1',
  'chorusOut1',
  'intro2',
  'verse3',
  'bridge2',
  'chorus2',
  'chorusOut2',
  'outro'
];

var songSkeleton = function() {
  var skel = {};
  _.each(exports.structure, function(part) {
    skel[part] = '';
  });
  return skel;
};

exports.drums1 = (function() {
  var halfBase = repeat('k8 s4 s8 ta8 s4 s8 ', 4);
  var base = repeat(halfBase, 2);
  var chorus = repeat('k8 s8 k8 s8 k8 ta8 s8 k8 ', 16);
  var chorusOut = repeat('k4 k4 s8 k4 s8 ', 8);
  return _.extend(songSkeleton(), {
    tapoff: 'h4 h4 h4 h4 h4 h4 h4 h4 ',
    intro1: halfBase,
    verse1: base,
    verse2: base,
    bridge1: base,
    chorus1: chorus,
    chorusOut1: chorusOut,
    intro2: halfBase,
    verse3: base,
    bridge2: base,
    chorus2: chorus,
    chorusOut2: repeat(chorusOut, 2),
    outro:'k8 s4 s8 ta8 s4 s8 k8 s4 s8 ta8 s8 k4 '
  });
})();

exports.drums2 = (function() {
  var halfBase = repeat('h4 h4. h8 h8 i8 ', 4);
  var base = repeat(halfBase, 2);
  var bridge = repeat('r8 h4 h4 h4 h8 ', 8);
  var chorus = repeat('c4 h8 h8 i4 h8 h8 i4 h8 h8 i4 h8 h8 ', 8);
  return _.extend(songSkeleton(), {
    tapoff: 'r1 r1 ',
    intro1: halfBase,
    verse1: base,
    verse2: base,
    bridge1: bridge,
    chorus1: chorus,
    chorusOut1: bridge,
    intro2: halfBase,
    verse3: base,
    bridge2: bridge,
    chorus2: chorus,
    chorusOut2: repeat(bridge, 2),
    outro: 'h4 h4. h8 h8 i8 h4 h4 h4 c4 '
  });
})();

exports.piano1 = (function() {
  var introRiff = repeat('c8 g8 C8 g8 ', 4) +
                  repeat('c8 e8 a8 e8 ', 4);
  var verse = introRiff +
              repeat('c8 f8 a8 f8 ', 4) +
              'c8 g8 C8 g8 c8 g8 C8 g8 d8 g8 b8 g8 d8 g8 b8 g8 ';
  var bridge = repeat('b4 a8 g8 e4 g4 ', 2) +
               repeat('b4 a8 g#8 e4 g#4 ', 2) +
               'd4 d8 f8 a4 f4 a4 C8 b8 a4 e4 ' +
               'e4 b8 e4 e8 g#8 a8 e4 b8 e4. r4 ';
  var chorus = repeat('f8 a8 C8 f8 b8 a8 C8 a8 ', 2) +
               repeat('e8 g8 C8 g8 d8 e8 g8 c8 ', 2) +
               repeat('f8 a8 C8 f8 b8 a8 C8 a8 ', 2) +
               'e8 a8 C8 a8 d8 e8 C8 a8 d8 g8 b8 g8 C8 g8 b8 g8 ' +
               repeat('f8 a8 C8 f8 b8 a8 C8 a8 ', 2) +
               repeat('e8 g8 C8 g8 d8 e8 g8 c8 ', 2) +
               repeat('f8 a8 C8 f8 b8 a8 C8 a8 ', 2) +
               'e8 a8 C8 a8 d8 e8 C8 a8 e8 g#8 b8 g#8 C8 g#8 b8 g#8 ';
  var chorusOut = 'f4 a8 C4 a4 C8 f4 a8 C4 a4 f8 ' +
                  repeat('e4 a8 C4 a4 C8 ', 2) +
                  'f4 a8 C4 a4 C8 f4 a8 C4 a4 f8 ' +
                  'e4 a8 C4 a4 C8 d4 g8 b4 g4 d8 ';

  return _.extend(songSkeleton(), {
    tapoff: repeat('r1 ', 2),
    intro1: repeat('r1 ', 4),
    verse1: verse,
    verse2: verse,
    bridge1: bridge,
    chorus1: chorus,
    chorusOut1: chorusOut,
    intro2: introRiff,
    verse3: verse,
    bridge2: bridge,
    chorus2: chorus,
    chorusOut2: repeat(chorusOut, 2),
    outro: 'c8 g8 C8 g8 c8 g8 C8 g8 c8 g8 C8 g8 c8 g8 C4 '
  });

})();

exports.piano2 = (function() {
  var introRiff = repeat('c8 c4 g8 ', 4) +
                  repeat('a8 a4 e8 ', 4);
  var verse = introRiff +
              repeat('f8 f4 C8 ', 4) +
              repeat('c8 c4 g8 ', 2) + repeat('g8 g4 g8 ', 2);
  var bridge = repeat('e4 e4 b4. b8 ', 4) +
               'd4 d4 a4. a8 e4 e4 a4. a8 ' +
               'e4 e4 b4. b8 e4 e4 b4. r8 ';
  var chorus = repeat('f8 f4 C8 ', 4) +
               repeat('c8 c4 g8 ', 4) +
               repeat('f8 f4 C8 ', 4) +
               repeat('a8 a4 e8 ', 2) + repeat('g8 g4 g8 ', 2) +
               repeat('f8 f4 C8 ', 4) +
               repeat('c8 c4 g8 ', 4) +
               repeat('f8 f4 C8 ', 4) +
               repeat('a8 a4 e8 ', 2) + repeat('e8 e4 b8 ', 2);
  var chorusOut = repeat('f4. f8 C4 f4 ', 2) +
                  repeat('a4. a8 C4 a4 ', 2) +
                  repeat('f4. f8 C4 f4 ', 2) +
                  'a4. a8 C4 a4 g4. g8 b4 d4 d4 ';
  return _.extend(songSkeleton(), {
    tapoff: repeat('r1 ', 2),
    intro1: repeat('r1 ', 4),
    verse1: verse,
    verse2: verse,
    bridge1: bridge,
    chorus1: chorus,
    chorusOut1: chorusOut,
    intro2: introRiff,
    verse3: verse,
    bridge2: bridge,
    chorus2: chorus,
    chorusOut2: repeat(chorusOut, 2),
    outro: 'c8 g4 c8 c8 g4 c8 c8 g4 c8 c8 g8 c4 '
  });
})();
