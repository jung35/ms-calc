import _ from 'lodash'
import React, { Component } from 'react'

import { Mobs } from '../Util'

export default class MobCalculation extends Component {
  constructor(props) {
    super(props)
    this.goBack = this.goBack.bind(this)
    this.state = {
      mob: Mobs.getMob(props.selectedJob.values.mob)
    }
  }

  goBack() {
    this.props.goBack()
    const mobElement = document.getElementById('form_mob')
    mobElement.value = ''
  }

  render() {
    const { id, name, level, image, hp, avoid, def } = this.state.mob

    return <div className="mob_container">
      <div className="header">
        <div className="goback" onClick={this.goBack}>&times;</div>
        <div className="title">{ name }</div>
      </div>
      <div className="about_mob">
        <div className="image_container">
          <img src={ image } alt={ name }/>
        </div>
        <ul className="mob_data">
          <li><strong>Name</strong>{ name }</li>
          <li><strong>Level</strong>{ level }</li>
          <li><strong>HP</strong>{ hp }</li>
          <li><strong>Avoid</strong>{ avoid }</li>
          <li><strong>W. Def.</strong>{ def.weapon }</li>
          <li><strong>M. Def.</strong>{ def.magic }</li>
        </ul>
      </div>
    </div>
  }
}