import React from "react";
import { View, Text, SafeAreaView, TouchableOpacity } from "react-native";
import { Link } from "expo-router";
import { styled } from 'nativewind';

const StyledView = styled(View);
const StyledText = styled(Text);

export default function Page(params) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: '#1E1E1E' }}>
        <StyledView className="flex-1 p-4 mt-10">
          <StyledText className="text-white text-3xl mb-4">Ocenianie Sekcji {params.id}</StyledText>
          <TouchableOpacity className="bg-blue-600 p-2.5 rounded-md items-center justify-center mt-2.5">
            <Link href={`/assessment`} className="text-white text-lg text-center">
              <Text className="text-white text-lg text-center">Akceptuj</Text>
            </Link>
          </TouchableOpacity>
        </StyledView>
      </SafeAreaView>
    );
  }