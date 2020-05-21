import React, { useState } from 'react';
import { StyleSheet, Text, View, TextInput } from 'react-native';

import { colors, fonts, fontSizes } from '../global/styleConstants'

export default function CustomTextInput(props) {

    const styles = StyleSheet.create({
        inputContainer: {
            width: '70%',
            alignSelf: "center",
            ...props.inputContainerStyle
        },
        input: {
            width: '100%',
            alignSelf: "center",
            fontFamily: fonts.almaraiRegular,
            fontSize: fontSizes.large,
            color: colors.primaryFontColor,
            textAlign: "center",
            padding: 15,
            paddingHorizontal: 30,
            borderColor: colors.secondaryBackgroundColor,
            borderStyle: "solid",
            borderWidth: 1,
            margin: 10,
        },
    });

    return (
        <View style={styles.inputContainer}>
            <TextInput
                style={styles.input}
                {...props} />

        </View>

    )



}
