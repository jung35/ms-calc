import mobsData from './mobs.json'

export default class Mobs {
  constructor() {
  }

  list() {
    return mobsData.map((mob) => {
      return {
        id: mob.id,
        name: mob.name,
        image: require(`../../assets/mobs/${mob.id}.png`)
      }
    })
  }

  getMob(id) {
    for(let i = 0; i < mobsData.length; i++) {
      if(mobsData[i].id == id) {
        return mobsData[i]
      }
    }
  }

  search(name) {
    let mobs = []
    name = name.toLowerCase()
    for(let i = 0; i < mobsData.length; i++) {
      if(mobsData[i].name.toLowerCase().indexOf(name) != -1) {
        mobs.push(mobsData[i])
      }
    }

    return mobs
  }
}