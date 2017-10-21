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
        type: 'number',
        label: 'Level'
      }
    }
  }
}