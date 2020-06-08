
import React from 'react';
import { StyleSheet, Text, View, Image, ImageBackground, StatusBar, useColorScheme } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import {colors, globalStyles, fontSizes} from '../global/styleConstants'

export default function CustomHeaderWithBack({ title, navigation }) {

    const openMenu = () => {
        navigation.pop();
    }

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <MaterialIcons name='arrow-forward' size={28} onPress={openMenu} />
                <View style={styles.textContainer} >
                    <Text style={styles.text}>{title}</Text>
                </View>
            </View>
            <View style={styles.horizantalLine} >

            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        height: StatusBar.currentHeight + 60,
    },
    headerContainer: {
        marginTop: StatusBar.currentHeight,
        paddingHorizontal:10,
        flex: 1,
        flexDirection: 'row-reverse',
        alignItems: "center"
    },
    textContainer: {
        flex: 1,
    },
    text: {
        ...globalStyles.text,
        fontSize :fontSizes.xLarge,
        textAlign: "center"
    },
    horizantalLine: {
        height: 5,
        backgroundColor: colors.accent1,
    }
})