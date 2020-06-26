import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; 

import { colors, fonts, fontSizes, globalStyles } from '../global/styleConstants';
import { urgency,joinRequestType } from '../global/globalConstants';

import IconButton from './customIconButton';

// request: the room to show in this card
// onPress: what to do when this card is pressed
export default function MemberComponent(props) {


    const styles = StyleSheet.create({
        icon: {
            padding: 0,
            width: 40,
            height: 40,
            borderRadius: 40,
            marginHorizontal: 5,
        },
        text: {
            ...globalStyles.text,
            padding: 10
        },
        cardContainer: {
            flexDirection: "row-reverse",
            alignItems: "center",
            justifyContent: "space-between",
            margin: 10,
            padding: 10,
            borderColor: colors.accent1,
            borderStyle: "solid",
            borderWidth: 1
        },
        buttonContainer: {
            flexDirection: "row-reverse",
            alignItems: "center",

        },
        textContainer: {
            alignItems: "flex-end",
            justifyContent: "center"
        }
    });
    return (
        <View style={styles.cardContainer}>
            <View style={styles.textContainer}>
                <Text style={styles.text}>{props.request.roomName}</Text>
            </View>
            <View style={styles.buttonContainer} >
                {props.buttons.map(button => <IconButton key={button.icon} style={styles.icon} icon={button.icon} onPress={() => button.method(props.paramSelector?props.paramSelector(props.request):props.request.joinRequestId)} />)}
                {props.icons?props.icons.map(icon => <MaterialIcons key={icon} style={styles.iconStyle} name={icon} size={fontSizes.xLarge} color={colors.accent1} />):null}

            </View>
        </View>
    )
}
