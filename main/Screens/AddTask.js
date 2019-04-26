import React from "react";
import { connect } from "react-redux";
import { View, TextInput, KeyboardAvoidingView } from "react-native";

import { addTask, removeTask } from "../Redux/actions/actions";
import { Text, Button } from "@shoutem/ui";
import moment from "moment";
import { ScrollView } from "react-native-gesture-handler";

class AddTask extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      taskName: "",
      loaded: false
    };
  }
  render() {
    return (
      <KeyboardAvoidingView style={{ flex: 1 }} behavior="padding" enabled>
        <ScrollView>
          <TextInput
            style={{
              fontSize: 18,
              textAlignVertical: "top",
              padding: 10
            }}
            multiline={true}
            autoFocus={true}
            placeholder="Write your task here auto save enabled"
            textContentType="none"
            enablesReturnKeyAutomatically={true}
            onChangeText={taskName => this.setState({ taskName })}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }

  renderButton = () => {
    return (
      <Button styleName="secondary" onPress={this._removeTask}>
        <Text>Remove All</Text>
      </Button>
    );
  };

  _removeTask = () => {
    this.props.removeTask();
  };

  componentWillUnmount() {
    this._addTask();
  }

  _addTask = () => {
    const { taskName } = this.state;
    if (!taskName) {
      return;
    }
    var taskID = Math.floor(100444000 + Math.random() * 90012000);
    const taskObj = {
      taskID: taskID,
      task: {
        isEdit: false,
        taskName: taskName,
        editDate: null,
        momentDate: moment().format()
      }
    };
    this.props.addTask(taskObj);
    this.setState({
      taskName: ""
    });
  };
}

const mapStateToProps = state => {
  return {
    tasks: state.reducers.tasks
  };
};

const mapDispatchToProps = dispatch => {
  return {
    addTask: task => dispatch(addTask(task)),
    removeTask: () => dispatch(removeTask())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AddTask);
