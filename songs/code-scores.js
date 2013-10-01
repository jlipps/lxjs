"use strict";
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

exports.drums1 = (function() {
  var tapoff, intro1, verse1, verse2, bridge1, chorus1, chorusOut1,
      intro2, verse3, bridge2, chorus2, chorusOut2, outro;
  tapoff = 'h4 h4 h4 h4 h4 h4 h4 h4 ';
  intro1 = repeat('k8 s4 s8 ta8 s4 s8 ', 4);
  verse1 = repeat(intro1, 2);
  verse2 = verse3 = verse1;
  bridge1 = verse1; //repeat('k8 s4 s8 ta4 s4 ', 8);
  bridge2 = bridge1;
  chorus1 = repeat('k8 s8 k8 s8 k8 ta8 s8 k8 ', 16);
  chorus2 = chorus1;
  chorusOut1 = repeat('k4 k4 s8 k4 s8 ', 8);
  intro2 = intro1;
  chorusOut2 = repeat(chorusOut1, 2);
  outro = 'k8 s4 s8 ta8 s4 s8 k8 s4 s8 ta8 s8 k4 ';
  return tapoff + intro1 + verse1 + verse2 + bridge1 + chorus1 +
         chorusOut1 + intro2 + verse3 + bridge2 + chorus2 + chorusOut2 +
         outro;
})();

exports.drums2 = (function() {
  var tapoff, intro1, verse1, verse2, bridge1, chorus1, chorusOut1,
      intro2, verse3, bridge2, chorus2, chorusOut2, outro;
  tapoff = 'r1 r1 ';
  intro1 = repeat('h4 h4. h8 h8 i8 ', 4);
  verse1 = repeat(intro1, 2);
  intro2 = intro1;
  verse2 = verse3 = verse1;
  bridge1 = repeat('r8 h4 h4 h4 h8 ', 8);
  bridge2 = bridge1;
  chorus1 = repeat('c4 h8 h8 i4 h8 h8 i4 h8 h8 i4 h8 h8 ', 8);
  chorus2 = chorus1;
  chorusOut1 = bridge1;
  chorusOut2 = repeat(chorusOut1, 2);
  outro = 'h4 h4. h8 h8 i8 h4 h4 c4 ';
  return tapoff + intro1 + verse1 + verse2 + bridge1 + chorus1 +
         chorusOut1 + intro2 + verse3 + bridge2 + chorus2 + chorusOut2 +
         outro;
})();

exports.piano1 = (function() {
  var tapoff, intro1, verse1, verse2, bridge1, chorus1, chorusOut1,
      intro2, verse3, bridge2, chorus2, chorusOut2, outro;
  tapoff = 'r1 r1 ';
  intro1 = 'r1 r1 r1 r1 ';
  verse1 = repeat('c8 g8 C8 g8 ', 4) +
           repeat('c8 e8 a8 e8 ', 4) +
           repeat('c8 f8 a8 f8 ', 4) +
           'c8 g8 C8 g8 c8 g8 C8 g8 d8 g8 b8 g8 d8 g8 b8 g8 ';
  verse2 = verse1;
  bridge1 = repeat('b4 a8 g8 e4 g4 ', 2) +
            repeat('b4 a8 g#8 e4 g#4 ', 2) +
            'd4 d8 f8 a4 f4 a4 C8 b8 a4 e4 ' +
            'e4 b8 e4 e8 g#8 a8 e4 b8 e4. r4 ';
  chorus1 = repeat('f8 a8 C8 f8 b8 a8 C8 a8 ', 2) +
            repeat('e8 g8 C8 g8 d8 e8 g8 c8 ', 2) +
            repeat('f8 a8 C8 f8 b8 a8 C8 a8 ', 2) +
            'e8 a8 C8 a8 d8 e8 C8 a8 d8 g8 b8 g8 C8 g8 b8 g8 ' +
            repeat('f8 a8 C8 f8 b8 a8 C8 a8 ', 2) +
            repeat('e8 g8 C8 g8 d8 e8 g8 c8 ', 2) +
            repeat('f8 a8 C8 f8 b8 a8 C8 a8 ', 2) +
            'e8 a8 C8 a8 d8 e8 C8 a8 e8 g#8 b8 g#8 C8 g#8 b8 g#8 ';
  chorusOut1 = 'f4 a8 C4 a4 C8 f4 a8 C4 a4 f8 ' +
               repeat('e4 a8 C4 a4 C8 ', 2) +
               'f4 a8 C4 a4 C8 f4 a8 C4 a4 f8 ' +
               'e4 a8 C4 a4 C8 d4 g8 b4 g4 d8 ';
  intro2 = repeat('c8 g8 C8 g8 ', 4) +
           repeat('c8 e8 a8 e8 ', 4);
  verse3 = verse1;
  bridge2 = bridge1;
  chorus2 = chorus1;
  chorusOut2 = repeat(chorusOut1, 2);
  outro = 'c8 g8 C8 g8 c8 g8 C8 g8 c8 g8 C8 g8 c8 g8 C4 ';
  return tapoff + intro1 + verse1 + verse2 + bridge1 + chorus1 +
         chorusOut1 + intro2 + verse3 + bridge2 + chorus2 + chorusOut2 +
         outro;
})();

exports.piano2 = (function() {
  var tapoff, intro1, verse1, verse2, bridge1, chorus1, chorusOut1,
      intro2, verse3, bridge2, chorus2, chorusOut2, outro;
  tapoff = 'r1 r1 ';
  intro1 = 'r1 r1 r1 r1 ';
  verse1 = repeat('c8 c4 g8 ', 4) +
           repeat('a8 a4 e8 ', 4) +
           repeat('f8 f4 C8 ', 4) +
           repeat('c8 c4 g8 ', 2) + repeat('g8 g4 g8 ', 2);
  verse2 = verse1;
  bridge1 = repeat('e4 e4 b4. b8 ', 4) +
            'd4 d4 a4. a8 e4 e4 a4. a8 ' +
            'e4 e4 b4. b8 e4 e4 b4. r8 ';
  chorus1 = repeat('f8 f4 C8 ', 4) +
            repeat('c8 c4 g8 ', 4) +
            repeat('f8 f4 C8 ', 4) +
            repeat('a8 a4 e8 ', 2) + repeat('g8 g4 g8 ', 2) +
            repeat('f8 f4 C8 ', 4) +
            repeat('c8 c4 g8 ', 4) +
            repeat('f8 f4 C8 ', 4) +
            repeat('a8 a4 e8 ', 2) + repeat('e8 e4 b8 ', 2);
  chorusOut1 = repeat('f4. f8 C4 f4 ', 4) +
               repeat('a4. a8 C4 a4 ', 4);
  intro2 = repeat('c8 c4 g8 ', 4) +
           repeat('a8 a4 e8 ', 4);
  verse3 = verse1;
  bridge2 = bridge1;
  chorus2 = chorus1;
  chorusOut2 = repeat(chorusOut1, 2);
  outro = 'c8 g4 c8 c8 g4 c8 c8 g4 c8 c8 g8 c4 ';
  return tapoff + intro1 + verse1 + verse2 + bridge1 + chorus1 +
         chorusOut1 + intro2 + verse3 + bridge2 + chorus2 + chorusOut2 +
         outro;
})();
