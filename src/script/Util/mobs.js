import mobsData from './mobs.json'

function list() {
  return mobsData.map((mob) => {
    return {
      id: mob.id,
      name: mob.name,
      image: require(`../../assets/mobs/${mob.id}.png`)
    }
  })
}

function getMob(id) {
  for(let i = 0; i < mobsData.length; i++) {
    if(mobsData[i].id == id) {
      return mobsData[i]
    }
  }
}

function search(name) {
  let mobs = []
  name = name.toLowerCase()
  for(let i = 0; i < mobsData.length; i++) {
    if(mobsData[i].name.toLowerCase().indexOf(name) != -1) {
      mobs.push(mobsData[i])
    }
  }

  return mobs
}

export default { list, getMob, search }