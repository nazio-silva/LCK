import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Header } from "react-native-elements";
import Icon from "react-native-vector-icons/dist/FontAwesome";

import Logo from "./Logo";

export default class Profile extends React.Component {
  static navigationOptions = {
    header: null,
    drawerIcon: () => (
      <View>
        <Icon name="user" size={20} color={"black"} />
      </View>
    ),
  };
  render() {
    return (
      <View>
        <Header
          leftComponent={
            <Icon
              name="bars"
              size={30}
              color="white"
              onPress={() => this.props.navigation.openDrawer()}
            />
          }
          centerComponent={{
            text: "PROFILE",
            style: {
              color: "#fff",
              fontSize: 30,
              width: "100%",
              textAlign: "center",
            },
          }}
        />

        <View style={styles.logo}>
          <Logo />
        </View>

        <View style={styles.view_text}>
          <Text style={styles.texto}> JOÃO SILVA </Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  logo: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  view_text: {
    marginTop: 180,
    justifyContent: "center",
    alignItems: "center",
  },
  texto: {
    fontSize: 30,
    color: 'red',
    fontFamily: "bold",
  },
});

/*

const mapStateToProps = state => ({
  nome: state.nome
})
​
const mapDispatchToProps = dispatch => ({
  nome: dispatch.nome
})
​
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile)
*/
