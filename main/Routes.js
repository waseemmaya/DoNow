import {
  createDrawerNavigator,
  createAppContainer,
  createStackNavigator
} from "react-navigation";
import { Dimensions } from "react-native";
import AddTask from "./Screens/AddTask";
import ViewTask from "./Screens/ViewTask";
import HomeScreen from "./Screens/HomeScreen";
import Setting from "./Screens/Setting";
import RenderBackupList from "./Screens/RenderBackupList";

const AppStackNavigator = createStackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: () => ({
      title: `Tasks`,
      headerStyle: {
        backgroundColor: "#212121"
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        width: Dimensions.get("window").width
      }
    })
  },
  AddTask: {
    screen: AddTask,
    navigationOptions: () => ({
      title: `Add Task`,
      headerStyle: {
        backgroundColor: "#212121"
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        width: Dimensions.get("window").width
      }
    })
  },
  ViewTask: {
    screen: ViewTask,
    navigationOptions: () => ({
      title: `Task View`,
      headerStyle: {
        backgroundColor: "#212121"
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        width: Dimensions.get("window").width
      }
    })
  },
  RenderBackupList: {
    screen: RenderBackupList,
    navigationOptions: () => ({
      title: `Backup List`,
      headerStyle: {
        backgroundColor: "#212121"
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        width: Dimensions.get("window").width
      }
    })
  }
});

const AppNavigator = createDrawerNavigator({
  AppStackNavigator: {
    screen: AppStackNavigator,
    navigationOptions: () => ({
      title: `Home`,
      headerStyle: {
        backgroundColor: "#212121"
      },
      headerTintColor: "#fff",
      headerTitleStyle: {
        width: Dimensions.get("window").width
      }
    })
  },
  Setting: {
    screen: Setting
  }
});

const Routes = createAppContainer(AppNavigator);

export default Routes;
