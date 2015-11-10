// Day
// ===
// Component representing a day of a month

"use strict";

import React from "react";
import _ from "lodash";

import { Overlay, Popover } from "react-bootstrap";

import DragTarget from "../../components/DragTarget";
import DropTarget from "../../components/DropTarget";
import ScrubTask from "./TaskWidgets/ScrubTask";
import ScrubModal from "./TaskModals/ScrubModal";
import SmartTask from "./TaskWidgets/SmartTask";
import SmartModal from "./TaskModals/SmartModal";

const Day = React.createClass (
  { propTypes: { handleTaskAdd: React.PropTypes.func.isRequired
               , handleTaskRemove: React.PropTypes.func.isRequired
               , chooseDate: React.PropTypes.func.isRequired
               // Whether this is today's date
               , isToday: React.PropTypes.bool.isRequired
               // Whether this is the day selected by the user
               , isSelected: React.PropTypes.bool.isRequired
               // The day of the month this represents
               , dayOfMonth: React.PropTypes.number.isRequired
               , index: React.PropTypes.number.isRequired
               , tasks: React.PropTypes.array
               , disks: React.PropTypes.array
               , volumes: React.PropTypes.array
               , chooseActiveTask: React.PropTypes.func
               , activeTask: React.PropTypes.string
               }

  , getDefaultProps () {
    return { tasks: [] };
  }

  , createTasks () {
    var tasks = this.props.tasks;
    if ( _.has( this, [ "state", "tasks" ] ) ){
      tasks = this.state.tasks;
    }
    var taskDisplay =
      _.map( tasks
           , function createTaskItem ( task, index ) {
             var taskWidget;
             var taskModal;

             switch ( task.name ) {
               case "zfs.pool.scrub":
                 taskWidget =
                   <ScrubTask
                     volumeName = { task.args[0] || null }
                     chooseActiveTask = { this.props.chooseActiveTask.bind( null, task.id ) }
                     handleTaskRemove = { this.props.handleTaskRemove.bind( null, task.id ) }
                     taskID = { task.id }
                     ref = { task.id }
                   />;
                 taskModal =
                   <Popover id = { task.id }>
                     <ScrubModal
                       tasks = { this.props.tasks }
                       selectedVolume = { task.args[0] }
                       taskID = { task.id }
                       handleTaskRemove = { this.props.handleTaskRemove.bind( null, task.id ) }
                       volumes = { this.props.volumes }
                       existsOnServer = { task.existsOnServer }
                       { ...task.schedule }
                     />
                   </Popover>;
                 break;
               case "disks.parallel_test":
                 taskWidget =
                   <SmartTask
                     disks = { task.selectedDisks || null }
                     chooseActiveTask = { this.props.chooseActiveTask.bind( null, task.id ) }
                     handleTaskRemove = { this.props.handleTaskRemove.bind( null, task.id ) }
                     taskID = { task.id }
                     ref = { task.id }
                   />;
                 taskModal =
                   <Popover id = { task.id }>
                     <SmartModal
                       tasks = { this.props.tasks }
                       // This allows the more readable initialization in
                       // Calendar and also handles the case received from the
                       // middleware. It makes change handling in the modal
                       // much easier as well.
                       selectedDisks = { task.selectedDisks || task.args[0] }
                       testType = { task.testType || task.args[1] }
                       taskID = { task.id }
                       handleTaskRemove = { this.props.handleTaskRemove.bind( null, task.id ) }
                       disks = { this.props.disks }
                       existsOnServer = { task.existsOnServer }
                       { ...task.schedule }
                     />
                   </Popover>;
                 break;
             }

             return (
               <div
                 key = { index }
                 namespace = "calendar">
                 { taskWidget }
                 <Overlay
                   // FIXME: This does not account for multiple copies of a task
                   // in one day.
                   show = { this.props.activeTask === task.id
                         && this.props.isSelected
                          }
                   placement = "bottom"
                   target = { () => this.refs[ this.props.activeTask ] }
                 >
                   { taskModal }
                 </Overlay>
               </div>
             );
           }
           , this
           );
    return taskDisplay;

  }

  , render () {
    var dayClass = [ "day" ];

    if ( this.props.isToday ) {
      dayClass.push( "today" );
    }
    if ( this.props.isSelected ) {
      dayClass.push( "selected" );
    }

    return (
      <td key={ this.props.index }>
        <div
          className= { dayClass.join( " " ) }
          onClick = { this.props.chooseDate }
        >
          <DropTarget
            className="day-content"
            callback={ this.props.handleTaskAdd }
            namespace="calendar"
            activeDrop
          >
            <span className="day-numeral">{ this.props.dayOfMonth }</span>
            { this.createTasks() }
          </DropTarget>
        </div>
      </td>
    );
  }
});

export default Day;
