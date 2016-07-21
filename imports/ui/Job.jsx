import React, {PropTypes} from 'react';
import ReactDOM from 'react-dom';
// import {createContainer} from 'meteor/react-meteor-data';

import {Jobs} from '../api/jobs';

const Job = React.createClass({
  PropTypes: {
    job: PropTypes.object,
  },

  render() {
    const {job} = this.props;
    return (<div className="job">
      <div className="delete-job" onClick={this.deleteJob}>✕</div>
      <h2>{job.title}</h2>
      <p className="job-desc">
        {job.description}
      </p>
      <ul className="job-bids">
        {job.bids.map((bid, j) => {
          return <li key={j}>
            <strong>{bid.description}</strong> {bid.price}£
          </li>
        })}
      </ul>
      <form key={'form'} className="new-bid" onSubmit={this.handleBid}>
        <input type="text" ref="bidDesc"
          placeholder="Type info about your bid..." />
        <input type="number" ref="bidPrice"
          placeholder="Price" />
        <input type="submit" value="Submit" />
      </form>
    </div>);
  },

  handleBid(e) {
    e.preventDefault();

    const bid = {
      description: e.target[0].value,
      price: e.target[1].value,
      createdAt: new Date(),
    }
    Jobs.update(this.props.job._id, {
      $push: {bids: bid},
    });
  },

  deleteJob() {
    if (window.confirm('Sure you wanna delete that?')) {
      Jobs.remove(this.props.job._id);
    }
  },
});

export default Job;
