import React from "react";
import { Text, View } from "@/components/Themed";
import { StatusBar } from "expo-status-bar";
import { Link } from "expo-router";
import { Provider as PaperProvider } from "react-native-paper";
import AlertButton from "@/components/AlertButton";
import { Button } from 'react-native-paper';
import { ImageBackground } from "react-native";
import BG from '../../assets/images/BG.webp'


export default function TabOneScreen() {
  return (
    <PaperProvider>
      <ImageBackground source={BG} resizeMode="cover" className="flex-1 items-center justify-center" >
      <View className="items-center justify-center bg-[#000000c0] rounded-xl w-full h-1/4">
        <Text className="text-3xl font-bold text-white">Do You Love Me?</Text>
        <View className="flex-row mt-8 right-8 rounded-2xl">
          <View className="rounded-3xl">
            <Link href="/two" asChild>
            <Button icon="emoticon-lol-outline" mode="contained">
    Yes
  </Button>
            </Link>
          </View>
          <AlertButton />
        </View>
        <StatusBar style="auto"/>
      </View>
      </ImageBackground>
    </PaperProvider>
  );
}
