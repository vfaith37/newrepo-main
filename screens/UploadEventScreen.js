import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Form } from '../Components/ProductAdd'

const UploadEventScreen = () => {
  return (
    <View>
      <Form component={"Event"} />
      {/* <Text>UploadEventScreen</Text> */}
    </View>
  )
}

export default UploadEventScreen

const styles = StyleSheet.create({})