import img from '../../assets/jobs/new_magician.png'

export default class Magician {
  constructor() {
    this.info = {
      enabled: true,
      name: 'Magician',
      img: img
    }

    this.form = [
      'level', 'int', 'luk', 'magic',
      'skillMagic', 'maMastery',
      'wandBonus'
    ]

    this.values = {}
  }

  damage() {
    const { level, int, luk, magic, skillMagic, maMastery, wandBonus } = this.values

    if(level == undefined || int == undefined || luk == undefined ||
       magic == undefined || skillMagic == undefined ||
       maMastery == undefined || wandBonus == undefined)
    {
      return {}
    }

    let eq1 = (magic**2 / 1000) + magic
    let eq2 = int / 200
    let eq3 = eq1 * maMastery * 0.9

    let max = (eq1/30 + eq2) * skillMagic * wandBonus
    let min = (eq3/30 + eq2) * skillMagic * wandBonus

    return { min, max }
  }
}