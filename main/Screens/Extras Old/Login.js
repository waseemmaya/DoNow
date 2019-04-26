import React from "react";
import { Text, View, Button } from "react-native";
import { connect } from "react-redux";
import { updateUser, removeUser } from "../../Redux/actions/actions";
import fire from "../../config/fire";

const APP_ID = "354264045362356";

class Login extends React.Component {
  render() {
    // console.log(this.props);
    const { user } = this.props;
    return (
      <View>
        <Text style={{ fontSize: 22, alignSelf: "center" }}>Login</Text>
        <Text style={{ fontSize: 22 }}>
          {user ? JSON.stringify(user) : "Not Logged in"}
        </Text>

        <Button
          onPress={this._login}
          title="Login With Facebook"
          color="#841584"
        />
        <Button onPress={this._skip} title="Skip" color="#841584" />
      </View>
    );
  }

  componentDidMount() {
    if (this.props.user) {
      this.props.navigation.replace("HomeScreen");
    }
  }

  checkUser = () => {
    let ref = fire.database().ref("ToDoNow/Tasks");
  };

  _login = async () => {
    try {
      const {
        type,
        token,
        expires,
        permissions,
        declinedPermissions
      } = await Expo.Facebook.logInWithReadPermissionsAsync(APP_ID, {
        permissions: ["public_profile"]
      });
      if (type === "success") {
        fetch(`https://graph.facebook.com/me?access_token=${token}`)
          .then(res => res.json())
          .then(val => {
            let ref = fire.database().ref(`ToDoNow/Users/${val.id}`);
            var obj = {
              name: val.name,
              id: val.id
            };
            ref.set(obj).then(() => {
              this.props.updateUser(obj);
              this.props.navigation.navigate("HomeScreen");
            });
          });

        // Alert.alert("Logged isn!", `Hi ${(await response.json()).name}!`);
      } else {
      }
    } catch ({ message }) {
      alert(`Facebook Login Error: ${message}`);
    }
  };

  _skip = () => {
    this.props.updateUser(null);
  };
}

const mapStateToProps = state => {
  return {
    user: state.reducers.user
  };
};

const mapDispatchToProps = dispatch => {
  return {
    updateUser: user => dispatch(updateUser(user)),
    removeUser: user => dispatch(removeUser(user))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
