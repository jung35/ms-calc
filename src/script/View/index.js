import _ from 'lodash'
import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Jobs from '../Jobs'

export default class View extends Component {
  constructor(props) {
    super(props)
    this.state = {
      jobs : _.map(Jobs, obj => {
        return (new obj).info
      })
    }
  }

  render() {
    console.log(this.state)

    return (
      <ul>{_.map(this.state.jobs, job => {
        return <li key={job.name}>{job.name} <img src={job.img} /></li>
      })}</ul>
    );
  }
}