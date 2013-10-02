lxjs
====

Code for my LxJS 2013 [Appium](https://appium.io) music demo.

Video link forthcoming

Setup
-----

* Clone the Appium repo and get all the Appium stuff set up in a directory called `$APPIUM_HOME`
* Get an APK of Christopher Souvey's free music app. I just downloaded it from the Play Store and then `adb pull`-ed it. It needs to go in `./apps/`.
* Make sure you're running Node &gt;= 0.11.3 (for Generators)
* `npm install`
* Make 4 landscape Nexus 7 avds and launch them
* Launch 5 different instances of Appium with these commands:

    ```
    ./appium.sh DRUMS1
    ./appium.sh DRUMS2
    ./appium.sh PIANO1
    ./appium.sh PIANO2
    ./appium.sh LYRICS
    ```

* Get your guitar ready...
* `./play.sh`
