import React from "react";

import Icon from "react-native-vector-icons/dist/FontAwesome";
import FormLogin from "./FormLogin";

export default class Exit extends React.Component {
  static navigationOptions = {
    header: null,
    drawerIcon: () => <Icon name="sign-out" size={20} color={"black"} />,
    drawerBackgroundColor: "yellow",
  };
  render() {
    return <FormLogin />;
  }
}
