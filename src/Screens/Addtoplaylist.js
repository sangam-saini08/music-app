import {
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
	Alert,
} from "react-native";
import React, { useState, useEffect } from "react";
import BottomNav from "../Components/BottomNav";
import AsyncStorage from "@react-native-async-storage/async-storage";

//icons
import { AntDesign } from "@expo/vector-icons";

const Addtoplaylist = ({ navigation, route }) => {
	const { song } = route.params;
	const [newplaylist, setNewplaylist] = useState("");
	const [oldplaylist, setOldplaylist] = useState([]);

	// const data = [
	// 	{ name: "playlist1", id: 1, songs: ["song1", "song2", "song3"] },
	// 	// { name: "playlist2", id: 2, songs: ["song1", "song2", "song3"] },
	// 	// { name: "playlist3", id: 3, songs: ["song1", "song2"] },
	// ];
	useEffect(() => {
		// setOldplaylist(data);
		AsyncStorage.getItem("old_playlists").then((value) => {
			if (value) setOldplaylist(JSON.parse(value));
		});
	}, []);
	const addtonewplaylist = (songuri) => {
		if (newplaylist.length === 0) {
			Alert.alert("please add a text");
			return;
		}
		let newdata = [...oldplaylist];
		// console.log(newdata);
		newdata.push({
			name: newplaylist,
			id: oldplaylist.length + 1,
			songs: [{ songuri }],
		});
		setOldplaylist(newdata);
		setNewplaylist("");
		alert("New playlist created ");
		AsyncStorage.setItem("old_playlists", JSON.stringify(newdata));

		// navigation.navigate("allplaylists");
	};
	const addtoexistingplaylist = ({ songuri, playlistid, playlistname }) => {
		let newdata = [...oldplaylist];
		// console.log(newdata[playlistid - 1]);

		newdata[playlistid - 1].songs.push(songuri);
		setOldplaylist(newdata);
		alert("song added to" + playlistname);
		AsyncStorage.setItem("old_playlists", JSON.stringify(newdata));

		console.log(newdata);
	};
	// console.log(newplaylist);

	const [keyword, setKeyword] = useState("");
	return (
		<View style={styles.container}>
			<View style={styles.bottomnav}>
				<BottomNav activepage={`AllMusic`} navigation={navigation} />
			</View>
			<View style={styles.c1}>
				<Text style={styles.head2}>Create new playlist</Text>
				<View style={styles.c1in}>
					<TextInput
						placeholder="Playlist Name"
						style={styles.input}
						onChangeText={(text) => {
							setNewplaylist(text);
						}}
						value={newplaylist}
					/>
					<AntDesign
						name="plussquare"
						size={50}
						color="white"
						style={styles.icon}
						onPress={() => addtonewplaylist({ songuri: song.uri })}
					/>
				</View>
			</View>
			<View style={styles.c2}>
				<Text style={styles.head3}>ADD to existing Playlist</Text>
				<TextInput
					placeholder="Search"
					style={styles.input}
					onChangeText={(text) => setKeyword(text)}
				/>
				<View style={styles.c2in}>
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
								<TouchableOpacity
									key={item.id}
									onPress={() => {
										addtoexistingplaylist({
											songuri: song.uri,
											playlistid: item.id,
											playlistname: item.name,
										});
									}}
								>
									<View style={styles.playlistcard}>
										<Text style={styles.playlisttext}>{item.name}</Text>
										<Text style={styles.playlisttext}>
											{item.songs.length} -songs
										</Text>
									</View>
								</TouchableOpacity>
							);
						})}
				</View>
			</View>
		</View>
	);
};

export default Addtoplaylist;

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
	c1: {
		width: "90%",
		alignItems: "center",
		justifyContent: "center",
		// backgroundColor: "red",
	},
	c1in: {
		width: "100%",
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
	},
	head2: {
		color: "white",
		fontSize: 20,
		marginTop: 20,
	},
	input: {
		backgroundColor: "white",
		width: "90%",
		borderRadius: 10,
		marginVertical: 20,
		padding: 10,
		color: "black",
	},
	icon: {},
	head3: {
		color: "white",
		textTransform: "capitalize",
	},
	c2: {
		width: "90%",
		alignItems: "center",
		backgroundColor: "grey",
		borderRadius: 20,
		marginTop: 20,
		padding: 20,
	},
	c2in: {
		width: "100%",
	},
	playlistcard: {
		width: "100%",

		borderRadius: 10,
		marginTop: 5,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		padding: 10,
		borderColor: "black",
		borderWidth: 1,
	},
});
