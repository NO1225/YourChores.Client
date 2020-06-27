import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableWithoutFeedback, TouchableOpacity, FlatList } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import { colors, fonts, fontSizes, globalStyles } from '../global/styleConstants'

import Modal from './customModalComponent';

/// props.style => text style
/// props.inputContainerStyle => container style
/// props.buttonStyle => Style of the button
export default function CustomComboBoxComponent(props) {
    const [popUpVisible, setPopUpVisible] = useState(false);


    const styles = StyleSheet.create({
        inputContainer: {

            minWidth: '90%',
            alignSelf: "center",
            ...props.inputContainerStyle
        },

        text: {
            ...globalStyles.text,
            marginBottom: 0,
        },

        modalView: {
            maxHeight: 150,
            
        },
        listStyle: {
            flexGrow: 0
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
            flexDirection: "row-reverse",
            justifyContent: "space-between",
            padding: 10,
            borderColor: colors.secondaryFontColor,
            borderStyle: "solid",
            borderWidth: 1,
            ...props.buttonStyle
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

                visible={popUpVisible}
                setVisible={setPopUpVisible}
                style={styles.modalView}
            >

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



            </Modal>
            <Text style={styles.text}>{props.title}</Text>
            <View>
                <TouchableOpacity style={styles.button} onPress={() => setPopUpVisible(true)}>
                    <Text style={styles.buttonTitle}>{props.selected ? props.options.filter(opt => opt.value == props.selected)[0].text : props.title}</Text>
                    <MaterialIcons name="arrow-drop-down" size={24} color="black" />
                </TouchableOpacity>
            </View>


        </View>

    )



}
