import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import {Session} from 'meteor/session';

import './practice.html';

Template.practice.onCreated(function practiceOnCreated() {
  // counter starts at 0
  this.time = new ReactiveVar(3);
  Session.set('timing', false);
  // Session.set('instructions', true);
});

Template.practice.helpers({
  time() {
    return Template.instance().time.get();
  },
});

Template.practice.events({
  'click button'(event, instance) {
    var element = $("#instructions");
    var button = $("button");
    if (!Session.get('timing')){
      Session.set('timing', true);
      curTime = instance.time.get();
      // if(Session.get("instructions")){
      //     Session.set("instructions", false);
      element.text("Click again in " + curTime + " seconds!");
      button.text("Stop");
      // }
      Session.set('startTime', Date.now());
    } else{
      Session.set('timing', false);
      button.text("Start");
      finishTime = Date.now();
      startTime = Session.get('startTime');
      diff = (finishTime - startTime) /1000;
      if (Math.abs(diff - instance.time.get()) < .5){
        if (Math.abs(diff - instance.time.get()) < .25){
          instance.time.set(instance.time.get() + 2);
          newTime = instance.time.get();
          element.text("Your time was " + diff + ". Amazing job! You were within .25s of the goal time. I'll increase the goal time by 2 seconds since you're so good. Click the button when you're ready, and click again in " + newTime + " seconds.");
        } else {
          instance.time.set(instance.time.get() + 1);
          newTime = instance.time.get();
          element.text("Your time was " + diff + ". Good job! You were within .5s of the goal time. I'll increase the goal time by 1 second since you're doing well. Click the button when you're ready, and click again in " + newTime + " seconds.");
        }

      } else{
        var tips = ["Try tapping your finger on every second.", "Try counting out the seconds in your mind.", "Try imagining looking at a clock in your mind.", "Try looking at the rhythm of a timer and coming back to this.", "Try counting the seconds out loud.", "Try clapping at each second.", "Try snapping at each second."];
        var tip = tips[Math.floor(Math.random()*tips.length)];
        if (Math.abs(diff - instance.time.get()) < 1){
          newTime = instance.time.get();
          element.text("Your time was " + diff + ". You didn't do quite well enough. But you were very close. " + tip + " Click the button when you're ready, and click again in " + newTime + " seconds.");
        } else if (Math.abs(diff - instance.time.get()) < 2){
          newTime = instance.time.get();
          element.text("Your time was " + diff + ". You didn't do too well that time, but you weren't super far off. " + tip + " Click the button when you're ready to try again, and click again in " + newTime + " seconds.");
        } else {
          instance.time.set(Math.max(instance.time.get() - 1, 1));
          newTime = instance.time.get();
          element.text("Your time was " + diff + ". You didn't do very well. I'll decrease the goal time by 1 second to make it easier for you. Click the button when you're ready, and click again in " + newTime + " seconds.");
        }
      }

    }
    // // increment the counter when button is clicked
    // instance.counter.set(instance.counter.get() + 1);

  },
});
