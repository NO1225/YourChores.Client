
import React from 'react';
import { StyleSheet, Text, View, Image, ImageBackground, StatusBar } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function CustomeHeader({ title, navigation }) {

    const openMenu = () => {
        navigation.openDrawer();
    }

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <MaterialIcons name='more-vert' size={28} onPress={openMenu} />
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
        textAlign: "center"
    },
    horizantalLine: {
        height: 5,
        backgroundColor: '#8B7FF9',
        marginBottom: 5
    }
})