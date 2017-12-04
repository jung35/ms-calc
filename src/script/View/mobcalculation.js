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
    let dmgTable = <div className="dmg_table"><h3>&larr; Please fill in all the fields</h3></div>

    if(basicDmg.max != -1) {
      let hitrate = Math.floor(basicDmg.acc.acc / basicDmg.acc.accToHit * 100)
      if(hitrate > 100) hitrate = 100

      let oneShotRate = null
      if(hp < basicDmg.min) {
        oneShotRate = <tr><th>Chance to 1 hit Mob</th><td>100%</td></tr>
      } else if(hp < basicDmg.max && hp > basicDmg.min) {
        oneShotRate = <tr>
          <th>Chance to 1 hit Mob</th>
          <td>{Math.floor((basicDmg.max - hp) / (basicDmg.max - basicDmg.min) * 100)}%</td>
        </tr>
      }

      let critTable = null
      if(basicDmg.crit.chance > 0) {
        let critMax = Math.max(0, Math.floor(basicDmg.max * basicDmg.crit.increase))
        let critMin = Math.max(0, Math.floor(basicDmg.min * basicDmg.crit.increase))
        critTable = <table>
          <tbody>
            <tr><th colSpan="2">Critical Damage</th></tr>
            <tr><th>Maximum Crit DMG</th><td>{ numberWithCommas(critMax) }</td></tr>
            <tr><th>Maximum Crit DMG</th><td>{ numberWithCommas(critMin) }</td></tr>
            <tr><th>Max # of hits</th><td>{ Math.ceil(hp / critMax) }</td></tr>
            <tr><th>Min # of hits</th><td>{ Math.ceil(hp / critMin) }</td></tr>
            <tr><th>Critical Hit Chance</th><td>{ basicDmg.crit.chance * 100 }%</td></tr>
          </tbody>
        </table>
      }

      dmgTable = <div className="dmg_container">
        <h3>Character Damage</h3>
        <div className="dmg_table">
          <table>
            <tbody>
              <tr><th colSpan="2">Damage</th></tr>
              <tr><th>Maximum DMG</th><td>{ numberWithCommas(basicDmg.max) }</td></tr>
              <tr><th>Minimum DMG</th><td>{ numberWithCommas(basicDmg.min) }</td></tr>
              <tr><th>Max # of hits</th><td>{ Math.ceil(hp / basicDmg.min) }</td></tr>
              <tr><th>Min # of hits</th><td>{ Math.ceil(hp / basicDmg.max) }</td></tr>
              { oneShotRate }
            </tbody>
          </table>
          { critTable }
          <table>
            <tbody>
              <tr><th colSpan="2">Accuracy</th></tr>
              <tr><th>Character Accuracy</th><td>{ numberWithCommas(basicDmg.acc.acc) }</td></tr>
              <tr><th>Req. 100% hitrate</th><td>{ numberWithCommas(basicDmg.acc.accToHit) }</td></tr>
              <tr><th>Min. accuracy to hit mob</th><td>{ numberWithCommas(basicDmg.acc.minAcc) }</td></tr>
              <tr><th>Hitrate</th><td>{ hitrate }%</td></tr>
            </tbody>
          </table>
        </div>
      </div>
    }

    let magicResistance = _.map(magic, (val, name) => {
      if(val == -1 || val == 1) return null
      return <li key={ name }><strong>{ capitalize(name) }</strong>{this.resistance(val)}</li>
    }).filter(el => {
      if(el == null) return false
      return true
    })

    if(magicResistance.length == 0) {
      magicResistance = <li>No Elemental Resistance</li>
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
                { magicResistance }
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

const capitalize = string => {
  return string.charAt(0).toUpperCase() + string.slice(1);
}