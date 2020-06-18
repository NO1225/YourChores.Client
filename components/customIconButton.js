import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons'; 

import { colors, fonts, fontSizes, globalStyles } from '../global/styleConstants'

export default function CustomIconButton(props) {

    const styles = StyleSheet.create({
        button: {
            width:60,
            height:60,
            backgroundColor: colors.accent1,
            justifyContent:'center',
            borderRadius: 60,        
            ...props.style,
        },
        iconStyle:{
            textAlign:"center"
        },
        notification:{
            width:20,
            height:20,
            borderRadius: 20,  
            backgroundColor: colors.accent3,
            marginTop: -20,
        },
        notificationText:{
            ...globalStyles.text,
            fontSize: fontSizes.small,
            textAlign: "center",
            color: colors.primaryBackgroundColor
        }
    });
    
    
    return (
        <TouchableOpacity style={styles.button} onPress={props.onPress}>
            {props.notifications?
            <View style={styles.notification}>
                <Text style={styles.notificationText}>{props.notifications}</Text>
            </View>
            :null}
            
            <MaterialIcons style={styles.iconStyle} name={props.icon} size={fontSizes.xLarge} color={colors.primaryBackgroundColor} />
        </TouchableOpacity>

    )



}
