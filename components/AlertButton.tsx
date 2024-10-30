import React, { useState, useRef } from "react";
import { Animated, StyleSheet, Dimensions } from "react-native";
import { Dialog, Portal, Text } from 'react-native-paper';
import { View } from "./Themed";
import { Button } from 'react-native-paper';

const AlertButton = () => {
  const [visible, setVisible] = useState(false);

  const hideDialog = () => setVisible(false);
  const [clickCount, setClickCount] = useState(0);
  const position = useRef(new Animated.ValueXY({ x: 0, y: 0 })).current;

  const handleNoButtonPress = () => {
    setClickCount((prevCount) => prevCount + 1);

    if ((clickCount + 1) % 5 === 0) {
      setVisible(true);
    } else {
      moveButtonRandomly();
    }
  };

  const moveButtonRandomly = () => {
    const { width, height } = Dimensions.get("window");
    const randomX =
      Math.random() * (width / 5) * (Math.random() < 0.5 ? 1 : -1);
    const randomY =
      Math.random() * (height / 3) * (Math.random() < 0.5 ? 1 : -1);

    Animated.spring(position, {
      toValue: { x: randomX, y: randomY },
      useNativeDriver: true,
    }).start();
  };

  return (
    <View>
      <Animated.View
        style={[
          styles.buttonContainer,
          {
            transform: [
              { translateX: position.x },
              { translateY: position.y },
            ],
          },
        ]}
      >
          <Button icon="emoticon-cry-outline" mode="contained" onPress={handleNoButtonPress}>
    No
  </Button>
      </Animated.View>
      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Icon icon="emoticon-angry-outline" />
          <Dialog.Title style={styles.title}>Please don't</Dialog.Title>
          <Dialog.Content>
            <Text variant="bodyMedium" style={styles.title}>I don't want to accept this!!</Text>
          </Dialog.Content>
        </Dialog>
      </Portal>
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    textAlign: "center",
  },
  buttonContainer: {
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
  },
});

export default AlertButton;
