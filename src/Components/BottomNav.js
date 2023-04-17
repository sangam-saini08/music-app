import { StyleSheet, Text, View } from "react-native";
import React from "react";

//icons imp
import { MaterialCommunityIcons, Entypo } from "@expo/vector-icons";

const BottomNav = ({ activepage, navigation }) => {
	return (
		<View style={styles.container}>
			{activepage === "AllMusic" ? (
				<Entypo
					name="folder-music"
					size={54}
					color="white"
					style={styles.iconactive}
				/>
			) : (
				<Entypo
					name="folder-music"
					size={44}
					color="white"
					style={styles.icon}
					onPress={() => navigation.navigate("allmusic")}
				/>
			)}
			{activepage === "Player" ? (
				<MaterialCommunityIcons
					name="headphones"
					size={54}
					color="white"
					style={styles.iconactive}
				/>
			) : (
				<MaterialCommunityIcons
					name="headphones"
					size={44}
					color="white"
					style={styles.icon}
					onPress={() => navigation.navigate("player")}
				/>
			)}
			{activepage === "AllPlaylists" ? (
				<MaterialCommunityIcons
					name="playlist-music"
					size={54}
					color="white"
					style={styles.iconactive}
				/>
			) : (
				<MaterialCommunityIcons
					name="playlist-music"
					size={44}
					color="white"
					style={styles.icon}
					onPress={() => navigation.navigate("allplaylists")}
				/>
			)}

			{/* <Text>BottomNav</Text> */}
		</View>
	);
};

export default BottomNav;

const styles = StyleSheet.create({
	container: {
		width: "100%",
		flexDirection: "row",
		alignItems: "flex-end",
		justifyContent: "space-evenly",
		backgroundColor: "#0f0f0f",
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
		elevation: 10,
		padding: 5,
		// marginBottom: 5,
		// height: 55,
	},
	icon: {
		marginHorizontal: 100,
	},
	iconactive: {
		backgroundColor: "#00C4CC",
		borderRadius: 50,
		padding: 10,
		position: "absolute",
		bottom: 5,
		left: "40%",
	},
});
