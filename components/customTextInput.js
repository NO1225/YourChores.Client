import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';

import { colors, fonts, fontSizes, globalStyles } from '../global/styleConstants'
import { Value } from 'react-native-reanimated';

/// props.style => text style
/// props.inputContainerStyle => container style
export default function CustomTextInput(props) {

    const styles = StyleSheet.create({
        inputContainer: {
            
            minWidth: '70%',
            alignSelf: "center",
            ...props.inputContainerStyle
        },
        input: {
            width: '100%',
            alignSelf: "stretch",
            fontFamily: fonts.almaraiRegular,
            fontSize: fontSizes.large,
            color: colors.primaryFontColor,
            textAlign: "center",
            padding: 10,
            paddingHorizontal: 30,
            borderColor: colors.secondaryBackgroundColor,
            borderStyle: "solid",
            borderWidth: 1,
            margin: 10,
        },
        text: {
            ...globalStyles.text,
            marginBottom: -10,
        }
    });

    return (
        <View style={styles.inputContainer}>
            <Text style={styles.text}>{props.title}</Text>
            <View style={styles.textInputContainer}>
                <TextInput
                    style={styles.input}
                    {...props} />
            </View>


        </View>

    )



}
