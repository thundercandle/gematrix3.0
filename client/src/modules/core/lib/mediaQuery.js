import React, { Component } from 'react'
import { Dimensions } from 'react-native'

export class MediaQuery extends Component {
  state = Dimensions.get("window")
  handler = dims => this.setState(dims.window)

  componentWillMount() {
    Dimensions.addEventListener("change", this.handler)
  }

  componentWillUnmount() {
    Dimensions.removeEventListener("change", this.handler)
  }

  queryWidth(query) {
    return this.state.width < query
  }

  render() {
    return this.props.children(this.queryWidth(this.props.query))
  }
}
