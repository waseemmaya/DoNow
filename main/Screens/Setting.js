import React from "react";
import { connect } from "react-redux";
import { View, StyleSheet, Dimensions } from "react-native";
import AwesomeAlert from "react-native-awesome-alerts";
import { Text, Button, Heading } from "@shoutem/ui";
import moment from "moment";
import RNFetchBlob from "react-native-fetch-blob";
import { restoreBackup } from "../Redux/actions/actions";

class Setting extends React.Component {
  static navigationOptions = {
    title: "Setting"
  };
  constructor(props) {
    super(props);
    this.state = {
      taskName: "",
      loaded: false,
      backups: [],
      showAlert: false
    };
  }
  render() {
    const { showAlert } = this.state;
    return (
      <View style={{ flex: 1, width: Dimensions.get("window").width }}>
        <View style={styles.container}>
          <Button styleName="secondary" onPress={this.exportData}>
            <Text>Backup</Text>
          </Button>
          <View
            style={{
              margin: 20
            }}
          />
          <Button
            styleName="secondary"
            onPress={() =>
              this.props.navigation.navigate(
                "RenderBackupList",
                this.state.backups
              )
            }>
            <Text>Restore</Text>
          </Button>
        </View>
        <AwesomeAlert
          show={showAlert}
          showProgress={false}
          title="Oooops Sorry...!"
          message="No Data available for backup..!"
          closeOnTouchOutside={true}
          closeOnHardwareBackPress={false}
          showCancelButton={false}
          showConfirmButton={true}
          cancelText=""
          confirmText="Okay..!"
          confirmButtonColor="#DD6B55"
          onCancelPressed={() => {
            this.hideAlert();
          }}
          onConfirmPressed={() => {
            this.hideAlert();
          }}
        />
      </View>
    );
  }

  showAlert = () => {
    this.setState({
      showAlert: true
    });
  };

  hideAlert = () => {
    this.setState({
      showAlert: false
    });
  };

  componentDidMount() {
    this.readFile();
  }

  readFile = () => {
    var RNFS = require("react-native-fs");
    const dirs = RNFetchBlob.fs.dirs;
    const PATH_TO_READ = `${dirs.SDCardDir}/DoNow`;
    // get a list of files and directories in the main bundle
    RNFS.readDir(PATH_TO_READ)
      .then(result => {
        this.setState({
          backups: result
        });
      })
      .catch(err => {
        console.log(err.message, err.code);
      });
  };

  exportData = () => {
    const { tasks } = this.props;
    if (tasks.length === 0) {
      this.setState({
        showAlert: true
      });
      return;
    }
    let date = new Date();
    let stringDate = moment(date)
      .format("MMMM Do YYYY, h:mm:ss a")
      .toString();

    // Directory / SdCard and make a folder DoNow
    const dirs = RNFetchBlob.fs.dirs;
    const pathToWrite = `${dirs.SDCardDir}/DoNow/${stringDate}`;

    // Write File in that directory
    const fs = RNFetchBlob.fs;
    fs.writeFile(pathToWrite, JSON.stringify(tasks), "utf8");

    alert("Success");
  };
}

const mapStateToProps = state => {
  return {
    tasks: state.reducers.tasks
  };
};

const mapDispatchToProps = dispatch => {
  return {
    restoreBackup: newArr => dispatch(restoreBackup(newArr))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Setting);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});
