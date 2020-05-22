import React, { useState } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

import {screens} from '../global/globalConstants';

import {
    DrawerContentScrollView,
    DrawerItemList,
    DrawerItem
} from '@react-navigation/drawer';

export default function CustomDrawer(props) {

    const logOut = () => {
         props.setCurrentScreen(screens.LoginScreen);
    }

    return (
        <View style={styles.container}>
            <View style={styles.headerContent}>
                <Text style={styles.text}>واجباتك</Text>
            </View>
            <DrawerContentScrollView  {...props}>
                <DrawerItemList {...props} />
            </DrawerContentScrollView>
            <View style={styles.itemContainer}>
                <DrawerItem
                    style={styles.drawerItem}
                    label="تسجيل خروج"
                    onPress={logOut}
                />
            </View>
        </View>

    )
}

const styles = StyleSheet.create({
    headerContent: {
        height: 60,
        justifyContent: "center",
        alignItems: "center",
    },
    text: {
        color: '#000000',
        fontSize: 18,
    },
    container: {
        flex: 1,
    },
    itemContainer: {
        flex: 1,
        justifyContent: "flex-end"
    },
    drawerItem: {
        alignContent: "flex-end"
    }
});
