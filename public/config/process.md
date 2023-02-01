# Recording Process

 1) Event generator creates new array of event instances
 2) Event instances have prevCondition boolean variable to track transitions in condition
 3) Button generator creates new array of button instances
 4) Button instances have show boolean variable to track if conditions are met
 5) Bot state generator creates new bot state instance
 6) Bot state instances contains hasStarted boolean variable to track if match has started
 7) Event Log is initialized (empty array)
 8) Position Log is initialized (empty array)
 9) While match as not started yet, event log is available for writing, while only first entry in position log is written to
 10) On match start, a match start event is pushed to the event log