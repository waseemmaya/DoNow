import React from "react";
import { Row, TouchableOpacity, Text, View, Heading } from "@shoutem/ui";

import RNFetchBlob from "react-native-fetch-blob";
import { connect } from "react-redux";
import { ScrollView } from "react-native-gesture-handler";
import { restoreBackup } from "../Redux/actions/actions";
import { Dimensions, StyleSheet } from "react-native";

class RenderBackupList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <View style={{ flex: 1, width: Dimensions.get("window").width }}>
        {this.props.navigation.state.params.length === 0 ? (
          <View style={styles.container}>
            <Heading>No Backup found</Heading>
          </View>
        ) : (
          <ScrollView>
            {this.props.navigation.state.params.map((v, i) => {
              return (
                <TouchableOpacity
                  key={i}
                  onPress={() => this.restoreData(v.name)}>
                  <Row
                    style={{
                      borderBottomColor: "#E0E0E0",
                      borderBottomWidth: 1
                    }}>
                    <Text numberOfLines={1}>{v.name}</Text>
                  </Row>
                </TouchableOpacity>
              );
            })}
          </ScrollView>
        )}
      </View>
    );
  }

  restoreData = val => {
    const dirs = RNFetchBlob.fs.dirs;
    const PATH_TO_READ = `${dirs.SDCardDir}/DoNow/${val}`;
    RNFetchBlob.fs.readFile(PATH_TO_READ, "utf8").then(data => {
      this.props.restoreBackup(JSON.parse(data));
      alert("Success");

      this.props.navigation.navigate("Home", {});
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
    restoreBackup: newArr => dispatch(restoreBackup(newArr))
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RenderBackupList);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});
