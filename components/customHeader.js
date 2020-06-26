
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Modal, StatusBar, FlatList } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

import { authPost, authGet } from '../global/apiCalls'
import apiRoutes from '../global/apiRoutes'
import { joinRequestType } from '../global/globalConstants';

import { colors, globalStyles, fontSizes } from '../global/styleConstants'

import IconButton from './customIconButton';
import RequestComponent from './requestComponent';
import CollabsablePanel from './customCollabsablePanelComponent';

export default function CustomeHeader({ title, navigation }) {
    const [requests, setRequests] = useState([]);
    const [invitations, setInvitations] = useState([])

    const [pendingInvitations, setPendingInvitations] = useState(0);

    const [popUpVisible, setPopUpVisible] = useState(false);

    const openMenu = () => {
        navigation.openDrawer();
    }

    const getMyRequests = async () => {
        var data = await authGet(apiRoutes.getMyRequests);
        console.log(data);
        if (data.success) {
            setRequests(await data.response.filter(request => request.joinRequestType == joinRequestType.Join))
            setInvitations(await data.response.filter(request => request.joinRequestType == joinRequestType.Invite))
            setPendingInvitations((await data.response.filter(request => request.joinRequestType == joinRequestType.Invite)).length)
        }
        else {
            var errors = '';
            data.errors.map(error => { errors = errors + error + '\n' });
            alert(errors);
        }
    }


    const declineInvitation = async (requestId) => {
        var data = await authPost(apiRoutes.declineInvitation, {
            "joinRequestId": requestId
        });

        if (data.success) {
            getMyRequests();
        }
        else {
            var errors = '';
            data.errors.map(error => { errors = errors + error + '\n' });
            alert(errors);
        }
    }

    const acceptInvitation = async (requestId) => {
        var data = await authPost(apiRoutes.acceptInvitation, {
            "joinRequestId": requestId
        });

        if (data.success) {
            getMyRequests();
        }
        else {
            var errors = '';
            data.errors.map(error => { errors = errors + error + '\n' });
            alert(errors);
        }
    }

    const cancelRequest = async (requestId) => {
        console.log(requestId)
        var data = await authPost(apiRoutes.cancelRequest, {
            "joinRequestId": requestId
        });

        if (data.success) {
            getMyRequests();
        }
        else {
            var errors = '';
            data.errors.map(error => { errors = errors + error + '\n' });
            alert(errors);
        }
    }


    // Automatic reload when the screen is reentered
    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            // The screen is focused
            // Call any action
            getMyRequests();

        });

        // Return the function to unsubscribe from the event so it gets removed on unmount
        return unsubscribe;
    }, [navigation]);

    return (
        <View style={styles.container}>
            <Modal visible={popUpVisible}>
                <View>
                    <View style={styles.header}>
                        <IconButton style={styles.iconButton} icon="clear" onPress={() => setPopUpVisible(false)} />

                    </View>

                    <CollabsablePanel title="الدعوات">
                        <FlatList
                            data={invitations}
                            keyExtractor={item => `${item.joinRequestId}`}
                            renderItem={({ item }) => {
                                var buttons = [];
                                buttons.push({ icon: "clear", method: declineInvitation });

                                buttons.push({ icon: "check", method: acceptInvitation });
                                return (
                                    <RequestComponent request={item} buttons={buttons} />
                                );
                            }
                            }
                        />
                    </CollabsablePanel>

                    <CollabsablePanel title="الطلبات المرسلة">
                        <FlatList
                            data={requests}
                            keyExtractor={item => `${item.joinRequestId}`}
                            renderItem={({ item }) => {
                                var buttons = [];
                                buttons.push({ icon: "clear", method: cancelRequest });

                                return (
                                    <RequestComponent request={item} buttons={buttons} />
                                );
                            }
                            }
                        />
                    </CollabsablePanel>
                </View>
            </Modal>
            <View style={styles.headerContainer}>
                <MaterialIcons name='more-vert' size={28} onPress={openMenu} />
                <View style={styles.textContainer} >
                    <Text style={styles.text}>{title}</Text>
                </View>
                <IconButton style={styles.iconButton} notifications={pendingInvitations} icon="mail-outline" onPress={() => setPopUpVisible(true)} />


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
        paddingHorizontal: 10,
        flex: 1,
        flexDirection: 'row-reverse',
        alignItems: "center"
    },
    textContainer: {
        flex: 1,
    },
    text: {
        ...globalStyles.text,
        fontSize: fontSizes.xLarge,
        textAlign: "center"
    },
    horizantalLine: {
        height: 5,
        backgroundColor: colors.accent1,
    },
    iconButton: {
        padding: 0,
        width: 40,
        height: 40,
        borderRadius: 40,
    },
    header: {
        padding: 10,
    }
})