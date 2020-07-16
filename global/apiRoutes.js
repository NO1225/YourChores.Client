const API_URL = "http://yourchores.me/";
//const API_URL = "http://192.168.8.101:8080/";

module.exports = {
    appVersion : API_URL + "api/appVersion",

    register: API_URL + "api/auth/register",
    login: API_URL + "api/auth/login",
    tokenLogin: API_URL + "api/auth/tokenlogin",

    getMyInfo: API_URL + "api/auth/getmyinfo",
    changeName: API_URL + "api/auth/changename",
    changePassward: API_URL + "api/auth/changepassward",

    getMyRooms: API_URL + "api/Rooms",
    createRoom: API_URL + "api/Rooms",
    updateRoom: API_URL + "api/Rooms/Update",
    joinRoom: API_URL + "api/Rooms/Join",
    inviteMember: API_URL + "api/Rooms/Invite",    
    leaveRoom: API_URL + "api/Rooms/Leave",
    kickMember: API_URL + "api/Rooms/Kick",
    getRoomDetails: (id) => `${API_URL}api/Rooms/getRoomById/${id}`,
    searchRoomName: (name) => `${API_URL}api/Rooms/getRoomsByName/${name}`,

    promoteMember: API_URL + "api/Rooms/Promote",
    demoteOwner: API_URL + "api/Rooms/Demote",
    findMember: API_URL + "api/Rooms/FindMember",

    acceptRequest: API_URL + "api/Rooms/AcceptRequest",
    declineRequest: API_URL + "api/Rooms/DeclineRequest",
    cancelInvitation: API_URL + "api/Rooms/CancelInvitaion",

    acceptInvitation: API_URL + "api/Rooms/AcceptInvitation",
    declineInvitation: API_URL + "api/Rooms/DeclineInvitation",
    cancelRequest: API_URL + "api/Rooms/CancelRequest",

    getMyRequests: API_URL + "api/Rooms/GetMyRequests",

    createChore : API_URL + "api/Chores",
    getMyChores : API_URL + "api/Chores",
    updateChore : API_URL + "api/Chores/Update",


}