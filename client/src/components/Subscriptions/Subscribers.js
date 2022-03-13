import _ from 'lodash';
import React, { Component } from 'react';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class Subscribers extends Component {

  componentDidMount() {
    this.props.fetchUser();
    this.props.getSubscriberList();
  }

  renderSubscribers() {
    const allowed = this.props.auth === (null || false) ? false : true;
    if(!allowed) {
      return;
    }

    return _.map(this.props.subscribers, subscriber => {
      return (
        
        <div className='collection' key={subscriber._id}>
          <div className='collection-item' style={{padding: '0'}}>
            <div className='col s10 left' style={{margin: '20px'}}>
              <span className='card-title'>{ subscriber.email }</span>
            </div>
            <div className='col s2 right'>
              <button onClick={() => this.props.deleteSubscriber(subscriber._id)} className="btn-floating red" style={{ top: '-10', margin: '10px'}}>
                <i className='material-icons white-text tiny'>delete_forever</i>
              </button>
            </div>
          </div>
        </div>
      );
    }); 
  }

  render() {
    return (
      <div className='container'>
        <h4>Subscribers List</h4>
        <div>
          {this.renderSubscribers()}
        </div>
      </div>
    );
  }
}

function mapStateToProps({ auth, subscribers }) {
  return { auth, subscribers };
}

export default connect(mapStateToProps, actions)(Subscribers);