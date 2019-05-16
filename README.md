# Preact-Floater
This simple example demonstrates data-driven dynamic absolute element positioning using the Preact UI library.  In real life, the data would probably come from a realtime IoT device and be served up via an API. Could be Kayak positioning.  Could be SuperTanker positioning. Could be aircraft en route. The absolute elements could be superimposed over a map for example to make it interesting.

The basic idea is to use the left/top framework of absolutely positioned elements to represent information in an X/Y or time/Y fashion.

Previously I had made use of dynamic element positioning in an Angular 1 Schedule app: https://tetrainfotech.net/SCD/index.html
In that app I was able to dynamically set the the style left element position from the data located in $scope.

Demo at https://tetrainfotech.net/floater/index.html
