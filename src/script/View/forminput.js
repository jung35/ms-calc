import _ from 'lodash'
import React, { Component } from 'react'
import MobSearch from './mobsearch'
import MobCalculation from './mobcalculation'

import { queryString, Mobs } from '../Util'

export default class FormInput extends Component {
  constructor(props) {
    super(props)

    this.formInputUpdate = this.formInputUpdate.bind(this)

    let jobQuery = queryString('mob')
    this.state = {mob: jobQuery || null}

    this.closeCalculation = this.closeCalculation.bind(this)
    this.openCalculation = this.openCalculation.bind(this)
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

    this.props.playerInputs(params)
  }

  closeCalculation() {
    this.props.playerInputs([{name: 'mob', value: null}])
    this.setState({mob: null})
  }

  openCalculation(id) {
    this.props.playerInputs([{name: 'mob', value: id}])
    this.setState({mob: id})
  }

  render() {
    const { selectedJob } = this.props
    if(selectedJob == undefined) return <div />

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

    let mobContainer = <MobSearch selectMob={this.openCalculation}/>

    if(selectedJob.values.mob > 0) {
      const selectedMob = Mobs.getMob(selectedJob.values.mob)
      if(selectedMob != null) {
        mobContainer = <MobCalculation goBack={this.closeCalculation} selectedJob={selectedJob}/>
      }
    }

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