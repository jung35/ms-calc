import _ from 'lodash'
import React, { Component } from 'react'

import { Mobs } from '../Util'

export default class MobSearch extends Component {
  constructor(props) {
    super(props)

    this.state = {
      mobs: Mobs.list()
    }

    this.search = this.search.bind(this)
  }

  search(e) {
    const value = e.target.value

    if(value.length == 0) {
      return this.setState({mobs: Mobs.list()})
    }

    return this.setState({mobs: Mobs.search(e.target.value)})
  }

  selectMob(id) {
    this.props.selectMob(id)
    const mobElement = document.getElementById('form_mob')
    mobElement.value = id
  }

  render() {
    const mobList = this.state.mobs.map(mob => {
      return <div key={ mob.id } onClick={() => this.selectMob(mob.id)}>{ mob.name }</div>
    })

    return <div className="mob_container">
      <input type="text" placeholder="Search for mob" onChange={this.search}/>
      <div className="mob_list">
        { mobList }
      </div>
    </div>
  }
}