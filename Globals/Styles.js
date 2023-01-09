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
    alignContent: 'space-between',
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
    top: 45,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    alignContent: 'center',
    flexWrap: 'nowrap',
    flexDirection: 'row',
    position: 'absolute',
    opacity: 1.0,
    width: '100%',
    borderColor: "#AAA",
    borderBottomWidth: 1,
    height: 35
  },
  button: {
    borderColor: palette[2],
    borderWidth: 0,
    borderRadius: 10,
    backgroundColor: palette[2],
    padding: 13,
    margin: 5
  },
  quizSelected: {
    borderColor: "#6082B6",
    borderWidth: 0,
    borderRadius: 10,
    backgroundColor: "#6082B6",
    padding: 13,
    margin: 5
  },
  buttonConfirm: {
    borderColor: palette[2],
    borderWidth: 0,
    borderRadius: 10,
    backgroundColor: palette[2],
    padding: 15,
    margin: 5
  },
  buttonDisabled: {
    borderColor: "#A9A9A9",
    borderWidth: 0,
    borderRadius: 10,
    backgroundColor: "#A9A9A9",
    padding: 15,
    margin: 5
  },
  bottom: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  quizCards: {
    backgroundColor: "#EEE",
    marginLeft: 10,
    marginRight: 10,
    padding: 10,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1, },
    shadowOpacity: 1,
    shadowRadius: 5,
    elevation: 4
  },
  textButtonConfirm: { color: 'white', alignSelf: 'center', fontSize: 18, fontWeight: "700", letterSpacing: 1.5 }
});

export default styles;