// All the names of screens used in navigation
const screens = {
    Timeline: 'الصفحة الرئيسية',
    Rooms: 'الغرف',
    Settings: 'الاعدادت',
    RoomsScreen: 'RoomsScreen',
    RoomDetailsScreen: 'RoomDetailsScreen',
    AddChoreScreen: 'AddChoreScreen',
    RoomSettingsScreen: 'RoomSettingsScreen',
    SettingsScreen: 'SettingsScreen',
    TimelineScreen: 'TimelineScreen',

    // SwitchNavigation
    DrawerNavigationScreen: 'DrawerNavigationScreen',
    LoginScreen: 'loginScreen',
    SignupSCreen: 'signupScreen',
}

const urgency = {
    Low: 1,
    Medium: 2,
    High: 3,
    translate: (value) => {
        switch (value) {
            case 1:
            case '1':
                return "منخفض";
            case 2:
            case '2':
                return "متوسط";
            case 3:
            case '3':
                return "عالي";
        }
    }
}

const papulateOptions = (enums) => {
    var options = [];
    for (var key in enums) {
        if (enums.hasOwnProperty(key) && key != 'translate') {
            options.push({
                value: enums[key],
                text: enums.translate(enums[key]),
                key: `${enums[key]}`
            })
        }
    }
    return options;
}


export { screens, urgency, papulateOptions }