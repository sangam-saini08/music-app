import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
//routes
import AllMusic from "./src/Screens/AllMusic";
import AllPlaylists from "./src/Screens/AllPlaylists";
import Player from "./src/Screens/Player";
import Addtoplaylist from "./src/Screens/Addtoplaylist";

import { Provider } from "react-redux";
import { Store } from "./src/redux/store";

const Stack = createNativeStackNavigator();

export default function App() {
	return (
		<Provider store={Store}>
			<NavigationContainer>
				<Stack.Navigator initialRouteName="allmusic">
					<Stack.Screen
						name="player"
						component={Player}
						options={{
							//
							headerShown: false,
						}}
					/>
					<Stack.Screen
						name="allmusic"
						component={AllMusic}
						options={{
							headerStyle: {
								backgroundColor: "#21CEF2",
								color: "white",
							},
							headerTintColor: "white",
							headerTitleStyle: {
								fontWeight: "900",
							},
						}}
					/>
					<Stack.Screen
						name="allplaylists"
						component={AllPlaylists}
						options={{
							headerStyle: {
								backgroundColor: "#21CEF2",
								color: "white",
							},
							headerTintColor: "white",
							headerTitleStyle: {
								fontWeight: "900",
							},
						}}
					/>
					<Stack.Screen
						name="addtoplaylist"
						component={Addtoplaylist}
						options={{
							headerStyle: {
								backgroundColor: "#21CEF2",
								color: "white",
							},
							headerTintColor: "white",
							headerTitleStyle: {
								fontWeight: "900",
							},
						}}
					/>
				</Stack.Navigator>
			</NavigationContainer>
		</Provider>
	);
}
