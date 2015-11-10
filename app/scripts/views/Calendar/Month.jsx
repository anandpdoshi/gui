// Month
// =====
// A month for use in the Calendar view

"use strict";

import React from "react";
import _ from "lodash";

import moment from "moment";

import Day from "./Day";
import DropTarget from "../../components/DropTarget";

const weekdays = [ "sun", "mon", "tue", "wed", "thu", "fri", "sat" ];

// Primitive and messy
function checkTaskDates ( tasks, date ) {
  var matchingTasks = [];
  _.forEach( tasks
           , function checkScheduleMatch ( task ) {

             var matchDay;
             if ( task.schedule.day === "*" ) {
               matchDay = true;
             } else if ( _.has( task.schedule, "day" ) ) {
               matchDay = task.schedule.day === date.getDate().toString()
                        ? true
                        : false;
             }

             var matchWeekday;
             if ( task.schedule.day_of_week === "*" ) {
               matchWeekday = true;
             } else if ( _.has( task.schedule, "day_of_week" ) ) {
               matchWeekday = task.schedule.day_of_week === weekdays[ date.getDay() ]
                            ? true
                            : false;
             }

             var matchWeek;
             if ( task.schedule.week === "*" ) {
               matchWeek = true;
             } else if ( _.has( task.schedule, "day_of_week" ) ) {
               matchWeek = task.schedule.week === moment(date).week().toString()
                         ? true
                         : false;
             }

             var matchMonth;
             if ( task.schedule.month === "*" ) {
               matchMonth = true;
             } else if ( _.has( task.schedule, "month" ) ) {
               matchMonth = task.schedule.month === date.getMonth().toString()
                          ? true
                          : false;
             }

             var matchYear;
             if ( task.schedule.year === "*" ) {
               matchYear = true;
             } else if ( _.has( task.schedule, "year" ) ) {
               matchYear = task.schedule.year === date.getFullYear().toString()
                         ? true
                         : false;
             }

             if ( matchDay
               && matchWeekday
               && matchWeek
               && matchMonth
               && matchYear ) {
               matchingTasks.push( task );
             }
           }
           );
  return matchingTasks;
}

const Month = React.createClass(
  { getDefaultProps () {
    return { tasks: []
           , activeMonth: moment().month()
           , selectedDate: moment().date()
           , activeTask: ""
           };
  }

  , createBlankDays ( number ) {
    let result = [];

    for ( let i = 0; i < number; i++ ) {
      result.push(
        <td key={ i }>
          <div
            className="day">
            <span className="day-content day-blank"></span>
          </div>
        </td>
      );
    }

    return result;
  }

  , createDays ( ) {
    const today = moment();
    const activeDate = moment()
                      .year( this.props.activeYear )
                      .month( this.props.activeMonth );
    var date = new Date( activeDate.year()
                       , activeDate.month()
                       , 1
                       );

    var result = [];

    for ( let i = 1; i <= activeDate.daysInMonth(); i++ ) {
      result.push(
        <Day
          key = { i }
          handleTaskAdd = { this.props.handleTaskAdd.bind( null, _.cloneDeep ( date ) ) }
          handleTaskRemove = { this.props.handleTaskRemove }
          chooseDate = { this.props.chooseDate.bind( null, i ) }
          isToday = { today.isSame( date, "day" ) }
          isSelected = { i === this.props.selectedDate }
          dayOfMonth = { i }
          index = { i }
          tasks = { checkTaskDates( this.props.tasks, date ) }
          disks = { this.props.disks }
          volumes = { this.props.volumes }
          chooseActiveTask = { this.props.chooseActiveTask }
          activeTask = { this.props.activeTask }
        />
      );
      date.setDate( date.getDate() + 1 );
    }

    return result;
  }

  , renderDays( monthDays ) {
    var result = [];

    for ( let i=0, l=Math.round( monthDays.length / 7 ); i < l; i++ ) {
      result.push(
        <tr key = { i }>
          { monthDays.slice(i * 7, i * 7 + 7) }
        </tr>
      );
    }

    return result;
  }

  , render () {
    var activeMoment = moment()
                      .year( this.props.activeYear )
                      .month( this.props.activeMonth );

    var start = activeMoment.startOf( "month" ).day();
    var end = ( 7 - ( ( start + activeMoment.daysInMonth() ) % 7 ) );

    var monthDays = this.createDays();
    var daysInFirstWeek = 7 - start;
    var daysInLastWeek = ( monthDays.length - daysInFirstWeek ) % 7;
    var daysInMidWeeks = monthDays.length - daysInFirstWeek - daysInLastWeek;

    return (
      <table className="month">
        <thead>
          <tr>
            <th className="day-label">Sun</th>
            <th className="day-label">Mon</th>
            <th className="day-label">Tue</th>
            <th className="day-label">Wed</th>
            <th className="day-label">Thu</th>
            <th className="day-label">Fri</th>
            <th className="day-label">Sat</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            { this.createBlankDays( start ) }
            { monthDays.slice( 0, daysInFirstWeek ) }
          </tr>
          { this.renderDays( monthDays.slice( daysInFirstWeek, daysInFirstWeek + daysInMidWeeks ) ) }
          <tr>
            { monthDays.slice( daysInFirstWeek + daysInMidWeeks ) }
            { end === 7 ? null : this.createBlankDays( end ) }
          </tr>
        </tbody>
      </table>
    );
  }

});

export default Month;
