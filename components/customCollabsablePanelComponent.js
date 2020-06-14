import React, { useState } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import { colors, fonts, fontSizes, globalStyles } from '../global/styleConstants'

/// props.style => text style
/// props.inputContainerStyle => container style
export default function CustomCollabsablePanelComponent(props) {
    const [collabse, setCollabse] = useState(false);

    const styles = StyleSheet.create({
        text: {
            ...globalStyles.text,
            padding: 10
        },
        collabsableHeader: {
            flexDirection: "row-reverse",
            alignItems: "center"
        }
    });

    return (
        <View>
            <TouchableOpacity style={styles.collabsableHeader} onPress={() => setCollabse(!collabse)}>
                <Text style={styles.text}>{props.title}</Text>
                {collabse ? <MaterialIcons style={styles.iconStyle} name="keyboard-arrow-left" size={fontSizes.xLarge} color={colors.primaryFontColor} />
                    : <MaterialIcons style={styles.iconStyle} name="keyboard-arrow-down" size={fontSizes.xLarge} color={colors.primaryFontColor} />
                }
            </TouchableOpacity>
            {collabse ? null :
                <View>
                    {props.children}
                </View>
            }
        </View>
    )



}
