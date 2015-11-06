// CALENDAR REDUCER
// ================

"use strict";

import * as TYPES from "../actions/actionTypes";
import moment from "moment";

var now = moment();

const INITIAL_STATE =
  { activeYear: now.year()
  , activeMonth: now.month()
  , selectedDate: now.date()
  , mode: "month"
  , tasks: []
  , activeTask: null
  , disks: []
  , volumes: []
  };

export default function calendar ( state = INITIAL_STATE, action ) {
  const { type, payload } = action;
  
  switch ( type ) {
    case TYPES.CALENDAR_SHOW_PREVIOUS_MONTH:
    case TYPES.CALENDAR_SHOW_NEXT_MONTH:
      var now = moment()
                .year( state.activeYear )
                .month( state.activeMonth )
                .date( state.selectedDate );

      if (TYPES.CALENDAR_SHOW_NEXT_MONTH) {
        now.add( 1, "months" );
      } else {
        now.subtract( 1, "months" );
      }

      var changes = { activeYear: now.year()
                    , activeMonth: now.month()
                    , selectedDate: now.startOf("month").date()
                    , activeTask: null
                    };
      return Object.assign( {}, state, changes );

    case TYPES.CALENDAR_SHOW_TODAY:
      var now = moment();
      var changes = { activeYear: now.year()
                    , activeMonth: now.month()
                    , selectedDate: now.date()
                    , activeTask: null
                    };
      return Object.assign( {}, state, changes );

    default:
      return state

  }

};
