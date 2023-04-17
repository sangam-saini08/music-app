const allsongsReducer = (state = [], action) => {
	switch (action.type) {
		case "SET_ALL_SONGS":
			return action.payload;
		default:
			return state;
	}
};

export default allsongsReducer;
