import img from '../../assets/jobs/new_magician.png'

export default class Magician {
  constructor() {
    this.info = {
      enabled: true,
      name: 'Magician',
      img: img
    }

    this.form = {
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
          {value: 1.25, name: 'Initial (25%)', selected: true},
          {value: 1.75, name: 'Maxed Skill (25% + 50%)'}
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
      }
    }

    this.values = {}
  }

  damage() {
    for(let formField in this.form) {
      if(this.values[formField] == undefined) return {}
    }

    const { level, int, luk, magic, skillMagic, maMastery, wandBonus } = this.values

    let eq1 = (magic**2 / 1000) + magic
    let eq2 = int / 200
    let eq3 = eq1 * maMastery * 0.9

    let max = (eq1/30 + eq2) * skillMagic * wandBonus
    let min = (eq3/30 + eq2) * skillMagic * wandBonus

    return { min, max }
  }
}