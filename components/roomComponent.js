import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import { colors, fonts, fontSizes, globalStyles } from '../global/styleConstants';
import {urgency} from '../global/globalConstants';

// room: the room to show in this card
// onPress: what to do when this card is pressed
export default function RoomComponent(props) {

    // Decide the urgency color
    var urgencyColor;
    if (props.room.highestUrgency == urgency.Low) {
        urgencyColor = colors.lowUrgency;
    } else if (props.room.highestUrgency == urgency.Medium) {
        urgencyColor = colors.mediumUrgency;
    } else if (props.room.highestUrgency == urgency.High) {
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
          textContainer:{
            margin:5,
            flex:1,
          },
          text:{
            ...globalStyles.text,
            textAlign:"center",
            margin:5
          }
    });

    // What to do when pressed
    const hundlePress = async ()=>{
        await props.onPress(props.room.roomId,props.room.roomName);
    }

    return (
        <TouchableOpacity style={styles.roomContainer} onPress={hundlePress}>
            <View style={styles.urgencyBar}></View>
            <View style={styles.textContainer}>
                <Text style={styles.text}>{props.room.roomName}</Text>
                <Text style={styles.text}>{`عدد الواجبات المعلقة: ${props.room.numberOfPendingChores}`}</Text>
            </View>
        </TouchableOpacity>
    )
}
