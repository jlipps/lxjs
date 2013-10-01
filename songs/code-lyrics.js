"use strict";

var chorus = [
  [2, "laughter, where's my "],
  [1, "smile\n"],
  [1, "Show me the "],
  [1, "hardware "],
  [1, "that makes it worth"],
  [1, "while\n"],
  [1, "What's the "],
  [1, "point "],
  [1, "of a test-driven "],
  [1, "life\n"],
  [1, "I need to "],
  [1, "remember "],
  [1, "what it was "],
  [2, "like\n\n"]
];

var chorusOut = [
  [1, "When there was "],
  [1, "still code to "],
  [2, "write\n"]
];
chorusOut = chorusOut.concat(chorusOut);

exports = {
  tapoff: [[2, '']],
  intro: [[4, '']],
  verse1: [
    [2, "I used to write the code\n"],
    [2, "That made the world go round\n"],
    [2, "Now it gets on just fine\n"],
    [2, "Without anyone\n\n"]],
  verse2: [
    [2, "I guess I'll get out of bed\n"],
    [2, "Though there's nothing for me to do\n"],
    [2, "I'll have automatic toast\n"],
    [2, "I'll drink automatic juice\n"]],
  bridge1: [
    [1, ""],
    [2, "We knew this day would come\n"],
    [1, "When all our "],
    [1, "striving "],
    [1, "would be "],
    [2, "done\n\n So where's my "]],
  chorus1: chorus,
  chorusOut1: chorusOut,
  preverse3: [[4, '']],
  verse3: [
    [2, "My quality assured\n"],
    [2, "Breakfast is underway\n"],
    [2, "I wonder how long it will be\n"],
    [2, "Till a robot digests it for me\n\n"]],
  bridge2: [
    [1, "Then I "],
    [1, "think, how long will it "],
    [1, "be\n"],
    [1, "Before a "],
    [1, "robot "],
    [1, "digests "],
    [1, "me?\n\n So where's my "]],
  chorus2: chorus,
  chorusOut2: chorusOut.concat(chorusOut)
};
