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
      job: undefined,
      values: {}
    }

    if(jobQuery != null) {
      jobQuery = jobQuery.toLowerCase()
      for(let i = 0; i < jobList.length; i++) {
        const setJob = jobList[i]
        if(setJob.info.name.toLowerCase() == jobQuery) {
          let values = {}
          for(let queryName in setJob.form) {
            let queryValue = queryString(queryName)
            if(queryValue == null) continue

            values[queryName] = queryValue
          }
          this.state = {job: setJob, values: values}
          break
        }
      }
    }

    this.selectJob = this.selectJob.bind(this)
    this.redoJobSelection = this.redoJobSelection.bind(this)
    this.playerInputs = this.playerInputs.bind(this)
  }

  redoJobSelection() {
    this.setState({...this.state, job: undefined })
    updateQueryString(this.state)
  }

  selectJob(job) {
    if(!job.info.enabled) return false
    this.setState({...this.state, job })
    updateQueryString(this.state)
  }

  playerInputs(data) {
    const { values } = this.state

    _.map(data, field => {
      if(field.value == null && values[field.name]) {
        delete values[field.name]
        return false
      }
      values[field.name] = field.value
    })

    this.setState({...this.state, values})
    updateQueryString(this.state)
  }

  render() {

    return <div>
      <JobSelection jobList={jobList} selectedJob={this.state.job} selectJob={this.selectJob} redoJobSelection={this.redoJobSelection} />
      <FormInput selectedJob={this.state.job} currentValues={this.state.values} playerInputs={this.playerInputs} />
    </div>
  }
}

const jobList = _.map(Jobs, obj => {
  return new obj()
})

const updateQueryString = state => {
  const { job, values } = state
  if(job == undefined) return window.history.pushState(null, null, `?`)
  let query = _.map(values, (value, name) => {
    return `&${name}=${value}`
  }).join('')

  window.history.pushState(null, null, `?job=${job.info.name.toLowerCase()}${query}`)
}