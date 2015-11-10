// Rsync
// ==========
// Draggable widget to place on the Calendar in order to schedule a new
// ...

"use strict";

import React from "react";
import { Alert } from "react-bootstrap";

export default class Rsync extends React.Component {

  constructor ( props ) {
    super( props );
    this.displayName = Rsync;
  }

  render () {
    var taskTitle = this.props.taskID
                  ? "Rsync"
                  : "Rsync";

    var deleteButton = null;
    if ( this.props.handleTaskRemove ) {
      deleteButton =
        <span
          className = "task-remove"
          onClick = { this.props.handleTaskRemove }
        />;
    }

    return (
      <Alert
        bsStyle = "info"
        bsSize = "small"
        className = "rsync-task"
        onClick = { this.props.chooseActiveTask }>
        <span>{ taskTitle }</span>
        <p>{ this.props.volumeName }</p>
        { deleteButton }
      </Alert>
    );
  }
};

Rsync.propTypes = { volumeName: React.PropTypes.string
                      , chooseActiveTask: React.PropTypes.func
                      , handleTaskRemove: React.PropTypes.func
                      , taskID: React.PropTypes.string
                      };

Rsync.defaultProps = { volumeName: null };
