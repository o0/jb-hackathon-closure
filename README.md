#Closure Library Demo
ComboBox component created with Google Closure Library.

##Used technologies
* Google Closure Library as JavaScript library
* Ojster (https://github.com/dimsmol/ojster) as template language
* Plovr as JavaScript build system.
All build activities (templates compilation, bundling, etc.) are executed
by running ```make```.

##Demo
There are three demos of this component.

First is called "Cheat mode". It is demo, where I used already existed
components from UI package of Closure Library. To run this demo, execute
```make js-serve``` in command line and than run file ```public/cheat.html```.

Second is how this component works in development mode. To run this demo, you
should also run ```make js-serve``` and than open file ```public/index.html```.

Third mode is mode where all dependencies of development mode are compiled
into one file by Google Closure Compiler in ```ADVANCED``` mode.

##Disclaimer
There are some bugs and lack of styling, but it is just a concept, so don't
blame me.

##To-dos
* Add unit-tests.
* Implement component states as a bit-masks.