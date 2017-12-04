import _ from 'lodash'
import React, { Component } from 'react'
import Jobs from '../Jobs'

export default class JobSelection extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    const { selectJob, redoJobSelection, jobList, selectedJob } = this.props

    if(selectedJob != undefined) {
      const jobInfo = selectedJob.info
      return <div>
        <ul className="job_select selected" onClick={() => redoJobSelection()}>
          <li key={jobInfo.name}>
            <img className="avatar" src={jobInfo.img} />
            <div className="job">{jobInfo.name}</div>
          </li>
        </ul>
      </div>
    }

    return <div>
      <ul className="job_select">
        {_.map(jobList, jobObj => {
          const jobInfo = jobObj.info
          return <li key={jobInfo.name} className={jobInfo.enabled ? null : 'disabled'} onClick={() => selectJob(jobObj)}>
            <img className="avatar" src={jobInfo.img} />
            <div className="job">{jobInfo.name}</div>
          </li>
        })}
      </ul>
    </div>
  }
}