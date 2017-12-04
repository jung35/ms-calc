import _ from 'lodash'
import React, { Component } from 'react'

import { Mobs } from '../Util'

export default class FormInput extends Component {
  constructor(props) {
    super(props)

    this.state = {
      mobs: mobs.list()
    }

    this.search = this.search.bind(this)
  }

  selectMob(id) {
    const mob = mobs.getMob(id)
    console.log(mob)
  }

  search(e) {
    const value = e.target.value

    if(value.length == 0) {
      return this.setState({mobs: mobs.list()})
    }

    return this.setState({mobs: mobs.search(e.target.value)})
  }

  render() {
    const { selectedJob } = this.props
    if(selectedJob == undefined) return <div />

    const mobList = this.state.mobs.map(mob => {
      return <div key={ mob.id } onClick={() => this.selectMob(mob.id)}>{ mob.name }</div>
    })

    return <div className="calculator">
      <div className="form_container">
        <h3>Character Stats</h3>
        <form>
          {_.map(selectedJob.form, (info, name) => {
            let formInput
            if(info.type == 'select') {

              let selectedValue = null
              for(let i = 0; i < info.options.length; i++) {
                const option = info.options[i]
                if(option.selected) {
                  selectedValue = option.value
                }
              }

              formInput = <select id={ `form_${name}` } name={ name } defaultValue={selectedValue} className="form_select">
                {info.options.map(option => {
                  return <option key={ option.value } value={ option.value }>{ option.name }</option>
                })}
              </select>
            } else {
              formInput = <input id={ `form_${name}` } type={ info.type } className="form_input"/>
            }

            return <div className="form_group" key={ name }>
              <label htmlFor={ `form_${name}` }>{ info.label }</label>
              { formInput }
            </div>
          })}
        </form>
      </div>
      <div className="mob_container">
        <input type="text" placeholder="Search for mob" onChange={this.search}/>
        <div className="mob_list">
          { mobList }
        </div>
      </div>
    </div>
  }
}

const mobs = new Mobs()
