import { StyleSheet, Text, View, Image } from "react-native";
import React, { useState } from "react";
import BottomNav from "../Components/BottomNav";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { useSelector, useDispatch } from "react-redux";

import musicimg from "../../assets/music1.png";
import { setIsPlaying_global } from "../redux/action";

const Player = ({ navigation }) => {
	// const [isPlaying, setIsPlaying] = useState(false);
	const dispatch = useDispatch();

	const activesong_global = useSelector((state) => state.activesong_global);
	// console.log("this is the from the gloabal -----", activesong_global);

	const isPlaying = useSelector((state) => state.isplaying_gloabal);
	const isPlayingPlaylist = useSelector(
		(state) => state.isplayingplaylist_global
	);
	const isplayingmusicorplaylist = useSelector(
		(state) => state.isplayingmusicorplaylist
	);

	const playpausesong = () => {
		dispatch(setIsPlaying_global(!isPlaying));
	};

	return (
		<View style={styles.container}>
			{/* <Text style={{ color: "white" }}>player</Text> */}
			{activesong_global?.uri ? (
				<View style={styles.container}>
					<Image source={musicimg} style={styles.imgbig} />
					<View style={styles.container2}>
						<Text style={styles.text1}>{activesong_global?.filename}</Text>
						<Text style={styles.text2}>by - Aritst Name</Text>
					</View>
					<View style={styles.container3}>
						<View style={styles.musiccompletedout}>
							<View style={styles.musiccompletedin}></View>
						</View>
						<View style={styles.timecount}>
							<Text style={styles.time}>00:00</Text>
							<Text style={styles.time}>01:00</Text>
						</View>
					</View>
					{/* icons  */}
					<View style={styles.container4}>
						<MaterialCommunityIcons
							name="skip-previous"
							size={50}
							color="white"
						/>
						{isPlaying === false ? (
							<MaterialCommunityIcons
								name="play"
								size={50}
								color="white"
								onPress={() => {
									playpausesong();
								}}
							/>
						) : (
							<MaterialCommunityIcons
								name="pause"
								size={50}
								color="white"
								onPress={() => {
									playpausesong();
								}}
							/>
						)}
						<MaterialCommunityIcons name="skip-next" size={50} color="white" />
					</View>
				</View>
			) : (
				<View style={styles.container}>
					<Text style={styles.text1}>No song selected</Text>
				</View>
			)}

			<View style={styles.bottomnav}>
				<BottomNav activepage={`Player`} navigation={navigation} />
			</View>
		</View>
	);
};

export default Player;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "#fff",
		alignItems: "center",
		justifyContent: "center",
		backgroundColor: "black",
		width: "100%",
		height: "100%",
	},
	bottomnav: {
		position: "absolute",
		bottom: 0,
		width: "100%",
		alignItems: "center",
		zIndex: 10,
	},
	imgbig: {
		width: 300,
		height: 300,
		borderRadius: 150,
		marginVertical: 20,
	},
	text1: {
		fontSize: 20,
		color: "white",
		width: 300,
		textAlign: "center",
		alignSelf: "center",
		textTransform: "capitalize",
	},
	text2: {
		fontSize: 15,
		color: "red",
		width: 200,
		textAlign: "center",
		alignSelf: "center",
		textTransform: "capitalize",
	},
	container3: {
		width: "80%",
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		marginVertical: 30,
	},
	time: {
		color: "grey",
		fontSize: 15,
	},
	musiccompletedout: {
		width: "100%",
		height: 5,
		backgroundColor: "grey",
		borderRadius: 5,
	},
	musiccompletedin: {
		width: "50%",
		height: 5,
		backgroundColor: "white",
	},
	timecount: {
		flexDirection: "row",
		width: "100%",
		justifyContent: "space-between",
		marginVertical: 5,
	},
	container4: {
		width: "50%",
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
});
