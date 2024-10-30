import React from "react";
import { StyleSheet } from "react-native";
import { FontAwesome } from "@expo/vector-icons";
import { ExternalLink } from "./ExternalLink";
import { MonoText } from "./StyledText";
import { View } from "./Themed";

export default function EditScreenInfo() {
  return (
    <View>
      <View style={styles.getStartedContainer}>
        <MonoText
          style={styles.getStartedText2}
          lightColor="rgba(0,0,0,0.8)"
          darkColor="rgba(255,255,255,0.8)"
        >
          Hello, I'm Mehmet Salih Bozkir.
        </MonoText>
        <MonoText
          style={styles.getStartedText2}
          lightColor="rgba(0,0,0,0.8)"
          darkColor="rgba(255,255,255,0.8)"
        >
          This is my first mobile project so I need your help.
        </MonoText>
        <MonoText
          style={styles.getStartedText2}
          lightColor="rgba(0,0,0,0.8)"
          darkColor="rgba(255,255,255,0.8)"
        >
          I would be grateful if you comment on the application.
        </MonoText>
      </View>

      <View style={styles.helpContainer}>
        <ExternalLink href="https://github.com/MehmetBozkir">
          <FontAwesome size={36} name="github" color="white"/>
        </ExternalLink>
        <ExternalLink href="https://www.linkedin.com/in/mehmet-salih-bozk%C4%B1r/">
          <FontAwesome size={36} name="linkedin-square" color="white" />
        </ExternalLink>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  getStartedContainer: {
    alignItems: "center",
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  getStartedText: {
    fontSize: 17,
    lineHeight: 24,
    textAlign: "center",
    marginTop: 15,
  },
  getStartedText2: {
    fontSize: 14,
    lineHeight: 24,
    textAlign: "center",
    marginTop: 15,
  },
  helpContainer: {
    marginTop: 15,
    marginHorizontal: 20,
    marginRight: 20,
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    textAlign: "center",
  },
});
