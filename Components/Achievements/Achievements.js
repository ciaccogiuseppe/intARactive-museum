import React, { useState } from 'react';
import { View } from 'react-native';
import { Text, Icon } from "@rneui/themed";
import { Overlay } from 'react-native-elements';
import { ActivityBar } from '../../Globals/Components'
import { achievementsList, getDone, getNeeded } from './AchievementLists';
import { ScrollView } from 'react-native-gesture-handler';

const Achievements = ({ navigation }) => {
    return <>
        <ActivityBar titleName="Achievements" navigation={navigation} />
        <View style={{ alignItems: 'center', marginTop: 75, flex: 1, flexGrow: 1 }}>
            <Icon name='account-circle' size={150} />
        </View>
        <View style={{ flex: 2 }}>
            <IconsList />
        </View>
    </>
}

function IconsList() {
    return <ScrollView>
        <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', flexWrap: "wrap" }}>
            {achievementsList.map((achievement) => <AchievementIcon key={achievement.id} title={achievement.title} theme={achievement.theme}
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
        <Text style={{ width: 70, color: 'black', alignSelf: 'center', margin: 5, textAlign: 'center' }}>{props.title}</Text>
        <Overlay isVisible={visible} onBackdropPress={toggleOverlay} borderRadius={20}>
            <View>
                <View flexDirection="row">
                    <Text style={{ textAlign: "center", fontWeight: "bold", fontSize: 20, margin: 5, alignSelf: "center" }}>{props.title}</Text>
                    <Icon name='close' type='material' onPress={toggleOverlay} color={'black'} alignSelf={"flex-end"}></Icon>
                </View>
                <Text style={{ textAlign: "center", fontSize: 15 }}>{"Answer correctly to\n" + props.needed + " quiz about " + props.theme}</Text>
                <Text style={{ textAlign: "center", fontSize: 10, margin: 5, color: "grey" }}>{props.needed <= props.done ? "Obtained " + props.date_obtained :
                    "Not obtained - " + (props.needed - props.done) + " remaining"}</Text>
            </View>
        </Overlay>
    </View>;
}

export default Achievements;
