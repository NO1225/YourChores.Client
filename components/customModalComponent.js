import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback, TouchableOpacity, Modal, FlatList } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import { colors, fonts, fontSizes, globalStyles } from '../global/styleConstants'

import Button from './customButton';

/// props.style => cardStyle style
export default function CustomModalComponent(props) {


    const styles = StyleSheet.create({

        centeredView: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
        },
        modalView: {
            maxHeight: 200,
            flexDirection: "column",
            minWidth: '90%',
            margin: 20,
            backgroundColor: colors.primaryBackgroundColor,
            borderRadius: 0,
            padding: 5,
            shadowColor: colors.primaryFontColor,
            shadowOffset: {
                width: 0,
                height: 2
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
            ...props.style
        },
    });


    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={props.visible}
            onRequestClose={() => {
                console.log("Modal has been closed.");
            }}
        >
            <TouchableWithoutFeedback onPress={() => props.setVisible(false)}>

                <View style={styles.centeredView} >
                    <View style={styles.modalView}>
                        {props.children}
                    </View>
                </View>
            </TouchableWithoutFeedback>

        </Modal>

    )



}
