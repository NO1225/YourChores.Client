import React, { useState } from 'react';
import { StyleSheet, Text, View, KeyboardAvoidingView } from 'react-native';

import { colors, fonts, fontSizes } from '../global/styleConstants'

/// props.style => text style
/// props.inputContainerStyle => container style
export default function CustomKeyboardAvoidingView(props) {

    const styles = StyleSheet.create({
        inputsContainer: {
            width: '100%',
            backgroundColor: colors.primaryBackgroundColor
        },
    });

    return (
        <KeyboardAvoidingView behavior='position' style={props.style}>
            <View style={styles.inputsContainer}>
                {props.children}
            </View>
        </KeyboardAvoidingView>
    )



}
