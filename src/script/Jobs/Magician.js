import img from '../../assets/jobs/new_magician.png'
import React from 'react'
import Skills from '../Skills/Magician'

import { Mobs } from '../Util'

export default class Magician {
  constructor() {
    this.info = {
      enabled: true,
      name: 'Magician',
      img: img
    }

    let sharpEyesOptions = []
    for(let i = 1; i <= 30; i++) {
      sharpEyesOptions.push({value: i, name: i})
    }

    let numTargetOptions = [{value: 1, name: 1, selected: true}]
    for(let i = 2; i <= 6; i++) {
      numTargetOptions.push({value: i, name: i})
    }

    const skillList = Skills.map(skill => {
      return {value: skill.name.replace(' ', '-').toLowerCase(), name: skill.name, type: skill.type, levels: skill.values.length}
    })

    this.form = {
      mob: {type: 'hidden', req: true},
      level: {
        label: 'Level',
        type: 'number',
        req: true
      },
      int: {
        label: 'Int',
        type: 'number',
        req: true
      },
      luk: {
        label: 'Luk',
        type: 'number',
        req: true
      },
      magic: {
        label: 'Total Magic',
        type: 'number',
        req: true
      },
      skill: {
        label: 'Skill',
        type: 'select',
        options: skillList,
        req: true
      },
      skillLevel: {
        label: 'Skill Level',
        type: 'select',
        options: [],
        preq: {
          data: 'levels',
        }
      },
      numTarget: {
        label: '# of Targets',
        type: 'select',
        options: numTargetOptions,
        preq: {
          data: 'type',
          equals: 'heal'
        }
      },
      wandBonus: {
        label: 'Elemental Wand Bonus',
        type: 'select',
        options: [
          {value: 1.00, name: 'No Bonus', selected: true},
          {value: 1.05, name: '5% Bonus'},
          {value: 1.10, name: '10% Bonus'}
        ],
        req: true
      },
      sharpEyes: {
        label: 'Sharp Eyes Level',
        type: 'select',
        options: [
          {value: 0, name: 'No Sharp Eyes', selected: true},
          ...sharpEyesOptions
        ]
      }
    }

    this.values = {
      wandBonus: 1.00
    }

    this.tips = <ul className="tips">
      <li><strong>Total Magic</strong><img src={require('../../assets/magician_tips/tma.png')} alt="total magic"/></li>
    </ul>
  }

  damage() {
    let { level, int, luk, magic, skill, skillLevel, wandBonus, mob, sharpEyes, numTarget } = this.getFormValues()
    if(skill == undefined) return {max: -1} // not all fields filled out or invalid options from select boxes

    let mastery = (15 + 5 * Math.floor((skillLevel - 1) / (skill.values.length / 10.0))) / 100.0

    // start basic dmg calculations
    let dmg = this.basicDmgCalc(int, magic, mastery, skill, wandBonus, numTarget) // {min, max}
    // add in mob defense (for mages, it would be magic defense)
    dmg = this.mobDefCalc(dmg, mob, level)
    let { min, max } = this.dmgApplyLimit(dmg, skill, mob) // finished dmg calculation
    
    let acc = this.hitAccuracy(int, luk, mob, level)

    let crit = this.critCalc(sharpEyes)

    return {
      max, min, acc, crit
    }
  }

  getFormValues() {
    for(let formField in this.form) {
      // check required fields
      if(this.form[formField].preq == undefined && this.form[formField].req && this.values[formField] == undefined) return {}
    }

    let { level, int, luk, magic, skill, skillLevel, wandBonus, mob, sharpEyes, numTarget } = this.values

    level = parseInt(level)
    int = parseInt(int)
    luk = parseInt(luk)
    magic = parseInt(magic)
    skillLevel = parseFloat(skillLevel)
    wandBonus = parseFloat(wandBonus)
    mob = parseInt(mob)
    sharpEyes = parseInt(sharpEyes)

    skill = Skills.find(x => x.name.replace(' ', '-').toLowerCase() == skill)
    if(skill == undefined) return {}
    if(skill.values[skillLevel - 1] == undefined) return {}
    skill.data = skill.values[skillLevel - 1]


    mob = Mobs.getMob(mob)

    return { level, int, luk, magic, skill, skillLevel, wandBonus, mob, sharpEyes, numTarget }
  }

  basicDmgCalc(int, magic, mastery, skill, wandBonus, numTarget) {
    let skillMagic = skill.data.skillMagic
    let skillElement = skill.type

    let eq1 = ((magic ** 2) / 1000.0)
    let eq2 = int / 200.0
    let eq3 = eq1 + (magic * mastery * 0.9)

    let max = ((eq1 + magic) / 30 + eq2) * skillMagic * wandBonus
    let min = (eq3 / 30 + eq2) * skillMagic * wandBonus

    if(skillElement == 'heal') {
      if(numTarget == undefined || numTarget == null) numTarget = 1
      let targetMultiplier = 1.5 + 5 / numTarget
      let dmgMultiplier = skill.data.dmgMultiplier

      max = (int * 1.2 + luk) * magic / 1000 * targetMultiplier * dmgMultiplier
      min = (int * 0.3 + luk) * magic / 1000 * targetMultiplier * dmgMultiplier
    }

    return { min, max }
  }

  mobDefCalc(dmg, mob, level) {
    let { min, max } = dmg
    
    let lvDiff = Math.max(0, mob.level - level)

    max = max - mob.def.magic * 0.5 * (1 + 0.01 * lvDiff)
    min = min - mob.def.magic * 0.6 * (1 + 0.01 * lvDiff)

    return { min, max }
  }

  dmgApplyLimit(dmg, skill, mob) {
    let { min, max } = dmg

    let skillElement = skill.type
    if(skillElement != 'none') {
      switch(mob.magic[skillElement]) {
        case 3:
          max = 1
          min = 1
          if(skillElement == 'heal') {
            max = 0
            min = 0
          }
          break
        case 2:
          max /= 2
          min /= 2
          break
        case 0:
          max *= 1.5
          min *= 1.5
          break
        case -1:
          if(skillElement == 'heal') {
            max = 0
            min = 0
          }
      }
    }


    min = Math.max(0, Math.floor(min))
    max = Math.max(0, Math.floor(max))

    max = Math.min(199999, max)
    min = Math.min(199999, min)

    return { min, max }
  }

  hitAccuracy(int, luk, mob, level) {
    let lvDiff = Math.max(0, mob.level - level)
    let accToHit = (mob.avoid + 1) * (1 + lvDiff / 24)
    let acc = Math.trunc(int / 10) + Math.trunc(luk / 10)
    let minAcc = accToHit * 10 / 24

    acc = Math.max(0, Math.floor(acc))
    accToHit = Math.max(0, Math.floor(accToHit))
    minAcc = Math.max(0, Math.floor(minAcc))
    

    return { acc, accToHit, minAcc }
  }

  critCalc(sharpEyes) {
    let chance = 0
    let increase = 0
    if(sharpEyes > 0) {
      chance = Math.ceil(sharpEyes / 2) / 100
      chance = Math.max(0, Math.min(1, chance))

      increase = 1 + ((10 + sharpEyes) / 100)
      increase = Math.max(1, Math.min(2, increase))
    }

    return { chance, increase }
  }
}