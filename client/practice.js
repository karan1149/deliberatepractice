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
    if (!Session.get('timing')){
      Session.set('timing', true);
      curTime = instance.time.get();
      // if(Session.get("instructions")){
      //     Session.set("instructions", false);
      element.text("Click again in " + curTime + " seconds!");
      // }
      Session.set('startTime', Date.now());
    } else{
      Session.set('timing', false);
      finishTime = Date.now();
      startTime = Session.get('startTime');
      diff = (finishTime - startTime) /1000;
      console.log(diff);
      if (Math.abs(diff - instance.time.get()) < .5){
        if (Math.abs(diff - instance.time.get()) < .25){
          instance.time.set(instance.time.get() + 2);
          newTime = instance.time.get();
          element.text("Amazing job! You were within .25s of the goal time. I'll increase the goal time by 2 seconds since you're so good. Click the button when you're ready, and click again in " + newTime + " seconds.");
        } else {
          instance.time.set(instance.time.get() + 1);
          newTime = instance.time.get();
          element.text("Good job! You were within .5s of the goal time. I'll increase the goal time by 1 second since you're doing well. Click the button when you're ready, and click again in " + newTime + " seconds.");
        }

      } else{
        if (Math.abs(diff - instance.time.get()) < 1){
          newTime = instance.time.get();
          element.text("You didn't do quite well enough. But you were very close. Try tapping your finger on every second next time. Click the button when you're ready, and click again in " + newTime + " seconds.");
        } else if (Math.abs(diff - instance.time.get()) < 2){
          newTime = instance.time.get();
          element.text("You didn't do too well that time, but you weren't super far off. Try counting the seconds in your mind. Click the button when you're ready to try again, and click again in " + newTime + " seconds.");
        } else {
          instance.time.set(instance.time.get() - 1);
          newTime = instance.time.get();
          element.text("You didn't do very well. I'll decrease the goal time by 1 second to make it easier for you. Click the button when you're ready, and click again in " + newTime + " seconds.");
        }
      }

    }
    // // increment the counter when button is clicked
    // instance.counter.set(instance.counter.get() + 1);

  },
});
