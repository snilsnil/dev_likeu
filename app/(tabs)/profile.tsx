import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
} from 'react-native'
import React, { useEffect, useState } from 'react'

import USERDATA from '@/data/user.json'

import CreateOption from '@/components/CreateOption'
import CreateHeatmapViewer from '@/components/CreateHeatmapViewer'

export default function ProfileScreen() {
  const [userName, setUserName] = useState<String>()
  const [userImage, setUserImage] = useState<String>()

  // test
  const optionName = [
    { name: 'a', key: 1 },
    { name: 'b', key: 2 },
    { name: 'c', key: 3 },
    { name: 'd', key: 4 },
    { name: 'e', key: 5 },
    { name: 'f', key: 6 },
  ]

  // Need API Communication function
  const loadUserData = () => {
    setUserName(USERDATA['name'])
    setUserImage(USERDATA['img'])
  }

  useEffect(() => {
    loadUserData()
  }, [userName, userImage])

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
        <View style={styles.profile_view}>
          <TouchableOpacity style={styles.profile_img}>
            <Image
              source={
                userImage
                  ? { uri: String(userImage) }
                  : require('@/assets/images/icon.png')
              }
              style={styles.profile_img}
            />
          </TouchableOpacity>
          <Text
            style={{
              color: 'white',
              margin: 20,
              fontWeight: 800,
              fontSize: 20,
            }}
          >
            {userName ? userName : 'NONE'}
          </Text>
        </View>
        <View style={styles.hitmap_view}>
          <CreateHeatmapViewer />
        </View>
        <View style={styles.option_view}>
          {/* need key value
          Warning: CreateOption: `key` is not a prop. 
          Trying to access it will result in `undefined` being returned. 
          If you need to access the same value within the child component, you should pass it as a different prop. 
          (https://reactjs.org/link/special-props) */}
          {optionName.map(config => {
            return <CreateOption name={config.name} key={config.key} />
          })}
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
    marginTop: 90,
  },

  profile_view: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },

  profile_img: {
    width: 150,
    height: 150,
    backgroundColor: 'white',

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    borderRadius: 100,
  },

  hitmap_view: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',

    width: '100%',
  },

  option_view: {
    marginTop: 20,
    width: '100%',
    marginBottom: 80,

    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
