import { View, Text, StyleSheet, TouchableOpacity, Button } from 'react-native'
import React, { useRef, useState } from 'react'
import { FontAwesome } from '@expo/vector-icons'

import { CameraView, CameraType, useCameraPermissions } from 'expo-camera'

export default function CameraScreen() {
  const [facing, setFacing] = useState<CameraType>('back')
  const [permission, requestPermission] = useCameraPermissions()
  const cameraRef = useRef(null)

  const [recordTime, setRecordTime] = useState(0)
  const [record, setRecord] = useState(false)

  const [viewChanger, setViewChanger] = useState(true)

  const [videoUri, setVideoUri] = useState(null)

  // setInterval(() => {
  //   setRecordTime(prev => prev + 1)
  //   console.log(recordTime)
  // },1000)

  if (!permission) {
    return <View />
  }

  const toggleCameraFacing = () => {
    setFacing(current => (current === 'back' ? 'front' : 'back'))
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <View
          style={{
            backgroundColor: 'white',
            width: 350,
            height: 200,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            borderRadius: 30,
            borderWidth: 5,
            borderColor: '#F88600',
          }}
        >
          <Text style={styles.message}>
            We need your permission to show the camera.
          </Text>
          <Button onPress={requestPermission} title="Grant permission" />
        </View>
      </View>
    )
  }

  const toggleCameraRecode = async () => {
    if (cameraRef) {
      if (!record) {
        setRecord(true)
        try {
          const data = await cameraRef.current.recordAsync()
          setVideoUri(data.uri)
          console.log(videoUri)
        } catch (e) {
          console.log(e)
        }
      } else {
        setRecord(false)
        try {
          const data = await cameraRef.current.stopRecording()
          setViewChanger(true)
        } catch (e) {
          console.log(e)
        }
      }
    }
  }

  const openCamera = () => {
    return (
      <CameraView
        style={styles.camera_view}
        facing={facing}
        mode="video"
        ref={cameraRef}
      >
        <View style={styles.camera_container}>
          <View style={styles.camera_top_container}>
            <TouchableOpacity
              style={[styles.face_change_btn, { borderWidth: 0 }]}
              onPress={() => {
                setViewChanger(true)
              }}
            >
              <FontAwesome name="close" size={30} color={'white'} />
            </TouchableOpacity>
            <View
              style={{
                borderWidth: 3,
                borderColor: 'white',
                borderRadius: 10,
                width: 100,

                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Text style={{ color: 'white', fontSize: 30 }}>{recordTime}</Text>
            </View>
            <TouchableOpacity
              style={styles.face_change_btn}
              onPress={toggleCameraFacing}
            >
              <FontAwesome name="undo" size={30} color={'white'} />
            </TouchableOpacity>
          </View>
          <View style={styles.camera_bottom_container}>
            <TouchableOpacity
              style={styles.recode_btn}
              onPress={toggleCameraRecode}
            >
              {record ? (
                <FontAwesome name="stop" size={35} color={'red'} />
              ) : (
                <FontAwesome name="circle" size={45} color={'red'} />
              )}
            </TouchableOpacity>
          </View>
        </View>
      </CameraView>
    )
  }

  const selectView = () => {
    return (
      <>
        <Text style={{ color: 'white' }}>CameraScreen</Text>
        <View style={styles.preview}>
          <Text>Preview Vedio</Text>
        </View>
        <View style={{ flexDirection: 'row' }}>
          <TouchableOpacity
            style={styles.btn}
            onPress={() => {
              setViewChanger(false)
            }}
          >
            <FontAwesome name="video-camera" size={30} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.btn}>
            <FontAwesome name="photo" size={30} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={[styles.btn, { width: 220 }]}>
          <FontAwesome name="upload" size={30} />
        </TouchableOpacity>
      </>
    )
  }

  return (
    <View style={styles.container}>
      {viewChanger ? selectView() : openCamera()}
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
  },

  btn: {
    width: 100,
    height: 50,
    backgroundColor: 'white',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    margin: 10,
  },

  preview: {
    backgroundColor: 'white',
    width: '80%',
    height: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 5,
    margin: 10,
  },

  message: {
    textAlign: 'center',
    paddingBottom: 10,
  },

  camera_view: {
    width: '100%',
    height: '100%',
  },
  camera_container: {
    display: 'flex',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 30,
  },

  camera_top_container: {
    width: '100%',
    display: 'flex',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginTop: 80,
  },
  camera_bottom_container: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  face_change_btn: {
    width: 45,
    height: 45,
    borderWidth: 3,
    borderColor: 'white',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
  },
  recode_btn: {
    width: 60,
    height: 60,
    borderWidth: 3,
    borderColor: 'white',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 30,
  },
})
