import _ from 'lodash'
import React, { Component } from 'react'
import { queryString } from '../Util'

import { Mobs } from '../Util'

export default class FormInput extends Component {
  constructor(props) {
    super(props)

    this.state = {
      mobs: Mobs.list()
    }

    this.formInputUpdate = this.formInputUpdate.bind(this)
    this.search = this.search.bind(this)
  }

  selectMob(id) {
    this.props.playerInputs([{name: 'mob', value: id}])
    const mobElement = document.getElementById('form_mob')
    mobElement.value = id
  }

  search(e) {
    const value = e.target.value

    if(value.length == 0) {
      return this.setState({mobs: Mobs.list()})
    }

    return this.setState({mobs: Mobs.search(e.target.value)})
  }

  formInputUpdate(e) {
    const target = e.target

    const params = _.map(target.form.elements, (field) => {
      return {
        name: field.getAttribute('name'), value: field.value
      }
    }).filter(data => {
      if(data.value.length == 0) return false
      return true;
    })

    console.log(params)

    this.props.playerInputs(params)
  }

  render() {
    const { selectedJob } = this.props
    if(selectedJob == undefined) return <div />

    const mobList = this.state.mobs.map(mob => {
      return <div key={ mob.id } onClick={() => this.selectMob(mob.id)}>{ mob.name }</div>
    })

    const params = _.map(selectedJob.form, (info, name) => {
      let queryStringValue = queryString(name) || undefined
      return {
        name: name, value: queryStringValue
      }
    }).filter(data => {
      if(data.value == undefined || data.value.length == 0) return false
      return true;
    }) || []

    this.props.playerInputs(params)

    let mobContainer = <div className="mob_container">
      <input type="text" placeholder="Search for mob" onChange={this.search}/>
      <div className="mob_list">
        { mobList }
      </div>
    </div>

    return <div className="calculator">
      <div className="form_container">
        <h3>Character Stats</h3>
        <form>
          {_.map(selectedJob.form, (info, name) => {
            let queryStringValue = queryString(name) || undefined

            let formInput
            if(info.type == 'select') {

              let selectedValue = null
              for(let i = 0; i < info.options.length; i++) {
                const option = info.options[i]
                if(option.selected) {
                  selectedValue = option.value
                }
              }

              formInput = <select id={ `form_${name}` } name={ name } defaultValue={queryStringValue || selectedValue} onChange={this.formInputUpdate} className="form_select">
                {info.options.map(option => {
                  return <option key={ option.value } value={ option.value }>{ option.name }</option>
                })}
              </select>
            } else {
              formInput = <input id={ `form_${name}` } type={ info.type } name={ name } onChange={this.formInputUpdate} className="form_input" defaultValue={queryStringValue} />
            }

            if(info.type == 'hidden') {
              return <div key={ name }>{ formInput }</div>
            }

            return <div key={ name } className="form_group">
              <label htmlFor={ `form_${name}` }>{ info.label }</label>
              { formInput }
            </div>
          })}
        </form>
      </div>
      { mobContainer }
    </div>
  }
}