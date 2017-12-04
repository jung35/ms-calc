import _ from 'lodash'
import React, { Component } from 'react'
import Jobs from '../Jobs'
import { queryString } from '../Util'

import JobSelection from './jobselection'
import FormInput from './forminput'

export default class View extends Component {
  constructor(props) {
    super(props)
    let jobQuery = queryString('job')

    this.state = {
      job: undefined
    }

    if(jobQuery != null) {
      jobQuery = jobQuery.toLowerCase()
      for(let i = 0; i < jobList.length; i++) {
        if(jobList[i].info.name.toLowerCase() == jobQuery) {
          this.state = {job: jobList[i]}
          break
        }
      }
    }

    this.selectJob = this.selectJob.bind(this)
    this.redoJobSelection = this.redoJobSelection.bind(this)
    this.playerInputs = this.playerInputs.bind(this)
  }

  redoJobSelection() {
    this.setState({ job: undefined })
    updateQueryString(undefined)
  }

  selectJob(job) {
    if(!job.info.enabled) return false
    this.setState({ job })
    updateQueryString(job)
  }

  playerInputs(data) {
    const { job } = this.state

    if(job == undefined) return false

    _.map(data, field => {
      if(field.value == null) {
        delete job.values[field.name]
        return false
      }
      job.values[field.name] = field.value
    })

    updateQueryString(job)
  }

  render() {

    return <div>
      <JobSelection jobList={jobList} selectedJob={this.state.job} selectJob={this.selectJob} redoJobSelection={this.redoJobSelection} />
      <FormInput selectedJob={this.state.job} playerInputs={this.playerInputs} />
    </div>
  }
}

const jobList = _.map(Jobs, obj => {
  return new obj()
})

const updateQueryString = job => {
  if(job == undefined) return window.history.pushState(null, null, `?`)
  let query = _.map(job.values, (value, name) => {
    return `&${name}=${value}`
  }).join('')

  window.history.pushState(null, null, `?job=${job.info.name.toLowerCase()}${query}`)
}