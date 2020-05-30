
import React, { useState } from 'react';
import { StyleSheet, Text, View, Image, ImageBackground, StatusBar } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import { globalStyles } from '../global/styleConstants';
import TextInput from './customTextInput';

// title: the title to be shown beside the text block
// value: the state in which is connected to this component
// editable: if this text block is editable
// onSave: async method to be executed on saving
export default function EditableTextBlock(props) {

    const [editing, setEditing] = useState(false);
    const [value, setValue] = useState(props.value);

    const [loading, setLoading] = useState(false);

    const startEditing = () => {
        setEditing(true);
    }

    const onCancel = () => {
        setValue(props.value);
        setEditing(false);
    }

    const onDone = async () => {
        setLoading(true);
        await props.onSave(value);
        setLoading(false);
        setEditing(false);
        setValue(props.value);
    }

    // To convert the buttons to waiting icon on loading
    const getButtons = () => {
        if (loading) {
            return (
                <View style={styles.iconsContainer}>
                    <MaterialIcons style={styles.editIcon} name='more-horiz' size={28} />
                </View>
            );
        }
        else {
            return (
                <View style={styles.iconsContainer}>
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
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>{props.title}</Text>
                    </View>
                    <TextInput inputContainerStyle={styles.inputContainerStyle} value={value} onChangeText={(value) => setValue(value)} placeholder={props.value} />
                    {getButtons()}
                </View>
            );
        else
            return (
                <View style={styles.container}>
                    <View style={styles.titleContainer}>
                        <Text style={styles.title}>{props.title}</Text>

                    </View>
                    <View style={styles.textContainer}>
                        <Text style={styles.text}>{props.value}</Text>

                    </View>
                    <MaterialIcons style={styles.editIcon} name='create' size={28} onPress={startEditing} />
                </View>
            );
    else
        return (<View style={styles.container}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>{props.title}</Text>
            </View>
            <View style={styles.textContainer}>
                <Text style={styles.text}>{props.value}</Text>
            </View>
        </View>)
}

const styles = StyleSheet.create({
    container: {
        flexDirection: "row-reverse"
    },
    text: {
        ...globalStyles.text,
        margin: 10,
        textAlign: "right"
    },
    textContainer: {
        marginVertical:15,

        width: '50%'
    },
    title: {
        ...globalStyles.text,
        textAlign: "right",
        margin: 10,
    },
    titleContainer: {
        marginVertical:15,

        width: '30%'
    },
    editIcon: {
        flex: 1,
        justifyContent: "flex-end",
        alignSelf: "center",
        marginLeft: 10
    },
    inputContainerStyle: {
        width: '50%'
    },
    iconsContainer: {
        flexDirection: "row-reverse",
        flex: 1
    }
})