import React, { useState } from 'react';
import { View } from 'react-native';
import { Text, Icon } from "@rneui/themed";
import { Overlay } from 'react-native-elements';
import { ActivityBar } from '../../Globals/Components'
import { achievementsList, getDone, getNeeded } from './AchievementLists';
import { ScrollView } from 'react-native-gesture-handler';

const Achievements = (props) => {
    return <>
        <ActivityBar titleName="Achievements" navigation={props.navigation} isHome={true} />
        <View style={{ alignItems: 'center', marginTop: 20, flex: 1, flexGrow: 1 }}>
            <Icon name='account-circle' size={150} />
        </View>
        <View style={{ flex: 2 }}>
            <IconsList list={props.list} />
        </View>
    </>
}

function IconsList(props) {
    return <ScrollView>
        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', flexWrap: "wrap" }}>
            {props.list.map((achievement) => <AchievementIcon key={achievement.id} title={achievement.title} theme={achievement.theme}
                done={getDone(achievement)} needed={getNeeded(achievement)} date_obtained={achievement.date_obtained} />)}
        </View>
    </ScrollView>;
}

function AchievementIcon(props) {
    const [visible, setVisible] = useState(false);
    const toggleOverlay = () => {
        setVisible(visible => !visible);
    };
    return <View margin={5} flexDirection='column' alignItems='center' flexWrap='wrap'>
        <Icon name='trophy' type='font-awesome' size={50} onPress={toggleOverlay} color={props.needed <= props.done ? "black" : "lightgrey"} />
        <Text style={{ width: 75, color: 'black', alignSelf: 'center', margin: 5, textAlign: 'center', fontSize: 12 }}>{props.title}</Text>
        <Overlay isVisible={visible} onBackdropPress={toggleOverlay} overlayStyle={{ backgroundColor: "#EDE6DB", color: "#EDE6DB", borderRadius: 15, width: '65%', height: '20%' }}>
            <View>
                <Icon name='close' type='material' onPress={toggleOverlay} style={{ color: 'black', marginLeft: 'auto' }}></Icon>
                <Text style={{ textAlign: "center", fontWeight: "bold", fontSize: 20, margin: 5, alignSelf: "center", alignContent: 'center', position:'absolute' }}>{props.title}</Text>
                <Text style={{ textAlign: "center", fontSize: 15, margin:10 }}>{"Answer correctly to\n" + props.needed + " quiz about " + props.theme}</Text>
                <Text style={{ textAlign: "center", fontSize: 12, color: "#666666" }}>{props.needed <= props.done ? "Obtained " + props.date_obtained :
                    "Not obtained - " + (props.needed - props.done) + " remaining"}</Text>
            </View>
        </Overlay>
    </View>;
}

export default Achievements;

{/* , flex: 1, alignSelf: 'center', alignItems: 'center', justifyContent: 'center', alignContent: 'space-between', flexWrap: 'nowrap', position: 'absolute' */ }
{/*, position: 'absolute' */ }