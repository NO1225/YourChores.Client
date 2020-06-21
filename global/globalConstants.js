// All the names of screens used in navigation
const screens = {
    Timeline: 'الصفحة الرئيسية',
    Rooms: 'الغرف',
    Settings: 'الاعدادت',
    RoomsScreen: 'RoomsScreen',
    RoomDetailsScreen: 'RoomDetailsScreen',
    RoomSearchScreen: 'RoomSearchScreen',
    RoomSettingsScreen: 'RoomSettingsScreen',
    MemberSearchScreen: 'MemberSearchScreen',
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


const choreState = {
    All: 1,
    Pending: 2,
    Done: 3,
    translate: (value) => {
        switch (value) {
            case 1:
            case '1':
                return "الجميع";
            case 2:
            case '2':
                return "قيد الانتظار";
            case 3:
            case '3':
                return "المنجز";
        }
    }
}


const sortBy = {
    MostRecent: 1,
    Urgency: 2,
    translate: (value) => {
        switch (value) {
            case 1:
            case '1':
                return "الاحدث";
            case 2:
            case '2':
                return "الاهم";

        }
    }
}

const joinRequestType = {
    Join: 1,
    Invite: 2,
    translate: (value) => {
        switch (value) {
            case 1:
            case '1':
                return "طلب انظمام";
            case 2:
            case '2':
                return "دعوة";

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


export { screens, urgency, choreState, joinRequestType, sortBy, papulateOptions }