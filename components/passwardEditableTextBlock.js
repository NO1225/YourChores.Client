
import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, ImageBackground, StatusBar } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import { globalStyles } from '../global/styleConstants';
import TextInput from './customTextInput';
import KeyboardAvoidingView from './customKeyboardAvoidingView';

// TODO: Find a better keyboard avoiding view implementation

// title: the title to be shown beside the text block
// editable: if this text block is editable
// onSave: async method to be executed on saving
export default function CustomeHeader(props) {

    const [editing, setEditing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [currentPassward, setCurrentPassward] = useState("");
    const [newPassward, setNewPassward] = useState("");
    const [confirmPassward, setConfirmPassward] = useState("");


    const startEditing = () => {
        setEditing(true);
    }

    const onCancel = () => {
        setCurrentPassward("");
        setNewPassward("");
        setConfirmPassward("");
        setEditing(false);
    }

    const onDone = async () => {
        if (newPassward === confirmPassward) {
            setLoading(true);
            await props.onSave({
                oldPassward: currentPassward,
                newPassward: newPassward
            });
            setLoading(false);
            setCurrentPassward("");
            setNewPassward("");
            setConfirmPassward("");
            setEditing(false);
        }
        else {
            alert("يجب ان تتطابق كلمة السر الجديدة مع التأكيد")
        }
    }


    // To convert the buttons to waiting icon on loading
    const getButtons = () => {
        if (loading) {
            return (
                <View style={styles.iconContainer}>
                    <MaterialIcons style={styles.editIcon} name='more-horiz' size={28} />
                </View>
            );
        }
        else {
            return (
                <View style={styles.iconContainer}>
                    <MaterialIcons style={styles.editIcon} name='clear' size={28} onPress={onCancel} />
                    <MaterialIcons style={styles.editIcon} name='done' size={28} onPress={onDone} />
                </View>
            );
        }
    }

    if (props.editable)
        if (editing)
            return (
                    <View style={styles.container}>
                        <KeyboardAvoidingView style={styles.inputsContainer}>
                            <View style={styles.textContainer}>
                                <Text style={styles.text}>{"الحالية:"}</Text>
                                <TextInput inputContainerStyle={styles.inputContainerStyle} value={currentPassward} onChangeText={(value) => setCurrentPassward(value)} secureTextEntry />
                            </View>
                            <View style={styles.textContainer}>
                                <Text style={styles.text}>{"الجديد:"}</Text>
                                <TextInput inputContainerStyle={styles.inputContainerStyle} value={newPassward} onChangeText={(value) => setNewPassward(value)} secureTextEntry />

                            </View>
                            <View style={styles.textContainer}>
                                <Text style={styles.text}>{"تأكيد الجديدة:"}</Text>
                                <TextInput inputContainerStyle={styles.inputContainerStyle} value={confirmPassward} onChangeText={(value) => setConfirmPassward(value)} secureTextEntry />

                            </View>
                        </KeyboardAvoidingView>
                        {getButtons()}
                    </View>

            );
        else
            return (
                <View style={styles.textContainer}>
                    <Text style={styles.text}>{props.title}</Text>
                    <Text style={styles.text}>{"********"}</Text>
                    <MaterialIcons style={styles.editIcon} name='create' size={28} onPress={startEditing} />
                </View>
            );
    else
        return (<View style={styles.textContainer}>
            <Text style={styles.text}>{props.title}</Text>
            <Text style={styles.text}>{"********"}</Text>
        </View>)
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: "row-reverse",
        alignItems: "flex-end"
    },
    textContainer: {
        flexDirection: "row-reverse"
    },
    text: {
        ...globalStyles.text,
        alignSelf: "center",
        margin: 10,
        marginVertical: 25,
        width: '20%'
    },
    editIcon: {
        flex: 1,
        justifyContent: "flex-end",
        alignSelf: "center",
        marginLeft: 10
    },
    inputContainerStyle: {
        width: '70%'
    },

    inputsContainer: {
        flex: 1,
        flexDirection: "column"
    },
    iconContainer: {
        width: "20%",
        alignSelf: "stretch",
        flexDirection: "row-reverse",
    }
})