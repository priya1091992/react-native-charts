import React from 'react-native'
const { View } = React
import _ from 'underscore'
import Bar from '../Bar'
import Grid from '../Grid'
import styles from './styles'

// Configuration Constants
const DEFAULT_GRID_GRADUATION = 1
const DEFAULT_SHOW_GRID = true

export default class BarChart extends React.Component {
  static defaultProps = {
    gridGraduation: DEFAULT_GRID_GRADUATION,
    showGrid: DEFAULT_SHOW_GRID,
  }

  getStyles() {
    return styles(this.props)
  }

  getDataSetsMaxValue() {
    const {
      dataSets,
    } = this.props

    const dataSetsData = _.flatten(_.pluck(dataSets, 'data'))
    const dataSetsValues = _.pluck(dataSetsData, 'value')
    const dataSetsMaxValue = _.max(dataSetsValues)

    return dataSetsMaxValue
  }

  getGridMaxValue() {
    const {
      graduation,
    } = this.props

    const dataSetsMaxValue = this.getDataSetsMaxValue()
    const gridMaxValue = Math.ceil(dataSetsMaxValue / graduation) * graduation

    return gridMaxValue
  }

  renderGrid(children) {
    const {
      dataSets,
      graduation,
      horizontal,
    } = this.props

    const gridMaxValue = this.getGridMaxValue()

    return (
      <Grid
        horizontal={horizontal}
        graduation={graduation}
        maxValue={gridMaxValue}
        content={children}
        style={this.getStyles().grid}/>
    )
  }

  renderBars() {
    const {
      dataSets,
      horizontal,
    } = this.props

    // TODO: Margin/pad datasets...
    console.log('TODO: Margin/pad datasets...')
    const gridMaxValue = this.getGridMaxValue()
    const dataSetsBars = dataSets.map(dataSet => {
      return dataSet.data.map(data => {
        return (
          <Bar
            fillColor={dataSet.fillColor}
            horizontal={horizontal}
            value={data.value}
            maxValue={gridMaxValue}
            style={this.getStyles().bar}/>
        )
      })
    })
    const bars = _.flatten(_.zip(...dataSetsBars))

    return (
      <View style={this.getStyles().bars}>
        {bars}
      </View>
    )
  }

  render() {
    const {
      dataSets,
      showGrid,
      style,
    } = this.props

    const bars = this.renderBars()
    const chart = showGrid
                ? this.renderGrid(bars)
                : bars

    return (
      <View style={[this.getStyles().container, style]}>
        {chart}
      </View>
    )
  }
}