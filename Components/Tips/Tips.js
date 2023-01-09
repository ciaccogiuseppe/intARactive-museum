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


const Tips = ({ navigation, isFirstVisit }) => {
    const { width } = useWindowDimensions();

    const [curPage, setCurPage] = React.useState(0);
    const [newPage, setNewPage] = React.useState(1);

    const scrollX = React.useRef(new Animated.Value(0)).current;
    const flatListRef = React.useRef(null);

    const keyExtractor = React.useCallback((item) => item.key, []);
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

    React.useEffect(() => {
        if (newPage == 1) {
            flatListRef.current.scrollToIndex({ animated: true, index: 0 });
            setNewPage(0);
        }
    }, [newPage]);

    return <>
        {isFirstVisit === false ? <ActivityBar titleName="Tips" navigation={navigation} onCloseOrHelp={() => {
            setNewPage(1);
            navigation.navigate("Home");
        }} isClose={true} /> : <></>}
        <View style={{ ...otherStyles.container, marginTop: 50 }}>
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
        <View style={{ flex: 1, alignContent: 'center', justifyContent: 'center', flexDirection: 'column' }}>
            {/*<TouchableHighlight style={{ ...otherStyles.button, width: "40%", alignSelf: 'center' }} onPress={() => {
                flatListRef.current.scrollToIndex({ animated: true, index: (curPage > 0 ? (curPage - 1) : 0) });
            }}>
                <Text style={{ color: 'white', alignSelf: 'center' }}>Back</Text>
        </TouchableHighlight>*/}
            <View alignSelf={'center'}>
                <PaginationDot
                    activeDotColor={'black'}
                    curPage={curPage}
                    maxPage={4}
                />
            </View>
            {curPage < 3 ? <TouchableHighlight style={{ ...otherStyles.button, width: "40%", alignSelf: 'center' }} onPress={() => {
                flatListRef.current.scrollToIndex({ animated: true, index: (curPage + 1) });
            }}>
                <Text style={{ color: 'white', alignSelf: 'center' }}>Next</Text>
            </TouchableHighlight> : (isFirstVisit === true ? <TouchableHighlight style={{ ...otherStyles.button, width: "40%", alignSelf: 'center' }} onPress={() => {
                setNewPage(1);
                navigation.navigate("Home");
            }}>
                <Text style={{ color: 'white', alignSelf: 'center' }}>Start now</Text>
            </TouchableHighlight> : <></>)}
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