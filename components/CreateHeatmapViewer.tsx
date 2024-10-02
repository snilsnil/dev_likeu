import { StyleSheet, View } from 'react-native'
import React from 'react'

import CustomHeatmap from './CustomHeatmap'

export default function CreateHeatmapViewer() {
  return (
    <View style={styles.container}>
      <CustomHeatmap color="#F88600" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    borderWidth: 2,
    borderColor: 'gray',
    width: '90%',

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
