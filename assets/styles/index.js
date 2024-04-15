import { StyleSheet, Dimensions } from "react-native";

const PRIMARY_COLOR = "#7444C0";
const SECONDARY_COLOR = "#5636B8";
const WHITE = "#FFFFFF";
const GRAY = "#757E90";
const DARK_GRAY = "#363636";
const BLACK = "#000000";

const ONLINE_STATUS = "#46A575";
const OFFLINE_STATUS = "#D04949";

const STAR_ACTIONS = "#FFA200";
const LIKE_ACTIONS = "#B644B2";
const DISLIKE_ACTIONS = "#363636";
const FLASH_ACTIONS = "#5028D7";

// const ICON_FONT = "tinderclone";

const DIMENSION_WIDTH = Dimensions.get("window").width;
const DIMENSION_HEIGHT = Dimensions.get("window").height;

export default StyleSheet.create({
	// COMPONENT - CARD ITEM
	containerCardItem: {
		backgroundColor: WHITE,
		borderRadius: 8,
		alignItems: "center",
		margin: 10,
		shadowOpacity: 0.05,
		shadowRadius: 10,
		shadowColor: BLACK,
		shadowOffset: { height: 0, width: 0 }
	},
	matchesCardItem: {
		marginTop: -35,
		backgroundColor: PRIMARY_COLOR,
		paddingVertical: 7,
		paddingHorizontal: 20,
		borderRadius: 20
	},
	matchesTextCardItem: {
		
		color: WHITE
	},
	descriptionCardItem: {
		color: GRAY,
		textAlign: "center"
	},
	status: {
		paddingBottom: 10,
		flexDirection: "row",
		alignItems: "center"
	},
	statusText: {
		color: GRAY,
		fontSize: 12
	},
	online: {
		width: 6,
		height: 6,
		backgroundColor: ONLINE_STATUS,
		borderRadius: 3,
		marginRight: 4
	},
	offline: {
		width: 6,
		height: 6,
		backgroundColor: OFFLINE_STATUS,
		borderRadius: 3,
		marginRight: 4
	},
	actionsCardItem: {
		flexDirection: "row",
		alignItems: "center",
		paddingVertical: 30
	},
	button: {
		width: 60,
		height: 60,
		borderRadius: 30,
		backgroundColor: WHITE,
		marginHorizontal: 7,
		alignItems: "center",
		justifyContent: "center",
		shadowOpacity: 0.15,
		shadowRadius: 20,
		shadowColor: DARK_GRAY,
		shadowOffset: { height: 10, width: 0 }
	},
	miniButton: {
		width: 40,
		height: 40,
		borderRadius: 30,
		backgroundColor: WHITE,
		marginHorizontal: 7,
		alignItems: "center",
		justifyContent: "center",
		shadowOpacity: 0.15,
		shadowRadius: 20,
		shadowColor: DARK_GRAY,
		shadowOffset: { height: 10, width: 0 }
	},
	star: {
		
		color: STAR_ACTIONS
	},

	flash: {
		
		color: FLASH_ACTIONS
	},

	// COMPONENT - CITY
	city: {
		backgroundColor: WHITE,
		padding: 10,
		borderRadius: 20,
		width: 90,
		shadowOpacity: 0.05,
		shadowRadius: 10,
		shadowColor: BLACK,
		shadowOffset: { height: 0, width: 0 }
	},
	cityText: {
		
		color: DARK_GRAY,
		fontSize: 13
	},

	// COMPONENT - FILTERS
	filters: {
		backgroundColor: WHITE,
		padding: 10,
		borderRadius: 20,
		width: 70,
		shadowOpacity: 0.05,
		shadowRadius: 10,
		shadowColor: BLACK,
		shadowOffset: { height: 0, width: 0 }
	},
	filtersText: {
		
		color: DARK_GRAY,
		fontSize: 13
	},

	// COMPONENT - MESSAGE
	containerMessage: {
		flex: 1,
		alignItems: "center",
		justifyContent: "flex-start",
		flexDirection: "row",
		paddingHorizontal: 10,
		width: DIMENSION_WIDTH - 100
	},
	avatar: {
		borderRadius: 30,
		width: 60,
		height: 60,
		marginRight: 20,
		marginVertical: 15
	},
	message: {
		color: GRAY,
		fontSize: 12,
		paddingTop: 5
	},

	// COMPONENT - PROFILE ITEM
	containerProfileItem: {
		backgroundColor: WHITE,
		paddingHorizontal: 10,
		paddingBottom: 25,
		margin: 20,
		borderRadius: 8,
		marginTop: -65,
		shadowOpacity: 0.05,
		shadowRadius: 10,
		shadowColor: BLACK,
		shadowOffset: { height: 0, width: 0 }
	},
	matchesProfileItem: {
		width: 131,
		marginTop: -15,
		backgroundColor: PRIMARY_COLOR,
		paddingVertical: 7,
		paddingHorizontal: 20,
		borderRadius: 20,
		textAlign: "center",
		alignSelf: "center"
	},
	matchesTextProfileItem: {
		
		color: WHITE
	},
	name: {
		paddingTop: 25,
		paddingBottom: 5,
		color: DARK_GRAY,
		fontSize: 15,
		textAlign: "center"
	},
	descriptionProfileItem: {
		color: GRAY,
		textAlign: "center",
		paddingBottom: 20,
		fontSize: 13
	},
	info: {
		paddingVertical: 8,
		flexDirection: "row",
		alignItems: "center"
	},
	iconProfile: {
		
		fontSize: 12,
		color: DARK_GRAY,
		paddingHorizontal: 10
	},
	infoContent: {
		color: GRAY,
		fontSize: 13
	},

	// CONTAINER - GENERAL
	bg: {
		flex: 1,
		resizeMode: "cover",
		width: DIMENSION_WIDTH,
		height: DIMENSION_HEIGHT
	},
	top: {
		paddingTop: 50,
		marginHorizontal: 10,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center"
	},
	title: { paddingBottom: 10, fontSize: 22, color: DARK_GRAY },
	icon: {
		
		fontSize: 20,
		color: DARK_GRAY,
		paddingRight: 10
	},

	// CONTAINER - HOME
	containerHome: { marginHorizontal: 10 },

	// CONTAINER - MATCHES
	containerMatches: {
		justifyContent: "space-between",
		flex: 1,
		paddingHorizontal: 10
	},

	// CONTAINER - MESSAGES
	containerMessages: {
		justifyContent: "space-between",
		flex: 1,
		paddingHorizontal: 0
	},
	messagestop: {
		paddingTop: 0,
		marginHorizontal: 10,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center"
	},
	modalBackground: {
		flex: 1,
		backgroundColor: "rgba(0, 0, 0, 0.5)",
		justifyContent: "center",
		alignItems: "center",
	  },
	  modalContent: {
		backgroundColor: "white",
		padding: 20,
		borderRadius: 10,
		elevation: 5,
	  },
	  dropdownItem: {
		fontSize: 16,
		paddingVertical: 10,
	  },

	// CONTAINER - PROFILE
	containerProfile: { marginHorizontal: 0 },
	photo: {
		width: DIMENSION_WIDTH,
		height: 450
	},
	topIconLeft: {
		
		fontSize: 20,
		color: WHITE,
		paddingLeft: 20,
		marginTop: -20,
	},
	topIconRight: {
		
		fontSize: 20,
		color: WHITE,
		paddingRight: 20
	},
	actionsProfile: {
		justifyContent: "center",
		flexDirection: "row",
		alignItems: "center"
	},
	iconButton: {  fontSize: 20, color: WHITE },
	textButton: {
		
		fontSize: 15,
		color: WHITE,
		paddingLeft: 5
	},
	circledButton: {
		width: 50,
		height: 50,
		borderRadius: 25,
		backgroundColor: PRIMARY_COLOR,
		justifyContent: "center",
		alignItems: "center",
		marginRight: 10
	},
	roundedButton: {
		justifyContent: "center",
		flexDirection: "row",
		alignItems: "center",
		marginLeft: 10,
		height: 50,
		borderRadius: 25,
		backgroundColor: SECONDARY_COLOR,
		paddingHorizontal: 20
	},

	// MENU
	tabButton: {
		paddingTop: 20,
		paddingBottom: 30,
		alignItems: "center",
		justifyContent: "center",
		flex: 1
	},
	tabButtonText: {
		textTransform: "uppercase"
	},
	iconMenu: {
		
		height: 30,
		paddingBottom: 3
	},

  //NAVBAR Styles
    nav: {
    borderWidth: 1,
    paddingTop: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  logo: {
    width: 50,
    height: 50,
  },
  navtitle: {
    marginLeft: 10,
    paddingTop: 10,
    fontSize: 32,
    color: 'white',
  },

  //INTERACTIONBAR
    interactname: {
    color: 'white',
    fontSize: 32,
    textAlign: 'center',
  },
  interactionBar: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: 20,
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  buttonContainer: {
    flexDirection: 'row', // Arrange buttons horizontally
    justifyContent: 'space-between', // Position buttons at opposite ends
    marginTop: 10,
    width: '100%',
  },
  check: {
    width: 50,
    height: 50,
  },
  redx: {
    width: 60,
    height: 60,
  },

  //PROFILE SCREEN
    overlay: {
    ...StyleSheet.absoluteFillObject, // Cover the entire screen
    backgroundColor: 'black', // Semi-transparent black background
    justifyContent: 'center',
    alignItems: 'center',
  },
  profilecontainer: {
    width: '80%', // Adjust the width as needed
    backgroundColor: 'black',
    padding: 20,
    borderRadius: 10,
  },
  profileText: {
    fontSize: 24,
    color: 'white',
  },
  closeButton: {
    marginTop: 20,
    fontSize: 18,
    color: 'white',
    textDecorationLine: 'underline',
  },

  //
    container: {
    flex: 1,
    backgroundColor: 'black',
  },
  contentContainer: {
    flex: 1, // Make the content container flex to take remaining space
  },
  cards: {
    flex: 1
  },
  footer: {
    height: 60,
    backgroundColor: 'grey',
  },
  card: {
    height: DIMENSION_HEIGHT - 120,
    width: DIMENSION_WIDTH,
    padding: 10,
    position: 'absolute'
  },
  image: {
    flex: 1,
    height: null,
    width: null,
    resizeMode: 'cover',
    borderRadius: 20
  },
  like: {
    position: 'absolute',
    top: 70,
    left: 50,
    zIndex: 1000
  },
  dislike: {
    position: 'absolute',
    top: 50,
    right: 40,
    zIndex: 1000
  },
  buttonTextLike: {
    borderWidth: 1,
    padding: 10,
    fontWeight: '800',
    color:'#00FF00', 
    borderColor:'#00FF00', 
  },
  buttonTextDislike: {
  borderWidth: 1,
  padding: 10,
  fontWeight: '800',
  color:'#FF0000',
  borderColor:'#FF0000',
  },

  //SPLASHSCREEN
  splash_container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  splash_logo: {
    width: 200, // Adjust width and height as needed
    height: 200,
    resizeMode: 'contain', // Make sure the image fits the container
  },
  splash_text: {
    marginTop: 20, // Adjust spacing between image and text
    fontSize: 24,
    fontWeight: 'bold',
  },

  //SignUp
  signup_container: {
	flex: 1,
	padding: 16,
	paddingBottom: 100,
  },
  header: {
	fontSize: 36,
	padding: 24,
	margin: 12,
	textAlign: "center",
  },
  inputTextWrapper: {
	marginBottom: 24,
  },
  textInput: {
	height: 40,
	borderColor: "#000000",
	borderBottomWidth: 1,
	paddingRight: 30,
  },
  errorText: {
	color: 'red',
	fontSize: 10,
  },
  btnContainer: {
	backgroundColor: "white",
	marginTop:36,
  },

  //MATCHED SCREEN
  matchedContainer: {
    flex: 1,
    backgroundColor: "green",
    paddingTop: 20,
    opacity: 0.89 
  },
  imageContainer: {
    justifyContent: "center",
    paddingHorizontal: 10,
    paddingTop: 20,
  },
  matchedImage: {
    height: 80,
    width: "100%",
    resizeMode: "contain",
  },
  matchedText: {
    color: "white",
    textAlign: "center",
    marginTop: 5,
  },
  avatarsContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginTop: 5,
  },
  matchAvatar: {
    height: 100,
    width: 100,
    borderRadius: 50,
  },
});