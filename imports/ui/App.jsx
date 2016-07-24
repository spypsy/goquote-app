import React, {PropTypes} from 'react';
import ReactDOM from 'react-dom';
import {createContainer} from 'meteor/react-meteor-data';

import {Jobs} from '../api/jobs';
import Job from './Job.jsx';

const App = React.createClass({
  PropTypes: {
    jobs: PropTypes.array,
  },

  getInitialState() {
    return {
      submitActive: false,
    };
  },

  getJobs() {
    return [];
  },

  renderJobs() {
    return (<div className="jobs-container">
      {this.props.jobs.map((job, i) => {
        return (<Job job={job} key={i} />);
      })}
    </div>);
  },

  render() {
    const {submitActive} = this.state;
    return (
      <div>
        <div className="header">
          <h1><b>Go</b>QuoteMe</h1>
        </div>
        <div className="container">
          <div className="job-create">
            <h2>Create a job:</h2>
            <form className="new-job"
              onSubmit={this.handleCreateJob}>
              <input type="text" ref="jobTitle"
                placeholder="Name your job"
                onChange={this.handleTitleChange} />
              <textarea type="text" ref="jobDesc" className="desc"
                placeholder="Describe your job" rows="8" />
              <button type="submit" value="Submit"
                className={'submit ' + (submitActive ? 'active' : 'disabled')}>
                Submit
              </button>
            </form>
          </div>
          {this.renderJobs()}
        </div>
      </div>
    );
  },

  handleCreateJob(e) {
    e.preventDefault();
    const job = {
      title: e.target[0].value,
      description: e.target[1].value,
      bids: [],
    };
    if (!job.title || job.title.length < 3) {
      return;
    }
    Jobs.insert(job);

    this.refs.jobTitle.value = '';
    this.refs.jobDesc.value = '';
  },

  handleTitleChange(e) {
    e.preventDefault();
    if (e.target.value && e.target.value.length >= 3) {
      this.setState({submitActive: true});
    } else {
      this.setState({submitActive: false});
    }
  }
});

export default createContainer(() => {
  return {
    jobs: Jobs.find().fetch()
  }
}, App);
