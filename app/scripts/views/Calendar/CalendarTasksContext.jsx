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

    render() {
      let calendarContext;

      if (this.state.create) {
        calendarContext = (
          <div>
            <h5 className="context-section-header type-line">
              <span className="text">
                { "New System Tasks" }
              </span>
            </h5>
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

      } else {
        calendarContext = (
          <div className="calendar-create-event">
            <div className="calendar-icon">
              <Icon glyph="icon-calendar" />
            </div>
            <span>
              { "Schedule tasks for your" } <br/>
              { "system, volumns, or datasets" }
            </span>
            <Button onClick={ this.createEvent }>
              { "Create an Event" }
            </Button>
          </div>
        );
      }

      return (
        <div className="context-content context-disks">
          { calendarContext }
        </div>
      )
    }
});

export default CalendarTaskContext;
