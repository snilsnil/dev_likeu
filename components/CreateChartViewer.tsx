import { StyleSheet, Dimensions } from 'react-native'
import React from 'react'

import { LineChart } from 'react-native-chart-kit'

import DATASET from '@/data/user.json'

const width = Dimensions.get('window').width

export default function CreateChartViewer() {
  return (
    <LineChart
      data={{
        labels: DATASET['commit_date'],
        datasets: [
          {
            data: DATASET['data'],
          },
        ],
      }}
      width={width - 10}
      height={256}
      //   verticalLabelRotation={30}
      chartConfig={{
        backgroundColor: '#F88600',
        backgroundGradientFrom: '#F88600',
        backgroundGradientTo: '#F88600',
        decimalPlaces: 2,
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        labelColor: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        propsForDots: {
          stroke: '#F88600',
        },
      }}
      style={{ borderRadius: 10 }}
      bezier
    />
  )
}

const styles = StyleSheet.create({})
