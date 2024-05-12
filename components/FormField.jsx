import { View, Text, TextInput } from "react-native";

const FormField = ({ title, value, pleaceholder, handleChangeText, otherStyles, ...props}) => {
  return (
    <View className={`space-y-2 flex-1 flex-row ${otherStyles}`}>
      <Text className="text-base text-gray-100 font-pmedium mt-6 px-4 flex-none">{title}</Text>
      <View className="h-16 px-4 bg-black-100 rounded-2xl border-2 border-black-200 focus:border-secondary grow items-center">
        <TextInput
          className="flex-1 text-white text-base"
          value={value}
          placeholder={pleaceholder}
          placeholderTextColor="#7B7B8B"
          onChangeText={handleChangeText}
          {...props}
        />
      </View>
    </View>
  )
}

export default FormField