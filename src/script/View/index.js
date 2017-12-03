import _ from 'lodash'
import React, { Component } from 'react'
import Jobs from '../Jobs'

import JobSelection from './jobselection'

const jobList = _.map(Jobs, obj => {
  return new obj()
})

export default class View extends Component {
  constructor(props) {
    super(props)
    this.state = {
      job: undefined
    }
  }

  redoJobSelection() {
    this.setState({ job: undefined })
  }

  selectJob(job) {
    if(!job.info.enabled) return false
    this.setState({ job })
  }

  render() {
    const selectJob = this.selectJob.bind(this)
    const redoJobSelection = this.redoJobSelection.bind(this)

    return <div>
      <JobSelection selectJob={selectJob} redoJobSelection={redoJobSelection} jobList={jobList} job={this.state.job} />
    </div>
  }
}