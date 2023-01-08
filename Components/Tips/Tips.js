import React from "react";
import { Button, Text } from "@rneui/themed";
import PaginationDot from 'react-native-animated-pagination-dot'
import styles from "../../Globals/Styles";
import {
    StyleSheet,
    View,
    Animated,
    FlatList,
    useWindowDimensions,
    TouchableHighlight
} from 'react-native';
import { TIPS_DATA } from "./TipsData";
import { ActivityBar } from "../../Globals/Components";


const Tips = ({ navigation }) => {
    return <>
        <TipsItems navigation={navigation}/>
    </>
}

const TipsItems = (props) => {
    const [curPage, setCurPage] = React.useState(0);
    const { width } = useWindowDimensions();
    const scrollX = React.useRef(new Animated.Value(0)).current;
    const flatListRef = React.useRef(null);
    const changeCurrentPage = React.useCallback(({ viewableItems, changed }) => {
        if (viewableItems && viewableItems.length > 0) {
            setCurPage(viewableItems[0].index);
        }
    }, []);
    const renderItem = React.useCallback(
        ({ item }) => {
            return (
                <View style={[otherStyles.itemContainer, { width: width - 80 }]}>
                    <Text>{item.title}</Text>
                    <Animated.Text>{item.description}</Animated.Text>
                </View>
            );
        }, [width],
    );

    const keyExtractor = React.useCallback((item) => item.key, []);

    return <>
        <ActivityBar titleName="Tips" navigation={props.navigation}/>
        <View style={{...otherStyles.container, marginTop:50}}>
            <FlatList
                flex={1}
                ref={flatListRef}
                data={TIPS_DATA}
                keyExtractor={keyExtractor}
                showsHorizontalScrollIndicator={false}
                onScroll={Animated.event(
                    [{ nativeEvent: { contentOffset: { x: scrollX } } }],
                    {
                        useNativeDriver: false,
                    },
                )}
                style={otherStyles.flatList}
                pagingEnabled
                horizontal
                decelerationRate={'normal'}
                scrollEventThrottle={16}
                renderItem={renderItem}
                onViewableItemsChanged={changeCurrentPage}
            />
        </View>
        <View style={{ flex: 1, alignContent: 'center', justifyContent: 'center', flexDirection: 'row' }}>
            <TouchableHighlight style={{ ...otherStyles.button, width: "40%", alignSelf: 'center' }} onPress={() => {
                flatListRef.current.scrollToIndex({ animated: true, index: (curPage > 0 ? (curPage - 1) : 0) });
            }}>
                <Text style={{ color: 'white', alignSelf: 'center' }}>Back</Text>
            </TouchableHighlight>
            <PaginationDot
                activeDotColor={'black'}
                curPage={curPage}
                maxPage={4}
            />
            <TouchableHighlight style={{ ...otherStyles.button, width: "40%", alignSelf: 'center' }} onPress={() => {
                flatListRef.current.scrollToIndex({ animated: true, index: (curPage < 3 ? (curPage + 1) : 3) });
            }}>
                <Text style={{ color: 'white', alignSelf: 'center' }}>Next</Text>
            </TouchableHighlight>
        </View>
    </>;
}

const otherStyles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#e7e7e7',
    },
    text: {
        flex: 1,
        justifyContent: 'space-evenly',
    },
    flatList: {
        flex: 1,
    },
    dotContainer: {
        justifyContent: 'center',
        alignSelf: 'center',
    },
    dotStyles: {
        width: 10,
        height: 10,
        borderRadius: 5,
        marginHorizontal: 3,
    },
    constainerStyles: {
        top: 30,
    },
    itemContainer: {
        backgroundColor: '#fff',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 40,
        marginTop: 40,
        marginHorizontal: 40,
        borderRadius: 20,
    },
    button: {
        borderColor: 'black',
        borderWidth: 0,
        borderRadius: 10,
        backgroundColor: "#1D5C63",
        padding: 10,
        margin: 5,
    }
});

export default Tips;