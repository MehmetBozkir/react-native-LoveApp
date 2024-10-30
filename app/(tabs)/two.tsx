import React, { useState, useRef } from "react";
import { Text, View, StyleSheet, ImageBackground, TouchableOpacity, Alert, Animated } from "react-native";
import { styled } from "nativewind";
import { Slider, Icon } from '@rneui/themed';
import BG3 from '../../assets/images/BG2.webp';
import { Button } from 'react-native-paper';
import * as Sharing from 'expo-sharing';
import ViewShot from "react-native-view-shot";

const StyledView = styled(View);
const StyledText = styled(Text);

export default function TabTwoScreen() {
  const [randomNumber, setRandomNumber] = useState<number | null>(null);
  const [buttonClicked, setButtonClicked] = useState(false);
  const [warningMessage, setWarningMessage] = useState(false);
  const [flashAnimation] = useState(new Animated.Value(0));
  const viewRef = useRef<ViewShot | null>(null);

  const interpolate = (start: number, end: number) => {
    if (randomNumber === null) return start; 
    let k = (randomNumber - 0) / 100; 
    return Math.ceil((1 - k) * start + k * end) % 256;
  };

  const color = () => {
    let r = interpolate(255, 0);
    let g = interpolate(0, 255);
    let b = interpolate(0, 0);
    return `rgb(${r},${g},${b})`;
  };

  const handleButtonClick = () => {
    if (!buttonClicked) {
      const randomNum = Math.floor(Math.random() * 101);
      setRandomNumber(randomNum);
      setButtonClicked(true); 
    } else {
      setWarningMessage(true);
    }
  };

  const triggerFlash = () => {
    Animated.sequence([
      Animated.timing(flashAnimation, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(flashAnimation, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handleShare = async () => {
    try {
      triggerFlash();
      if (!viewRef.current || !viewRef.current.capture) {
        Alert.alert('Error', 'ViewShot component not found or capture method not available');
        return;
      }
      const uri = await viewRef.current.capture();
      if (!uri) return;
      if (!(await Sharing.isAvailableAsync())) {
        Alert.alert('Sharing is not available on this device');
        return;
      }
  
      await Sharing.shareAsync(uri);
    } catch (error) {
      console.error("Error sharing the image: ", error);
    }
  };

  return (
    <StyledView className="flex-1">
      <ViewShot ref={viewRef} style={{ flex: 1 }} options={{ format: "png", quality: 0.9 }}>
        <ImageBackground source={BG3} resizeMode="cover" className="flex-1 items-center justify-center">
          <StyledText className="text-2xl font-bold mb-4">
            Do you want to know
          </StyledText>
          <StyledText className="text-2xl font-bold mb-6">
            how much he loves you?
          </StyledText>
          <Button icon="all-inclusive" mode="contained" onPress={handleButtonClick}>
            FIND OUT
          </Button>
          <View style={styles.contentView}>
            <Slider
              value={randomNumber ?? 0}
              maximumValue={100}
              minimumValue={0}
              step={1}
              disabled 
              trackStyle={{ height: 5, backgroundColor: 'transparent' }}
              thumbStyle={{ height: 20, width: 20, backgroundColor: 'transparent' }}
              thumbProps={{
                children: (
                  <Icon
                    name="heartbeat"
                    type="font-awesome"
                    size={20}
                    reverse
                    containerStyle={{ bottom: 20, right: 20 }}
                    color={color()}
                  />
                ),
              }}
            />
          </View>
          {randomNumber !== null && (
            <View>
              <StyledText className="text-xl font-semibold mt-4 text-white">
                Love Score: {randomNumber}%
              </StyledText>
              <TouchableOpacity onPress={handleShare} style={styles.shareButton}>
              <Button icon="share-variant" mode="contained">
            Share
          </Button>
      </TouchableOpacity>
            </View>
          )}
          {warningMessage && (
            <StyledText className="text-xs font-medium mt-2 text-blue-400 bottom-4 absolute w-1/2 text-center">
              Love is not so simple that it can be changed at the push of a button
            </StyledText>
          )}
        </ImageBackground>
      </ViewShot>
      <Animated.View
        pointerEvents="none"
        style={[
          styles.flash,
          {
            opacity: flashAnimation,
          },
        ]}
      />
    </StyledView>
  );
}

const styles = StyleSheet.create({
  contentView: {
    padding: 20,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'stretch',
  },
  shareButton: {
    marginTop: 20,
    alignSelf: 'center',
    zIndex: 2, 
  },
  flash: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'white',
    zIndex: 1, // Ensure the flash is below the button
  },
});
