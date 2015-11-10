// Calendar Tasks Palette
// ======================
// Contextual display for available tasks to be added to the Calendar.

"use strict";

import React from "react";
import { Button } from "react-bootstrap";
import Icon from "../../components/Icon";


import DragTarget from "../../components/DragTarget";
import DropTarget from "../../components/DropTarget";

import ScrubTask from "./TaskWidgets/ScrubTask";
import SmartTask from "./TaskWidgets/SmartTask";

const CalendarTaskContext = React.createClass(
  {
    getInitialState() {
      return {
        events: this.props.events.events
      , create: false
      };
    },

    createEvent() {
      this.setState({ create: true });
    },

    cancelEvent() {
      this.setState({ create: false });
    },

    render() {
      let calendarContext;

      if (this.state.create) {
        calendarContext = (
          <div>
            <div className="context-section-header">
              <h5>{ "drag tasks on a day to create events" }</h5>
              <a onClick={ this.cancelEvent } className="close-icon"><Icon glyph="icon-close" />
              </a>
            </div>
            <DropTarget
              namespace = "calendar">
              <DragTarget
                namespace = "calendar"
                payload = "scrub">
                <ScrubTask/>
              </DragTarget>
            </DropTarget>
            <DropTarget
              namespace = "calendar">
              <DragTarget
                namespace = "calendar"
                payload = "smart">
                <SmartTask/>
              </DragTarget>
            </DropTarget>
          </div>
        );
      } else if (this.state.events.length) {
        calendarContext = (
          <div>
            <h5>{ "hello event" }</h5>
          </div>
        );

      } else {
        calendarContext = (
          <div className="calendar-create-event">
            <div className="calendar-icon">
              <img src="/images/empty-events-graphic.png"/>
            </div>
            <p>
              { "Schedule tasks for your" } <br/>
              { "system, volumns, or datasets" }
            </p>
            <Button onClick={ this.createEvent }>
              { "Create an Event" }
            </Button>
          </div>
        );
      }

      return (
        <div className="context-content calendar-context">
          { calendarContext }
        </div>
      )
    }
});

export default CalendarTaskContext;
