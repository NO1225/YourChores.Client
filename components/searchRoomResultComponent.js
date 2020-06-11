import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';

import { colors, fonts, fontSizes, globalStyles } from '../global/styleConstants';
import { urgency } from '../global/globalConstants';

// room: the room to show in this card
// onPress: what to do when this card is pressed
export default function SearchRoomResultComponent(props) {


    const styles = StyleSheet.create({
        resultContainer: {
            margin: 5,
            marginHorizontal: 20,
            padding: 20,
            flexDirection: "row-reverse",
            justifyContent: "space-between",
            alignItems: "center",
            borderColor: colors.accent1,
            borderStyle: "solid",
            borderWidth: 1,
          },
          text: {
            ...globalStyles.text,
            textAlign: "right"
          }
    });

    return (

        <View style={styles.resultContainer}>
            <View>
                <Text style={styles.text}>{props.searchResult.roomName}</Text>
                <Text style={styles.text}>{`${props.searchResult.numberOfMembers}/${props.searchResult.maxAllowedMembers}`}</Text>
            </View>
            <View>
                {!(props.searchResult.isMember || props.searchResult.joinRequestSent || props.searchResult.isInvited) ? <IconButton icon="group-add" onPress={() => props.hundleJoinRequest(props.searchResult.roomId)} /> : null}
                {props.searchResult.isInvited ? <IconButton icon="file-download" onPress={console.log("accept")} /> : null}
            </View>
        </View>
    )
}
