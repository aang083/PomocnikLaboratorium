import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from "react-native-safe-area-context";
import { Text, View } from 'react-native';
import { Link } from 'expo-router';

export default function App() {
    return (
        <SafeAreaView className="bg-primary h-full">
            <View className="flex-1 items-center justify-center ">
                <Text className="text-3xl text-gray-100 mt-7 text-center">Pomocnik laboratorium</Text>
                <StatusBar backgroundColor="#161622" style="light" />
                <Link href={"/registration"} className='text-2xl mt-5 text-blue-200'>Rozpocznij laboratorium</Link>
            </View>
        </SafeAreaView>
    );
}