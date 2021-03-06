// Subscriptions Debug Tab
// =============

"use strict";

import _ from "lodash";
import React from "react";
import { Button, Col, Input, Row, Table } from "react-bootstrap";

// Disclosure Triangles
import Disclosure from "../../../components/Disclosure";

// Middleware
import MiddlewareClient from "../../../websocket/MiddlewareClient";


var Subscriptions = React.createClass(

  { displayName: "Debug Tools - Subscriptions Tab"

  , getInitialState: function () {
      return {
        subscriptions : {}
        , subsMasks     : ""
      };
    }

  , componentDidMount: function () {
      // SubscriptionsStore.addChangeListener( this.handleMiddlewareChange );
    }

  , componentWillUnmount: function () {
      // SubscriptionsStore.removeChangeListener( this.handleMiddlewareChange );
    }

  , handleMiddlewareChange: function () {
      this.setState(
        {
          subscriptions : {}
        }
      );
    }

  , handleMaskInputChange: function ( event ) {
      this.setState(
        {
          subsMasks : event.target.value
        }
      );
    }

  , handleSubsSubmit: function () {
      MiddlewareClient.subscribe
        (  this.state.subsMasks.replace( /\s/g, "" ).split( "," )
        , this.constructor.displayName );
    }

  , createList: function ( item, index ) {
      return (
        <li key={ index }>{ item }</li>
      );
    }

  , createRow: function ( namespace, index ) {
      var listItems = [];
      _.forEach( this.state.subscriptions[ namespace ]
               , function ( value, key ) {
                   listItems.push( String( key ).concat( " : ", value ) );
                 }
      );
      return (
        <tr key={ index }>
          <td>{ namespace }</td>
          <td>{ _.sum( this.state.subscriptions[ namespace ] ) }</td>
          <td>
            <Disclosure key={ index } defaultExpanded={false}>
              <ul>{ listItems.map( this.createList ) }</ul>
            </Disclosure>
          </td>
        </tr>
      );
    }

  , render: function () {
      var subscriptionsContent = null;
      // TODO: Object.keys( state subscriptions blab blah )
      // var removeALL = MiddlewareClient.unsubscribeALL;

      if ( _.isEmpty( this.state.subscriptions ) ) {
        subscriptionsContent = <h3 className="text-center">No log content</h3>;
      } else {
        var subscriptionKeys = _.sortBy(
          _.keys( this.state.subscriptions ), function ( key ) {
            return this.state.subscriptions[ key ];
          }.bind( this )
        );

        subscriptionsContent = (
          <Table responsive>
            <thead>
              <tr>
                <th>Namespace</th>
                <th>{"Total Number of subscribed components"}</th>
                <th>{"Individual ComponentID counts"}</th>
              </tr>
            </thead>
            <tbody>
              { subscriptionKeys.map( this.createRow ) }
            </tbody>
          </Table>
        );
      }

      return (
        <div className="debug-content-flex-wrapper">

          <Col xs={6} className="debug-column" >

            <h5 className="debug-heading">Active Subscriptions</h5>
            <div className="debug-column-content">
              { subscriptionsContent }
            </div>

          </Col>

          <Col xs={6} className="debug-column" >

            <h5 className="debug-heading">Add Subsriptions</h5>
            <Row>
              <Col xs={5}>
                <Input type        = "textarea"
                            style       = {{ resize: "vertical"
                                           , height: "34px" }}
                            placeholder = "Subscription Mask(s)"
                            onChange    = { this.handleMaskInputChange }
                            value       = { this.state.subsMasks } />
              </Col>
            </Row>
            <Row>
              <Col xs={2}>
                <Button bsStyle = "primary"
                             onClick = { this.handleSubsSubmit }
                             block>
                  {"Submit"}
                </Button>
              </Col>
            </Row>

            <h5 className="debug-heading">Remove Subscriptions</h5>
              <div className="debug-column-content">
                <Button block bsStyle = "danger"
                             onClick = { removeALL }>
                  {"Remove All Subscriptions"}
                </Button>
              </div>

          </Col>
        </div>
      );
    }

});

module.exports = Subscriptions;
