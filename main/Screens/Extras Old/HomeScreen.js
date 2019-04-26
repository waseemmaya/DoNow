import React from "react";
import { View, TextInput, Button, NetInfo } from "react-native";
import { connect } from "react-redux";
import { addTask, removeTask } from "../Redux/actions/actions";
import moment from "moment";
import fire from "../config/fire";
import ActionButton from "react-native-action-button";
import { AppLoading, Font } from "expo";
import {
  Text,
  Screen,
  Row,
  Subtitle,
  Caption,
  Image,
  Icon,
  Divider
} from "@shoutem/ui";
import { ScrollView } from "react-native-gesture-handler";

class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      taskName: "",
      status: false,
      loaded: false
    };
  }
  render() {
    if (!this.state.loaded) {
      return (
        <AppLoading
          startAsync={this._loadFonts}
          onFinish={() => this.setState({ loaded: true })}
          onError={console.warn}
        />
      );
    }
    return (
      <View>
        {/* <Text>Task View</Text>
        <TextInput
          style={{ height: 40, borderColor: "gray", borderWidth: 1 }}
          onChangeText={taskName => this.setState({ taskName })}
          value={this.state.taskName}
        />
        <Text>{this.state.status ? "Online" : "Offline"}</Text>
        <Button onPress={this._addTask} title="Add Task" color="#841584" />
        <Button
          onPress={this._removeTask}
          title="Remove Task"
          color="#841584"
        /> */}
        {this.renderTasks()}
        {this.renderActionButton()}
      </View>
    );
  }

  renderTasks = () => {
    const { tasks } = this.props;
    return (
      <ScrollView>
        {!!tasks.length &&
          tasks.map((v, i) => {
            return (
              <Row
                key={i}
                style={{
                  borderBottomColor: "#E0E0E0",
                  borderBottomWidth: 1
                }}>
                <Icon name="edit" />
                <View styleName="vertical">
                  <Text numberOfLines={2}>{v.task.taskName}</Text>
                  <View styleName="horizontal space-between">
                    <Caption>{moment(v.task.momentDate).fromNow()}</Caption>
                  </View>
                </View>
              </Row>
            );
          })}
      </ScrollView>
    );
  };

  renderActionButton = () => {
    return <ActionButton buttonColor="#212121" onPress={this._addTask} />;
  };

  componentDidMount() {
    // this.getData();

    NetInfo.isConnected.addEventListener(
      "connectionChange",
      this.handleConnectionChange
    );

    NetInfo.isConnected.fetch().done(isConnected => {
      if (isConnected) {
        // this.sendData();
      }
      this.setState({ status: isConnected });
    });
  }

  async _loadFonts() {
    await Font.loadAsync({
      "Rubik-Regular": require("../../node_modules/@shoutem/ui/fonts/Rubik-Regular.ttf"),
      "rubicon-icon-font": require("../../node_modules/@shoutem/ui/fonts/rubicon-icon-font.ttf")
    });
  }

  getData = () => {
    const { user } = this.props;
    let ref = fire.database().ref(`ToDoNow/Tasks/${user.id}`);
    ref.on("child_added", snap => {
      let a = snap.val();

      this.props.addTask(a);
    });
  };

  sendData = () => {
    const { tasks, user } = this.props;
    tasks.map(v => {
      // console.log(v.task.taskID);
      let ref = fire.database().ref(`ToDoNow/Tasks/${user.id}/${v.taskID}`);
      ref.set(v);
    });
  };

  componentWillUnmount() {
    if (this.state.status) {
      this.sendData();
    }
    NetInfo.isConnected.removeEventListener(
      "connectionChange",
      this.handleConnectionChange
    );
  }

  handleConnectionChange = isConnected => {
    this.setState({ status: isConnected });
    console.log(`is connected===============>: ${this.state.status}`);
  };

  _removeTask = () => {
    this.props.removeTask();
  };

  _addTask = () => {
    const { taskName } = this.state;
    if (!taskName) {
      alert("Enter Task");
      return;
    }
    var taskID = Math.floor(100444000 + Math.random() * 90012000);
    const taskObj = {
      taskID: taskID,
      task: {
        taskName: taskName,
        momentDate: moment().format()
      }
    };
    console.log("taskobj---->", taskObj.task);

    this.props.addTask(taskObj);
    this.setState({
      taskName: ""
    });
  };
}

const mapStateToProps = state => {
  return {
    tasks: state.reducers.tasks,
    user: state.reducers.user
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
)(HomeScreen);
