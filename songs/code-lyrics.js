"use strict";

var chorus = [
  [1, "laughter, "],
  [0.5, ""],
  [0.5, "where's my "],
  [1, "smile\n"],
  [0.5, ""],
  [0.5, "Show me the "],
  [1, "hardware "],
  [0.25, ""],
  [0.75, "that makes it worth"],
  [1.5, "while\n"],
  [0.5, "What's the "],
  [1.5, "point "],
  [0.5, "of a test-driven "],
  [1.5, "life\n"],
  [0.5, "I need to "],
  [1.5, "remember "],
  [0.5, "what it was "],
  [2, "like\n\n"]
];

var chorusOut = [
  [0.5, ""],
  [0.5, "When there was "],
  [0.5, "still "],
  [0.5, "code to "],
  [2, "write\n"]
];
chorusOut = chorusOut.concat(chorusOut);

module.exports = {
  tapoff: [[2, '']],
  intro1: [[4, '']],
  verse1: [
    [1, "I used to write the "],
    [0.75, "code\n"],
    [0.25, "That "],
    [1, "made the world go "],
    [0.75, "round\n"],
    [0.25, "Now it "],
    [1, "gets on just "],
    [1, "fine\n"],
    [1, "Without any"],
    [1, "one\n\n"]],
  verse2: [
    [1, "I guess I'll get out of "],
    [0.75, "bed\n"],
    [0.25, "Though there's "],
    [1, "nothing for me to "],
    [0.75, "do\n"],
    [0.25, "I'll have "],
    [1, "automatic "],
    [0.75, "toast\n"],
    [0.25, "I'll drink "],
    [1, "automatic "],
    [1, "juice\n\n"]],
  bridge1: [
    [0.5, ""],
    [0.5, "We "],
    [1, "knew this day would "],
    [1, "come\n"],
    [0.5, ""],
    [0.5, "When all our "],
    [1, "striving "],
    [1, "would be "],
    [1, "done\n\n"],
    [0.5, ""],
    [0.5, "So where's my "]],
  chorus1: chorus,
  chorusOut1: chorusOut,
  intro2: [[4, "\n"]],
  verse3: [
    [1, "My quality "],
    [1, "assured\n"],
    [1, "Breakfast is under"],
    [1, "way\nI "],
    [1, "wonder how "],
    [1, "long it will be\n"],
    [1, "Till a robot "],
    [1, "digests it for "]],
  bridge2: [
    [1, "me\n\nThen I "],
    [1, "think, how long will it "],
    [1.5, "be\n"],
    [0.5, "Before a "],
    [1, "robot "],
    [1, "digests "],
    [1.5, "me?\n\n"],
    [0.5, "So where's my "]],
  chorus2: chorus,
  chorusOut2: chorusOut.concat(chorusOut),
  outro: [[2, '']]
};
