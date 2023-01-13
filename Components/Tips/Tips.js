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
import { Divider } from "react-native-paper";


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

    const renderItemStyles = StyleSheet.create({
        container: {
            justifyContent: 'space-around',
            alignItems: 'center',
            width: width,
            marginHorizontal: 0,
            backgroundColor: styles.palette._5
        },
        title: {
            width: '95%',
            textAlign: 'center',
            fontSize: 20,
            fontWeight: 'bold',
            fontFamily: 'sans-serif-thin',
            margin: 20,
            textAlignVertical: 'center',
            color:"#3D3D3D",
            textShadowColor: 'grey',
            textShadowOffset: { width: 1, height: 1 },
            textShadowRadius: 3
        },
        image_page1: {
            height: 380,
            width: 270,
            alignSelf: "center",
        },
        itemRowGroup: {
            flexDirection: 'row',
            justifyContent: 'space-around',
            alignSelf: 'stretch',
            flexWrap: 'nowrap',
            margin:5
        },
        itemRowGroup_text: {
            width: '50%',
            fontSize: 18,
            textAlign: 'center',
            textAlignVertical: 'center',
            color: '#3D3D3D'
        },
        itemRowGroup_image: {
            height: 190,
            width: 141,
            alignSelf: "center",
            margin: 10
        }
    });

    const renderItem = React.useCallback(
        ({ item }) => {
            switch (item.key) {
                case '1':
                    return (
                        <View style={renderItemStyles.container}>
                            <Text style={renderItemStyles.title}>{item.title}</Text>
                            <Animated.Image source={item.image} style={renderItemStyles.image_page1} />
                        </View>
                    );
                case '2':
                    return (<View style={renderItemStyles.container}>
                        <Text style={renderItemStyles.title}>{item.title}</Text>
                        <View style={renderItemStyles.itemRowGroup}>
                            <Animated.Text style={renderItemStyles.itemRowGroup_text}>{item.description1}</Animated.Text>
                            <Animated.Image source={item.image1} style={renderItemStyles.itemRowGroup_image} />
                        </View>
                        <Divider style={{color:"black", margin:5}} bold={true} width="100%"/>
                        <View style={renderItemStyles.itemRowGroup}>
                            <Animated.Image source={item.image2} style={renderItemStyles.itemRowGroup_image} />
                            <Animated.Text style={renderItemStyles.itemRowGroup_text}>{item.description2}</Animated.Text>
                        </View>
                    </View>);
                case '3':
                    return (<View style={renderItemStyles.container}>
                        <Text style={renderItemStyles.title}>{item.title}</Text>
                        <View style={renderItemStyles.itemRowGroup}>
                            <Animated.Text style={renderItemStyles.itemRowGroup_text}>{item.description1}</Animated.Text>
                            <Animated.Image source={item.image1} style={renderItemStyles.itemRowGroup_image} />
                        </View>
                        <Divider style={{color:"black", margin:5}} bold={true} width="100%"/>
                        <View style={renderItemStyles.itemRowGroup}>
                            
                            <Animated.Image source={item.image2} style={[renderItemStyles.itemRowGroup_image]} />
                            <View style={{ flexDirection: 'column', flex: 1, width: '50%', alignItems:'flex-start', marginTop:5, justifyContent: 'center', alignItems: 'flex-start'}}>
                                <Animated.Text style={{...renderItemStyles.itemRowGroup_text, width: '100%', textAlignVertical:'center', justifyContent: 'flex-start',textAlign: 'left',}}>{item.description2}</Animated.Text>
                                {item.items.map((e, i) =>
                                    <View key={i} style={{ flexDirection: 'row', justifyContent: 'flex-start' }}>
                                        <Animated.Image source={e.icon} style={{ height: 25, width: 25, margin: 2 }} />
                                        <Animated.Text style={{ textAlignVertical: 'center', color:'black' }}>{e.label}</Animated.Text>
                                    </View>
                                )}
                            </View>
                        </View>
                    </View>);
                case '4':
                    return (<View style={renderItemStyles.container}>
                        <Text style={renderItemStyles.title}>{item.title}</Text>
                        
                        <View style={renderItemStyles.itemRowGroup}>
                            <Animated.Text style={renderItemStyles.itemRowGroup_text}>{item.description1}</Animated.Text>
                            <Animated.Image source={item.image1} style={renderItemStyles.itemRowGroup_image} />
                        </View>
                        <Divider style={{color:"black", margin:5}} bold={true} width="100%"/>
                        <View style={renderItemStyles.itemRowGroup}>
                            <Animated.Image source={item.image2} style={renderItemStyles.itemRowGroup_image} />
                            <Animated.Text style={renderItemStyles.itemRowGroup_text}>{item.description2}</Animated.Text>
                        </View>
                    </View>);
                default:
                    return (<View style={renderItemStyles.container}>
                        <Text style={renderItemStyles.title}>{item.title}</Text>
                    </View>);
            }
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
        <View style={{ ...otherStyles.container }}/* marginTop: 50*/>
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
        <View style={{ flex: 1, alignContent: 'center', justifyContent: 'center', flexDirection: 'column', backgroundColor: styles.palette._5 }}>
            {/*<TouchableHighlight style={{ ...otherStyles.button }} onPress={() => {
                flatListRef.current.scrollToIndex({ animated: true, index: (curPage > 0 ? (curPage - 1) : 0) });
            }}>
                <Text style={{ color: 'white', alignSelf: 'center' }}>Back</Text>
        </TouchableHighlight>*/}
            <View alignSelf={'center'} margin={10}>
                <PaginationDot
                    activeDotColor={'black'}
                    curPage={curPage}
                    maxPage={4}
                />
            </View>
            {curPage < 3 ? <TouchableHighlight style={{ ...otherStyles.button }} onPress={() => {
                flatListRef.current.scrollToIndex({ animated: true, index: (curPage + 1) });
            }}>
                <Text style={{ color: 'white', alignSelf: 'center' }}>Next</Text>
            </TouchableHighlight> : (isFirstVisit === true ? <TouchableHighlight style={{ ...otherStyles.button }} onPress={() => {
                setNewPage(1);
                navigation.navigate("Home");
            }}>
                <Text style={{ color: 'white', alignSelf: 'center' }}>Start now</Text>
            </TouchableHighlight> : <TouchableHighlight style={{ ...otherStyles.button, opacity: 0 }} >
                <Text></Text>
            </TouchableHighlight>)}
        </View>
    </>;
}

const otherStyles = StyleSheet.create({
    container: {
        flex: 3,
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
        backgroundColor: styles.palette._2,
        padding: 10,
        margin: 5,
        width: "40%",
        alignSelf: 'center'
    }
});

export default Tips;