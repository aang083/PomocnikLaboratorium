import { View, Text, Button } from 'react-native'
import React from 'react'

const Tile = ( {name, surname, onRemove, IDPC}) => {
  return (
    <View>
      <Text>{name} {surname} {IDPC}<Button title="X" onPress={onRemove}/>
      </Text>
    </View>
  )
}

export default Tile