// CALENDAR
// ========
// View containing information about all scheduled tasks, cronjobs, scrubs, etc

"use strict";

import React from "react";
import { connect } from "react-redux";
import { Button, ButtonGroup } from "react-bootstrap";
import moment from "moment";
import * as CALENDAR from "../actions/calendar"
import Month from "./Calendar/Month";
import Icon from "../components/Icon";

// STYLESHEET
if ( process.env.BROWSER ) require( "./Calendar.less" );

// REACT
class Calendar extends React.Component {
  constructor( props ) {
    super( props );

    this.displayName = "Calendar";
  }

  componentDidMount () {
    // this.props.subscribe( this.displayName );

    // TODO
    // this.props.fetchData();
  }

  componentWillUnmount () {
    // this.props.unsubscribe( this.displayName );

    // TODO
    // this.props.cleanup();
  }

  componentDidUpdate () {
    // TODO
    // FIXME: Oh god, it burns, it burrrrns
    // this.props.fetchAvailableDisksIfNeeded()
  }

  // RENDER METHODS

  render () {
    let activeMoment = moment()
                       .year( this.props.activeYear )
                       .month( this.props.activeMonth )
    return (
      <main className="calendar-wrapper">
        <div className="clearfix calendar">
          <div className="month-picker">
            <ButtonGroup>
              <Button onClick={ this.showPreviousMonth }>
                <Icon glyph="arrow-triangle-left" />
              </Button>
              <Button onClick={ this.showToday }>
                { activeMoment.format("MMM YYYY") }
              </Button>
              <Button onClick={ this.showNextMonth }>
                <Icon glyph="arrow-triangle-right" />
              </Button>
            </ButtonGroup>
          </div>
        </div>
        <Month
          { ...this.props }
        />
      </main>
    )
  }
}

function mapStateToProps ( state ) {
  return (
    { activeYear: state.calendar.activeYear
    , activeMonth: state.calendar.activeMonth
    , selectedDate: state.calendar.selectedDate
    }
  );
};

function mapDispatchToProps ( dispatch ) {
  return (
    { showPreviousMonth: () => dispatch( CALENDAR.showPreviousMonth() )
    , showNextMonth: () => dispatch( CALENDAR.showNextMonth() )
    , showToday: () => dispatch( CALENDAR.showToday() )
    , chooseDate: (date) => dispatch( CALENDAR.chooseDate( date ) )
    , addTask: ( targetDate, taskType ) => dispatch( CALENDAR.addTask( targetDate, taskType ) )
    , removeTask: ( taskID ) => dispatch( CALENDAR.removeTask( taskID ) )
    , chooseActiveTask: ( taskID ) => dispatch( CALENDAR.chooseActiveTask( taskID ) )
    }
  );
};

export default connect( mapStateToProps, mapDispatchToProps )( Calendar );
