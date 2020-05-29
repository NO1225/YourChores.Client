
import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, ImageBackground, StatusBar } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import { globalStyles } from '../global/styleConstants';
import TextInput from './customTextInput';

export default function CustomeHeader(props) {

    const [editing, setEditing] = useState(false);
    const [value, setValue] = useState(props.value);


    const startEditing = () => {
        setEditing(true);
    }

    const onCancel = () => {
        setValue(props.value);
        setEditing(false);
    }

    const onDone = async () => {
        await props.onSave(value);
        setEditing(false);
        setValue(props.value);
    }

    if (props.editable)
        if (editing)
            return (
                <View style={styles.textContainer}>
                    <Text style={styles.text}>{props.title}</Text>
                    <TextInput inputContainerStyle={styles.inputContainerStyle} value={value} onChangeText={(value) => setValue(value)} placeholder={props.value} />
                    <MaterialIcons style={styles.editIcon} name='clear' size={28} onPress={onCancel} />
                    <MaterialIcons style={styles.editIcon} name='done' size={28} onPress={onDone} />

                </View>
            );
        else
            return (
                <View style={styles.textContainer}>
                    <Text style={styles.text}>{props.title}</Text>
                    <Text style={styles.text}>{props.value}</Text>
                    <MaterialIcons style={styles.editIcon} name='create' size={28} onPress={startEditing} />
                </View>
            );
    else
        return (<View style={styles.textContainer}>
            <Text style={styles.text}>{props.title}</Text>
            <Text style={styles.text}>{props.value}</Text>
        </View>)
}

const styles = StyleSheet.create({
    textContainer: {
        flexDirection: "row-reverse"
    },
    text: {
        ...globalStyles.text,
        alignSelf: "center",
        margin: 10
    },
    editIcon: {
        flex: 1,
        justifyContent: "flex-end",
        alignSelf: "center",
        marginLeft: 10
    },
    inputContainerStyle: {
        width: '50%'
    }
})