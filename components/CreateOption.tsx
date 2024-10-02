import { StyleSheet, TouchableOpacity, View, Text } from 'react-native'
import React from 'react'

type Props = {
  name: string
  key: number
}

export default function CreateOption({ name, key }: Props) {
  return (
    <TouchableOpacity
      style={styles.option_btn}
      key={key}
      onPress={() => {
        console.log(name)
      }}
    >
      <View>
        <Text style={{ color: 'white' }}>Option {name}</Text>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  option_btn: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',

    width: '90%',
    height: 50,
    marginBottom: 10,

    borderTopWidth: 2,
    borderTopColor: 'gray',
    borderBottomWidth: 2,
    borderBottomColor: 'gray',
  },
})
