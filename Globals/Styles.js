import { Dimensions, StyleSheet } from "react-native";

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
        width:'100%',
        height:47
      },
      crosshair: {
        position: 'absolute',
        top: (Dimensions.get('window').height / 2 - 10),
        left: (Dimensions.get('window').width / 2 - 10),
        width: 20,
        height: 20,
        borderRadius: 15,
        borderWidth: 1,
        backgroundColor: 'grey',
    },  
    viewFinder: {
        flex: 1,
        top: 0,
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: 'center',
        flexWrap: 'nowrap',
        flexDirection: 'row',
        position: 'absolute',
        opacity: 0.4,
        height:645,
        width:'100%',
      },
    video: {
        alignSelf: 'center',
        alignItems: 'center',
        justifyContent: 'center',
        alignContent: 'center',
        flexWrap: 'nowrap',
        flexDirection: 'row',
        position: 'absolute',
        opacity: 1,
        height:645,
        width:'100%',
      },
    button: {
      borderColor: 'black',
      borderWidth: 0,
      borderRadius: 10,
      backgroundColor: palette[2],
      padding: 10,
      margin: 5,
      width:130
    },
    descriptionTextStyle: {
      fontFamily: 'Arial',
      fontSize: 100,
      color: '#ffffff',
      textAlignVertical: 'center',
      textAlign: 'center',
      textShadowColor: '#000000',
      textShadowRadius: 200,
      textShadowOffset: {
        height: 112,
        width: 112
      }
    }
    
  });

  export default styles;