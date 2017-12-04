import mobsData from './mobs.json'

function list() {
  return mobsData.map((mob) => {
    mob.image = require(`../../assets/mobs/${mob.id}.png`)
    return mob
  })
}

function getMob(id) {
  const data = list()
  for(let i = 0; i < data.length; i++) {
    if(data[i].id == id) {
      return data[i]
    }
  }
  return null
}

function search(name) {
  let mobs = []
  name = name.toLowerCase()
  const data = list()
  for(let i = 0; i < data.length; i++) {
    if(data[i].name.toLowerCase().indexOf(name) != -1) {
      mobs.push(data[i])
    }
  }

  return mobs
}

export default { list, getMob, search }