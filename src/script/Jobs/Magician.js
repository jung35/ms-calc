import img from '../../assets/jobs/new_magician.png'

import { Mobs } from '../Util'

export default class Magician {
  constructor() {
    this.info = {
      enabled: true,
      name: 'Magician',
      img: img
    }

    this.form = {
      mob: {type: 'hidden'},
      level: {
        label: 'Level',
        type: 'number'
      },
      int: {
        label: 'Int',
        type: 'number'
      },
      luk: {
        label: 'Luk',
        type: 'number'
      },
      magic: {
        label: 'Total Magic',
        type: 'number'
      },
      skillMagic: {
        label: 'Skill Magic Attack',
        type: 'number'
      },
      maMastery: {
        label: 'Skill Mastery',
        type: 'select',
        options: [
          {value: 1.25, name: 'Initial (25%)'},
          {value: 1.75, name: 'Maxed Skill (25% + 50%)', selected: true}
        ]
      },
      wandBonus: {
        label: 'Elemental Wand Bonus',
        type: 'select',
        options: [
          {value: 1.00, name: 'No Bonus', selected: true},
          {value: 1.05, name: '5% Bonus'},
          {value: 1.10, name: '10% Bonus'}
        ]
      },
    }

    this.values = {
      maMastery: 1.75,
      wandBonus: 1.00
    }
  }

  damage() {
    for(let formField in this.form) {
      if(this.values[formField] == undefined) return {max: -1}
    }

    let { level, int, luk, magic, skillMagic, maMastery, wandBonus, mob } = this.values

    level = parseInt(level)
    int = parseInt(int)
    luk = parseInt(luk)
    magic = parseInt(magic)
    skillMagic = parseInt(skillMagic)
    maMastery = parseInt(maMastery)
    wandBonus = parseInt(wandBonus)
    mob = parseInt(mob)

    let eq1 = ((magic ** 2) / 1000) + magic
    let eq2 = int / 200
    let eq3 = eq1 * maMastery * 0.9

    let max = (eq1/30 + eq2) * skillMagic * wandBonus
    let min = (eq3/30 + eq2) * skillMagic * wandBonus

    // finished basic dmg calculation
    
    let selectedMob = Mobs.getMob(mob)
    let lvDiff = selectedMob.level - level
    if(lvDiff < 0) lvDiff = 0

    max = max - selectedMob.def.magic * 0.5 * (1 + 0.01 * lvDiff)
    min = min - selectedMob.def.magic * 0.6 * (1 + 0.01 * lvDiff)

    // finished mob defense calc
    
    let accToHit = (selectedMob.avoid + 1) * (1 + lvDiff / 24)
    let acc = Math.trunc(int / 10) + Math.trunc(luk / 10)
    let minAcc = accToHit * 10 / 24

    max = Math.floor(max)
    min = Math.floor(min)

    acc = Math.floor(acc)
    minAcc = Math.floor(minAcc)
    accToHit = Math.floor(accToHit)

    return {
      max, min,
      acc: {
        acc, minAcc, accToHit
      }
    }
  }
}