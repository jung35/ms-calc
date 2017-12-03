import React, { Component } from 'react'
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom'
import ReactDOM from 'react-dom'

import './sass/main.scss'
import { View } from './script'


class App extends Component {
  render()  {
    return <View />
  }
}

ReactDOM.render(<App />, document.getElementById('root'))