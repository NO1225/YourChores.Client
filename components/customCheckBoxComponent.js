import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import { colors, fonts, fontSizes, globalStyles } from '../global/styleConstants'

export default function CustomCheckBoxComponent(props) {
    const [checked, setChecked] = useState(props.value);
    const styles = StyleSheet.create({
        container: {
            flexDirection: "row-reverse",
            alignItems: "center"
        },
        button: {
            padding: 0,
            width: 25,
            height: 25,
            backgroundColor: colors.primaryBackgroundColor,
            justifyContent: 'center',
            borderColor: colors.secondaryFontColor,
            borderStyle: "solid",
            borderWidth: 1,
            ...props.style,
        },
        iconStyle: {
            textAlign: "center"
        },
        text: {
            ...globalStyles.text,
            paddingLeft: 15,
        }
    });

    const hundlePress = () => {
        var check = checked;
        props.onPress(!check);
        setChecked(!check);
    }

    const showCheck = (check) => {
        if (check)
            return (
                <MaterialIcons style={styles.iconStyle} name="check" size={fontSizes.xLarge} color={colors.primaryFontColor} />
            );
    }
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{props.title}</Text>
            <TouchableOpacity style={styles.button} onPress={hundlePress}>
                {showCheck(checked)}
            </TouchableOpacity>
        </View>
    )



}
