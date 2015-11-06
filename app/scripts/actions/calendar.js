// CALENDAR ACTION CREATORS
// =======================

"use strict";

import { CALENDAR_SHOW_PREVIOUS_MONTH
       , CALENDAR_SHOW_NEXT_MONTH
       , CALENDAR_SHOW_TODAY
       , CALENDAR_CHOOSE_DATE
       , CALENDAR_ADD_TASK
       , CALENDAR_REMOVE_TASK
       , CALENDAR_CHOOSE_ACTIVE_TASK
       }
  from "./actionTypes";

export function showPreviousMonth () {
  return ( { type: CALENDAR_SHOW_PREVIOUS_MONTH } );
};

export function showNextMonth () {
  return ( { type: CALENDAR_SHOW_NEXT_MONTH } );
};

export function showToday () {
  return ( { type: CALENDAR_SHOW_TODAY } );
};

export function chooseDate (date) {
  return (
    { type: CALENDAR_CHOOSE_DATE
    , payload: { date }
    }
  )
}

export function addTask (targetDate, taskType) {
  return (
    { type: CALENDAR_ADD_TASK
    , payload: { targetDate, taskType }
    }
  )
}

export function removeTask ( taskID ) {
  return (
    { type: CALENDAR_REMOVE_TASK
    , payload: { taskID }
    }
  )
}

export function chooseActiveTask ( taskID ) {
  return (
    { type: CALENDAR_CHOOSE_ACTIVE_TASK
    , payload: { taskID }
    }
  )
}
