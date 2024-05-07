import { TouchableOpacity, Text } from 'react-native'

const CustomButton = ({
  title,
  handlePress,
  containerStyles,
  textStyles,
}) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      className={`bg-secondary rounded-xl min-h-[40px] px-2 flex flex-row justify-center items-center ${containerStyles}`}
    >
      <Text className={`text-white text-lg ${textStyles}`}>
        {title}
      </Text>
  </TouchableOpacity>
  )
}

export default CustomButton;