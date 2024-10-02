import { StyleSheet, Text, View, ColorValue } from 'react-native'
import React from 'react'

import USERDATA from '@/data/user.json'

type HeatMapProps = {
  color: ColorValue
}

export default function CustomHeatmap({ color }: HeatMapProps) {
  const config = [
    {
      backgroundColor: 'gray',
      width: 15,
      height: 15,
      margin: 1,
      opacity: 0.2,
      borderRadius: 30,
    },
    {
      backgroundColor: color,
      width: 15,
      height: 15,
      margin: 1,
      opacity: 0.5,
      borderRadius: 30,
    },
    {
      backgroundColor: color,
      width: 15,
      height: 15,
      margin: 1,
      opacity: 1,
      borderRadius: 30,
    },
  ]

  const commit_data = USERDATA.commit_data

  return (
    <View
      style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'row',
        flexWrap: 'wrap',
      }}
    >
      {commit_data.map(item => {
        return <View style={config[item.commit_count]} key={item.date} />
      })}
    </View>
  )
}
