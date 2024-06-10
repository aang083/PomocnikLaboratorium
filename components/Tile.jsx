import { View, Text, Button } from 'react-native'
import React from 'react'

const Tile = ( {name, surname, onRemove, IDPC}) => {
  return (
    <View className="bg-tertiary flex flex-row">
      <Text className="flex">{name} </Text>
      <Text> {surname} </Text>
      <Text>{IDPC}</Text>
      <Button title="X" onPress={onRemove}/>
    </View>
  )
}

export default Tile