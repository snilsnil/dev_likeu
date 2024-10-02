import { View, Text, StyleSheet, ScrollView } from 'react-native'
import React from 'react'

import CreateChartViewer from '@/components/CreateChartViewer'
import CreateAdViewer from '@/components/CreateAdViewer'

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <ScrollView
        style={{
          display: 'flex',
          width: '100%',
          height: '100%',
        }}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.ad_container}>
          <Text style={styles.center_text}>News</Text>
          <CreateAdViewer />
        </View>
        <View style={styles.chart_container}>
          <Text style={styles.center_text}>Chart</Text>
          <CreateChartViewer />
        </View>
        <View style={styles.popular_container}>
          <Text>Popular Player</Text>
        </View>
      </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    marginTop: 60,
  },

  text: { textAlign: 'center' },

  center_text: { color: 'white', fontSize: 30, fontWeight: 700, margin: 10 },

  ad_container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 200,
    marginTop: 20,
    marginBottom: 20,
  },

  chart_container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: 300,
    marginTop: 20,
    marginBottom: 20,
  },

  popular_container: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    width: '100%',
    height: 300,
    marginTop: 20,
    marginBottom: 100,
  },
})
