import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback,TouchableOpacity, Modal, FlatList } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; 

import { colors, fonts, fontSizes, globalStyles } from '../global/styleConstants'

import Button from './customButton';

/// props.style => text style
/// props.inputContainerStyle => container style
export default function CustomComboBoxComponent(props) {
    const [popUpVisible, setPopUpVisible] = useState(false);


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
            padding: 15,
            paddingHorizontal: 30,
            borderColor: colors.secondaryBackgroundColor,
            borderStyle: "solid",
            borderWidth: 1,
            margin: 10,
        },
        text: {
            ...globalStyles.text,
            marginBottom: 0,
        },
        centeredView: {
            flex: 1,
            justifyContent: "center",
            alignItems: "center",
        },
        modalView: {
            height: 150,
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
            elevation: 5
        },
        listStyle: {
            flex: 1,
        },
        itemContainer: {
            borderColor: colors.secondaryFontColor,
            borderStyle: "solid",
            borderWidth: 1,
            height: 50,
            padding: 10,
            margin: 1,
            alignItems: "center",
            justifyContent: "center",
            flex: 1,
        },
        button: {
            flexDirection:"row-reverse",
            justifyContent: "space-between",
            padding: 10,
            borderColor: colors.secondaryFontColor,
            borderStyle: "solid",
            borderWidth: 1,
        },
        buttonTitle: {
            fontFamily: fonts.almaraiBold,
            fontSize: fontSizes.large,
            color: colors.primaryFontColor,
        }
    });

    const hundleSelection = (value) => {
        props.onSelect(value);
        setPopUpVisible(false);
    }

    return (
        <View style={styles.inputContainer}>
            <Modal
                animationType="slide"
                transparent={true}
                visible={popUpVisible}
                onRequestClose={() => {
                    console.log("Modal has been closed.");
                }}
            >
                <View style={styles.centeredView} >
                    <View style={styles.modalView}>
                        <FlatList style={styles.listStyle} data={props.options}
                            renderItem={({ item }) => {
                                return (
                                    <TouchableWithoutFeedback onPress={() => hundleSelection(item.value)}>
                                        <View style={styles.itemContainer}>
                                            <Text style={styles.text}>{item.text}</Text>
                                        </View>
                                    </TouchableWithoutFeedback>
                                );
                            }} />

                    </View>
                </View>

            </Modal>
            <Text style={styles.text}>{props.title}</Text>
            <View style={styles.textInputContainer}>
                <TouchableOpacity style={styles.button} onPress={()=>setPopUpVisible(true)}>
                    <Text style={styles.buttonTitle}>{props.selected?props.options.filter(opt=>opt.value == props.selected)[0].text:props.title}</Text>
                    <MaterialIcons name="arrow-drop-down" size={24} color="black" />
                </TouchableOpacity>
            </View>


        </View>

    )



}
