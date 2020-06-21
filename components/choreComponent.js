import React, { useState } from 'react';
import { StyleSheet, Text, View, Alert } from 'react-native';

import { colors, fonts, fontSizes, globalStyles } from '../global/styleConstants';
import { urgency } from '../global/globalConstants';
import ApiRoutes from '../global/apiRoutes';
import { authPost } from '../global/apiCalls';

import CheckBox from './customCheckBoxComponent'

// chore: the chore to show in this card
// onPress: what to do when this card is pressed
export default function choreComponent(props) {

    // Decide the urgency color
    var urgencyColor;
    if (props.chore.urgency == urgency.Low) {
        urgencyColor = colors.lowUrgency;
    } else if (props.chore.urgency == urgency.Medium) {
        urgencyColor = colors.mediumUrgency;
    } else if (props.chore.urgency == urgency.High) {
        urgencyColor = colors.highUrgency;
    }


    const styles = StyleSheet.create({
        roomContainer: {
            flexDirection: 'row-reverse',
            margin: 15,
            borderColor: colors.primaryFontColor,
            borderWidth: 1,
            borderStyle: "solid"
        },
        urgencyBar: {
            width: 15,
            backgroundColor: urgencyColor
        },
        textContainer: {
            margin: 5,
            marginLeft: 0,
            flex: 1,
        },
        checkBoxContainer: {
            margin: 10,
            alignItems: "center",
            justifyContent: "center",
        },
        text: {
            ...globalStyles.text,
            fontSize: fontSizes.large,
            textAlign: "center",
            lineHeight: fontSizes.xxLarge,
            margin: 5
        }
    });

    // What to do when pressed
    const hundlePress = async () => {
        await props.onPress(props.chore);
    }


    const updateChore = async () => {
        Alert.alert(
            "تأكيد الانهاء",
            "هل انت متأكد من اتمام الواجب ؟؟؟",
            [
                {
                    text: 'الغاء',
                    onPress: () => console.log('Cancel Pressed'),
                    style: 'cancel',
                },
                {
                    text: 'تأكيد', onPress: async () => {

                        var data = await authPost(ApiRoutes.updateChore, {
                            "choreId": props.chore.choreId,
                            "roomId": props.room.roomId
                        });

                        if (data.success) {
                            props.onUpdate();
                        }
                    }
                },
            ]
        )

    }


    return (
        <View style={styles.roomContainer} onPress={hundlePress}>
            <View style={styles.urgencyBar}></View>
            <View style={styles.textContainer}>
                <Text style={styles.text}>{props.chore.description}</Text>
                {props.room && props.room.roomName ? <Text style={styles.text}>{props.room.roomName}</Text> : null}
            </View>
            <View style={styles.checkBoxContainer}>
                <CheckBox value={props.chore.done} onPress={updateChore} />
            </View>
        </View>
    )
}
