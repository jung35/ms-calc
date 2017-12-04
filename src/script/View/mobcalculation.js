import _ from 'lodash'
import React, { Component } from 'react'

import { Mobs } from '../Util'

export default class MobCalculation extends Component {
  constructor(props) {
    super(props)
    this.props.selectedJob.values = this.props.currentValues
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

  resistance(type) {
    switch(type) {
      case 3:
        return 'immune'
      case 2:
        return 'strong'
      case 0:
        return 'weak'
      default:
        return '-'
    }
  }

  render() {
    const { id, name, level, image, hp, avoid, def, magic } = this.state.mob
    const basicDmg = this.props.selectedJob.damage()
    let dmgTable = null

    if(basicDmg.max != -1) {
      let hitrate = Math.floor(basicDmg.acc.acc / basicDmg.acc.accToHit * 100)
      if(hitrate > 100) hitrate = 100

      dmgTable = <div className="dmgTable">
        <table>
          <tbody>
            <tr><th colspan="2">Character Damage</th></tr>
            <tr><th>Maximum DMG</th><td>{ numberWithCommas(basicDmg.max) }</td></tr>
            <tr><th>Minimum DMG</th><td>{ numberWithCommas(basicDmg.min) }</td></tr>
          </tbody>
        </table>
        <table>
          <tbody>
            <tr><th colspan="2">Character Accuracy</th></tr>
            <tr><th>Accuracy</th><td>{ numberWithCommas(basicDmg.acc.acc) }</td></tr>
            <tr><th>Req. 100% hitrate</th><td>{ numberWithCommas(basicDmg.acc.accToHit) }</td></tr>
            <tr><th>Min. accuracy to hit mob</th><td>{ numberWithCommas(basicDmg.acc.minAcc) }</td></tr>
            <tr><th>Hitrate</th><td>{ hitrate }%</td></tr>
          </tbody>
        </table>
      </div>
    }

    return <div className="mob_container">
      <div className="header">
        <div className="goback" onClick={this.goBack}>&times;</div>
        <div className="title">{ name }</div>
      </div>
      <div className="about_mob">
        <div className="image_container">
          <img src={ image } alt={ name }/>
        </div>
        <div className="mob_data">
          <ul>
            <li><strong>Name</strong>{ name }</li>
            <li><strong>Level</strong>{ level }</li>
            <li><strong>HP</strong>{ numberWithCommas(hp) }</li>
            <li><strong>Avoid</strong>{ avoid }</li>
            <li><strong>W. Def.</strong>{ numberWithCommas(def.weapon) }</li>
            <li><strong>M. Def.</strong>{ numberWithCommas(def.magic) }</li>
          </ul>
          <div className="resistance">
            <div className="title">Element Resistance</div>
            <div className="resistance_wrap">
              <ul>
                <li><strong>Fire</strong>{this.resistance(magic.fire)}</li>
                <li><strong>Ice</strong>{this.resistance(magic.ice)}</li>
                <li><strong>Holy</strong>{this.resistance(magic.holy)}</li>
              </ul>
              <ul>
                <li><strong>Poison</strong>{this.resistance(magic.poison)}</li>
                <li><strong>Lightning</strong>{this.resistance(magic.lightning)}</li>
                <li><strong>Heal</strong>{this.resistance(magic.heal)}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      { dmgTable }
    </div>
  }
}

const numberWithCommas = x => {
  var parts = x.toString().split(".");
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  return parts.join(".");
}