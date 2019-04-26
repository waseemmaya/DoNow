import React from "react";
import { Row, Caption, Heading, TouchableOpacity, Subtitle } from "@shoutem/ui";

import { View, Dimensions, Alert, StyleSheet } from "react-native";
import { connect } from "react-redux";
import ActionButton from "react-native-action-button";
import { ScrollView } from "react-native-gesture-handler";
import moment from "moment";
import { removeTask } from "../Redux/actions/actions";

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      taskName: "",
      loaded: false,
      backups: []
    };
  }
  render() {
    const { tasks } = this.props;

    return (
      <View style={{ flex: 1, width: Dimensions.get("window").width }}>
        {!!tasks.length ? (
          this.renderTasks()
        ) : (
          <View style={styles.container}>
            <Heading>No Task</Heading>
          </View>
        )}
        <ActionButton
          onPress={() => this.props.navigation.navigate("AddTask")}
          buttonColor="#212121"
        />
      </View>
    );
  }

  _viewTask = (v, i) => {
    let obj = {
      v: v,
      i: i
    };
    this.props.navigation.navigate("ViewTask", obj);
  };

  _onLongPressButton = (i, v) => {
    Alert.alert(
      `Delete ${v.task.taskName.substring(0, 5)}...`,
      "",
      [
        {
          text: "No",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "Yes", onPress: () => this.props.removeTask(i, v) }
      ],
      { cancelable: false }
    );
  };

  renderTasks = () => {
    const { tasks } = this.props;
    let a = tasks.sort((a, b) => {
      var dateA = new Date(a.task.momentDate);
      var dateB = new Date(b.task.momentDate);
      return dateB - dateA;
    });
    // Buttons
    return (
      <ScrollView>
        {a.map((v, i) => {
          return (
            <TouchableOpacity
              onLongPress={() => this._onLongPressButton(i, v)}
              key={i}
              onPress={() => this._viewTask(v, i)}>
              <Row
                style={{
                  borderBottomColor: "#E0E0E0",
                  borderBottomWidth: 1
                }}>
                <View styleName="vertical">
                  <Subtitle style={{ fontSize: 18 }} numberOfLines={1}>
                    {v.task.taskName}
                  </Subtitle>
                  <View styleName="horizontal space-between">
                    <Caption>
                      Added {moment(v.task.momentDate).fromNow()}
                    </Caption>
                    {/* <Caption>
                      {v.task.isEdit ? "Edited " : "Added "}
                      {moment(v.task.momentDate).fromNow()}
                    </Caption> */}
                  </View>
                </View>
              </Row>
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    );
  };
}

const mapStateToProps = state => {
  return {
    tasks: state.reducers.tasks
  };
};

const mapDispatchToProps = dispatch => {
  return {
    removeTask: (i, task) => dispatch(removeTask(i, task))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});
