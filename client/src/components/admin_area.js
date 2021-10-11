import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../actions';

class AdminArea extends Component {
  componentWillMount() {
    this.props.fetchAdminMessage();
  }

  render() {
    return (
      <div className="msg">{this.props.message}</div>
    );
  }
}

function mapStateToProps(state) {
  return { message: state.auth.message };
}

export default connect(mapStateToProps, actions)(AdminArea);
