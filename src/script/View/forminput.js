import _ from 'lodash'
import React, { Component } from 'react'
import MobSearch from './mobsearch'
import MobCalculation from './mobcalculation'
import changeLog from '../../../changelog.txt'

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
    const { selectedJob, currentValues } = this.props

    if(selectedJob == undefined) return <div className="homeWelcome">
      <h1>MapleSaga Damage Calculator<br /><small>By buhbang (<a href="https://github.com/jung35/ms-calc" target="_blank">github</a>)</small></h1>
<pre>{changeLog}</pre> 
    </div>

    let mobContainer = <MobSearch selectMob={this.openCalculation}/>

    if(currentValues.mob > 0) {
      const selectedMob = Mobs.getMob(currentValues.mob)
      if(selectedMob != null) {
        mobContainer = <MobCalculation goBack={this.closeCalculation} selectedJob={selectedJob} currentValues={currentValues}/>
      }
    }

    const skillList = selectedJob.form.skill.options

    return <div className="calculator">
      <div className="form_container">
        <h3>Character Info</h3>
        <form>
          {_.map(selectedJob.form, (info, name) => {
            if(info.preq != undefined) {
              if(currentValues['skill'] == undefined) return null
              const dataSet = skillList.find(x => x.name.replace(' ', '-').toLowerCase() == currentValues['skill'])

              if(dataSet == undefined || (info.preq.equals != undefined && info.preq.equals != dataSet[info.preq.data])) {
                return null
              }

              if(info.preq.equals == undefined) {
                info.options = []
                for(let i = 1; i <= dataSet[info.preq.data]; i++) {
                  info.options.push({value: i, name: i})
                }

                info.options[info.options.length - 1].selected = true
              }
            }

            let formInput
            if(info.type == 'select') {

              let selectedValue = null
              for(let i = 0; i < info.options.length; i++) {
                const option = info.options[i]
                if(option.selected) {
                  selectedValue = option.value
                }
              }

              formInput = <select id={ `form_${name}` } name={ name } defaultValue={currentValues[name] || selectedValue} onChange={this.formInputUpdate} className="form_select">
                {info.options.map(option => {
                  return <option key={ option.value } value={ option.value }>{ option.name }</option>
                })}
              </select>
            } else {
              formInput = <input id={ `form_${name}` } type={ info.type } name={ name } onChange={this.formInputUpdate} className="form_input" defaultValue={currentValues[name]} />
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
        { selectedJob.tips }
      </div>
      { mobContainer } 
    </div>
  }
}