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
    for(let i = 0; i < this.form.length; i++) {
      if(this.values[this.form[i]] == undefined) return {}
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