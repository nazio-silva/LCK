import React from "react";
import { View, Image, StyleSheet } from "react-native";

export default class Logo extends React.Component {
  render() {
    return (
      <View style={styles.view}>
        <Image style={styles.logo} source={require("../image/logo.png")} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  view: {
    marginTop: 40,
    height: 150,
    marginBottom: 100
  },
  logo: {
    justifyContent: "center",
    alignItems: "center",
    height: 150,
    width: 150,
  },
});

