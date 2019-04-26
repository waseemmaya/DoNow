import React from "react";
import { connect } from "react-redux";
import { View, TextInput, KeyboardAvoidingView } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { addTask, removeTask, updateTask } from "../Redux/actions/actions";
import { Text, Button } from "@shoutem/ui";
import moment from "moment";
import DoubleClick from "react-native-double-click";
class ViewTask extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      taskName: this.props.navigation.state.params.v.task.taskName
    };
  }

  render() {
    const { task } = this.props.navigation.state.params.v;
    return (
      <KeyboardAvoidingView enabled behavior="padding">
        <ScrollView>
          <TextInput
            style={{
              margin: 6,
              fontSize: 16,
              lineHeight: 24,
              textAlignVertical: "top"
            }}
            editable={true}
            multiline={true}
            dataDetectorTypes={"all"}
            // numberOfLines={25}
            value={this.state.taskName}
            textContentType="none"
            enablesReturnKeyAutomatically={true}
            onChangeText={taskName => this.setState({ taskName })}
          />
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }

  _updateTask = () => {
    const { taskName } = this.state;
    const { i } = this.props.navigation.state.params;
    if (this.props.navigation.state.params.v.task.taskName !== taskName) {
      let task = {
        isEdit: true,
        taskName: taskName,
        editDate: moment().format()
      };
      this.props.updateTask(i, task);
      this.setState({
        taskName: ""
      });
    } else {
      console.log("No Change");
    }
  };

  componentWillUnmount() {
    this._updateTask();
  }

  renderButton = () => {
    return (
      <Button styleName="secondary" onPress={this._removeTask}>
        <Text>Remove All</Text>
      </Button>
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
    addTask: task => dispatch(addTask(task)),
    updateTask: (i, task) => dispatch(updateTask(i, task)),
    removeTask: () => dispatch(removeTask())
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ViewTask);
