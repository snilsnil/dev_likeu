import { View, Text, StyleSheet, Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'

import { SwiperFlatList } from 'react-native-swiper-flatlist'
const { width } = Dimensions.get('window')

import JSONDATA from '@/data/ad.json'

export default function CreateAdViewer() {
  const [ad, setAd] = useState<any[]>([])

  useEffect(() => {
    for (let i = 0; i < JSONDATA.length; i++) {
      setAd(prev => [...prev, [JSONDATA[i]['title'], JSONDATA[i]['color']]])
    }
  }, [])

  return (
    <SwiperFlatList
      autoplay
      autoplayDelay={3}
      autoplayLoop
      index={4}
      showPagination
      paginationStyle={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
      paginationStyleItemActive={{
        width: 10,
        height: 3,
      }}
      paginationStyleItemInactive={{
        width: 10,
        height: 3,
      }}
      data={ad}
      renderItem={({ item }) => (
        <View style={[styles.child, { backgroundColor: item[1] }]}>
          <Text style={{ fontSize: 30, fontWeight: 700, textAlign: 'center' }}>
            {item[0]}
          </Text>
        </View>
      )}
    />
  )
}

const styles = StyleSheet.create({
  child: { display: 'flex', justifyContent: 'center', width },
})
