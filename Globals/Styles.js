import { StyleSheet } from "react-native";

const palette = [
  "#EDE6DB",
  "#417D7A",
  "#1D5C63",
  "#1A3C40"
]

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  container: {
    flex: 1,
    backgroundColor: 'white',
    flexDirection: "column"
  },
  arView: {
    flex: 10,
  },
  footer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexWrap: 'nowrap',
    flexDirection: 'row',
    backgroundColor: palette[1],
  },
  header: {
    textAlignVertical: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    backgroundColor: palette[2],
  },
  secondHeader: {
    flex: 1,
    top: 0,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    flexWrap: 'nowrap',
    flexDirection: 'row',
    position: 'absolute',
    backgroundColor: palette[1],
    opacity: 0.8,
    width: '100%',
    height: 47
  },
  breadcrumb: {
    flex: 1,
    top: 50,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    flexWrap: 'nowrap',
    flexDirection: 'row',
    position: 'absolute',
    opacity: 1.0,
    width: '100%',
    borderBottomColor: 'gray',
    borderBottomWidth: 3,
    height: 35,
  },
  button: {
    borderColor: 'black',
    borderWidth: 0,
    borderRadius: 10,
    backgroundColor: palette[2],
    padding: 10,
    margin: 5,
  },
  buttonDisabled: {
    borderColor: 'black',
    borderWidth: 0,
    borderRadius: 10,
    backgroundColor: "#A9A9A9",
    padding: 10,
    margin: 5,
    height: 40
  },
  quizSelected: {
    borderColor: 'black',
    borderWidth: 0,
    borderRadius: 10,
    backgroundColor: "#6082B6",
    padding: 10,
    margin: 5,
    height: 40
  },
  bottom: {
    flex: 1,
    justifyContent: 'flex-end',
    marginBottom: 15
  },
  quizCards: {
    backgroundColor: "#CCCCCC",
    marginLeft: 10,
    marginRight: 10,
    padding: 10,
    borderRadius: 40
  }
});

export default styles;