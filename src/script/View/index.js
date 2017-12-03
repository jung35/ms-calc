import _ from 'lodash'
import React, { Component } from 'react'
import Jobs from '../Jobs'

import JobSelection from './jobselection'

const jobList = _.map(Jobs, obj => {
  return new obj()
})

const queryString = (name) => {
  const url = window.location.href
  name = name.replace(/[\[\]]/g, "\\$&")
  const regex = new RegExp(`[?&]${name}(=([^&#]*)|&|#|$)`)
  const results = regex.exec(url)
  if (!results) return null
  if (!results[2]) return ''
  return decodeURIComponent(results[2].replace(/\+/g, " "))
}

export default class View extends Component {
  constructor(props) {
    super(props)
    const jobQuery = queryString('job')

    this.state = {
      job: undefined
    }

    if(jobQuery != null) {
      for(let i = 0; i < jobList.length; i++) {
        if(jobList[i].info.name.toLowerCase() == jobQuery.toLowerCase()) {
          this.state = {
            job: jobList[i]
          }

          break
        }
      }
    }

  }

  redoJobSelection() {
    this.setState({ job: undefined })
    window.history.pushState(null, null, `?`);
  }

  selectJob(job) {
    if(!job.info.enabled) return false
    window.history.pushState(null, null, `?job=${job.info.name.toLowerCase()}`);
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