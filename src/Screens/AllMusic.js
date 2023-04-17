import { ScrollView, StyleSheet, Text, View, Image } from "react-native";
import React, { useEffect, useState } from "react";
import BottomNav from "../Components/BottomNav";
import * as MediaLibrary from "expo-media-library";
import { useSelector, useDispatch } from "react-redux";
import {
	setActiveSong_global,
	setAllSongs,
	setIsPlayingMusicOrPlaylist_global,
	setIsPlayingPlaylist_global,
	setIsPlaying_global,
} from "../redux/action";
import { AntDesign, MaterialIcons } from "@expo/vector-icons";

import musicimg from "../../assets/music1.png";
import musicimgactive from "../../assets/music2.png";

import AsyncStorage from "@react-native-async-storage/async-storage";

const AllMusic = ({ navigation }) => {
	const mysongs = useSelector((state) => state.allsongs);
	const dispatch = useDispatch();
	// const d = mysongs.assets[14].filename;

	// console.log(mysongs.assets.filename);
	// console.log(d);

	const getPermission = async () => {
		const permission = await MediaLibrary.getPermissionsAsync();

		if (permission.granted === true) {
			console.log("permission granted,showing all music");
			getAllSongs();
		} else {
			const askPermission = await MediaLibrary.requestPermissionsAsync();
			if (permission.granted === true) {
				console.log("permission granted,showing all music");

				getAllSongs();
			}
		}
	};
	useEffect(() => {
		getPermission();
	}, []);
	const getAllSongs = async () => {
		const songs = await MediaLibrary.getAssetsAsync({
			mediaType: "audio",
		});
		dispatch(setAllSongs(songs));
		// console.log(songs.assets);
	};

	// let activesonguri = "null";
	// if (mysongs?.assets) {
	// 	activesonguri = mysongs?.assets[3].uri;
	// }

	//hooks for the active songs
	const [activesong, setActivesong] = useState("");

	//value from the redux
	const activesong_global = useSelector((state) => state.activesong_global);

	//value form the local storage
	const getlocalsong = async () => {
		AsyncStorage.getItem("activesong_localstorage").then((value) => {
			// console.log("local ----", value);
			dispatch(setActiveSong_global(JSON.parse(value)));
			setActivesong(JSON.parse(value));
		});
	};

	useEffect(() => {
		getlocalsong();
		setActivesong(activesong_global);
	}, []);

	//isplayinn g hooks
	const isPlaying = useSelector((state) => state.isplaying_gloabal);

	//function
	const updatecurrentsong = (item) => {
		dispatch(setIsPlayingMusicOrPlaylist_global("music"));
		dispatch(setIsPlayingPlaylist_global(false));

		setActivesong(item);
		dispatch(setActiveSong_global(item));
		dispatch(setIsPlaying_global(true));
		// console.log(activesong_global);
		try {
			AsyncStorage.setItem("activesong_localstorage", JSON.stringify(item));
		} catch (e) {
			console.log(e);
		}
	};

	//global upadate the state
	const playpausesong = () => {
		dispatch(setIsPlaying_global(!isPlaying));
		dispatch(setIsPlayingPlaylist_global(false));
	};

	return (
		<View style={styles.container}>
			<Text style={styles.head1}>Your Songs</Text>
			<ScrollView style={styles.cont2}>
				{mysongs?.assets &&
					mysongs.assets.map((item) => (
						<View key={item.id}>
							{item.uri == activesong.uri ? (
								<View style={styles.songcardactive}>
									<Image
										source={musicimgactive}
										style={styles.songimageactive}
									/>
									<Text style={styles.songtitle1}>{item.filename}</Text>
									{isPlaying == true ? (
										<AntDesign
											name="pausecircle"
											size={26}
											color="black"
											style={styles.icon}
											onPress={() => playpausesong()}
										/>
									) : (
										<AntDesign
											name="playcircleo"
											size={26}
											color="black"
											style={styles.icon}
											onPress={() => playpausesong()}
										/>
									)}
									<MaterialIcons
										name="playlist-add"
										size={26}
										color="black"
										style={styles.icon}
										onPress={() => {
											navigation.navigate("addtoplaylist", { song: item });
										}}
									/>
								</View>
							) : (
								<View style={styles.songcard}>
									<Image source={musicimg} style={styles.songimage} />
									<Text style={styles.songtitle}>{item.filename}</Text>
									<AntDesign
										name="playcircleo"
										size={24}
										color="white"
										style={styles.icon}
										onPress={() => updatecurrentsong(item)}
									/>
									<MaterialIcons
										name="playlist-add"
										size={24}
										color="white"
										style={styles.icon}
										onPress={() => {
											navigation.navigate("addtoplaylist", { song: item });
										}}
									/>
								</View>
							)}
						</View>
					))}
			</ScrollView>

			{/* bottom navigaiton, */}

			<View style={styles.bottomnav}>
				{activesong?.filename && (
					<View style={styles.bottomsong}>
						<Image source={musicimgactive} style={styles.songimageactive} />
						<Text style={styles.songtitle1}>{activesong.filename}</Text>
						{isPlaying == true ? (
							<AntDesign
								name="pausecircleo"
								size={30}
								color="black"
								style={styles.icon}
								onPress={() => playpausesong()}
							/>
						) : (
							<AntDesign
								name="playcircleo"
								size={30}
								color="black"
								style={styles.icon}
								onPress={() => playpausesong()}
							/>
						)}
					</View>
				)}
				<BottomNav activepage={`AllMusic`} navigation={navigation} />
			</View>
		</View>
	);
};

export default AllMusic;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "black",
		alignItems: "center",
		// justifyContent: "center",
		width: "100%",
	},
	bottomnav: {
		position: "absolute",
		bottom: 0,
		width: "100%",
		alignItems: "center",
		zIndex: 10,
	},
	head1: {
		color: "white",
		fontSize: 20,
		backgroundColor: "#0f0f0f",
		paddingHorizontal: 20,
		paddingVertical: 10,
		marginTop: 20,
		marginBottom: 20,
		borderRadius: 20,
		width: "50%",
		textAlign: "center",
		alignItems: "center",
	},
	songtitle: {
		color: "white",
		fontSize: 17,
		fontWeight: "bold",
		margin: 10,
		width: "60%",
	},
	cont2: {
		width: "100%",
	},
	songcard: {
		flexDirection: "row",
		backgroundColor: "#0f0f0f",
		alignItems: "center",
		marginVertical: 5,
		justifyContent: "space-between",
		width: "95%",
		alignSelf: "center",
		borderRadius: 10,
	},
	songimage: {
		backgroundColor: "black",
		width: 30,
		height: 30,
		// borderRadius: 1,
	},
	icon: {
		marginHorizontal: 10,
	},
	songcardactive: {
		width: "95%",
		backgroundColor: "white",
		flexDirection: "row",
		alignItems: "center",
		padding: 10,
		marginVertical: 5,
		borderRadius: 10,
		alignSelf: "center",
		justifyContent: "space-between",
	},
	songtitle1: {
		color: "black",
		fontSize: 17,
		fontWeight: "bold",
		margin: 10,
		width: "60%",
	},
	songimageactive: {
		backgroundColor: "white",
		width: 30,
		height: 30,
		// borderRadius: 10,
	},
	bottomsong: {
		backgroundColor: "white",
		width: "100%",
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		paddingHorizontal: 10,
	},
});
