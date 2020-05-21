import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

import { colors, fonts, fontSizes } from '../global/styleConstants'

export default function CustomButton(props) {

    const styles = StyleSheet.create({
        button: {
            padding: 20,
            backgroundColor: colors.accent1,
            borderRadius: 15,
            ...props.style
        },
        buttonTitle: {
            fontFamily: fonts.almaraiBold,
            fontSize: fontSizes.large,
            color: colors.primaryBackgroundColor,
        }
    });
    
    return (
        <TouchableOpacity style={styles.button} onPress={props.onPress}>
            <Text style={styles.buttonTitle}>{props.title}</Text>
        </TouchableOpacity>

    )



}
