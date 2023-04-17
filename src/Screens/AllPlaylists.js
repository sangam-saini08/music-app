import {
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";
import React, { useEffect, useState } from "react";
import BottomNav from "../Components/BottomNav";
import { useSelector, useDispatch } from "react-redux";
// AsyncStorage;

//icons
import { Feather, AntDesign } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
	setActivePlaylist_global,
	setIsPlayingMusicOrPlaylist_global,
	setIsPlayingPlaylist_global,
	setIsPlaying_global,
} from "../redux/action";

const AllPlaylists = ({ navigation }) => {
	const [oldplaylist, setOldplaylist] = useState([]);
	const [keyword, setKeyword] = useState("");

	const dispatch = useDispatch();
	const getolddata = async () => {
		AsyncStorage.getItem("old_playlists").then((value) => {
			if (value) setOldplaylist(JSON.parse(value));
		});
		AsyncStorage.getItem("active_playlist").then((value) => {
			if (value) {
				dispatch(setActivePlaylist_global(JSON.parse(value)));
			}
		});
	};
	useEffect(() => {
		getolddata();
		// console.log(oldplaylist);
	}, []);

	const activeplaylist = useSelector((state) => state.aciveplaylist_global);
	const isplayingplaylist = useSelector(
		(state) => state.isplayingplaylist_global
	);

	const setactiveplaylist_function = (item) => {
		dispatch(setIsPlayingPlaylist_global(true));
		dispatch(setActivePlaylist_global(itme));
		AsyncStorage.setItem("active_playlist", JSON.stringify(item));
		dispatch(setIsPlayingMusicOrPlaylist_global("playlist"));
		dispatch(setIsPlaying_global(false));
	};

	const playpauseplaylist = () => {
		dispatch(setIsPlayingPlaylist_global(!isplayingplaylist));
		dispatch(setIsPlaying_global(false));
	};

	return (
		<View style={styles.container}>
			<Text>Allplaylist</Text>
			<View style={styles.bottomnav}>
				<BottomNav activepage={`AllPlaylists`} navigation={navigation} />
			</View>
			<TextInput
				placeholder="Search"
				style={styles.input}
				placeholderTextColor={"white"}
				onChangeText={(text) => setKeyword(text)}
			/>
			<ScrollView style={styles.playlistouter}>
				{oldplaylist
					.filter((item) => {
						if (keyword === "") {
							return item;
						} else if (
							item.name.toLowerCase().includes(keyword.toLowerCase())
						) {
							return item;
						}
					})
					.map((item) => {
						return (
							<TouchableOpacity key={item.id}>
								<View style={styles.playlistcard}>
									<Text style={styles.txt1}>{item.name}</Text>
									<View style={styles.playlistcardin}>
										<Text style={styles.txt2}>{item.songs.length} songs</Text>
										{isplayingplaylist === true ? (
											<Feather
												name="pause-circle"
												size={25}
												color="white"
												style={styles.icon1}
												onPress={() => {
													playpauseplaylist();
												}}
											/>
										) : (
											<Feather
												name="play-circle"
												size={25}
												color="white"
												style={styles.icon1}
												onPress={() => {
													setactiveplaylist_function(item);
												}}
											/>
										)}
										<AntDesign
											name="delete"
											size={25}
											color="white"
											style={styles.icon1}
										/>
									</View>
								</View>
							</TouchableOpacity>
						);
					})}
			</ScrollView>
		</View>
	);
};

export default AllPlaylists;

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: "black",
		alignItems: "center",
		justifyContent: "center",
	},
	bottomnav: {
		position: "absolute",
		bottom: 0,
		width: "100%",
		alignItems: "center",
		zIndex: 10,
	},
	input: {
		backgroundColor: "grey",
		width: "90%",
		borderRadius: 10,
		marginVertical: 20,
		padding: 10,
		color: "black",
		alignSelf: "center",
	},
	playlistouter: {
		width: "90%",
	},
	playlistcard: {
		flexDirection: "row",
		justifyContent: "space-between",
		// backgroundColor: "white",
		width: "90%",
		alignSelf: "center",
		borderBottomColor: "grey",
		borderBottomWidth: 1,
		paddingVertical: 10,
	},
	playlistcardin: {
		flexDirection: "row",
		alignItems: "center",
	},
	txt1: {
		color: "white",
		fontSize: 20,
	},
	txt2: {
		color: "grey",
		fontSize: 15,
	},
	icon1: {
		marginHorizontal: 10,
	},
});
