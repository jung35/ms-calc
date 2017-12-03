return {
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