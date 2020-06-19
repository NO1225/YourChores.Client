const API_URL = "http://192.168.8.100:5001/";

module.exports = {

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
    acceptRequest: API_URL + "api/Rooms/Accept",
    cancelInvitation: API_URL + "api/Rooms/CancelInvitaion",
    leaveRoom: API_URL + "api/Rooms/Leave",
    kickMember: API_URL + "api/Rooms/Kick",
    promoteMember: API_URL + "api/Rooms/Promote",
    demoteOwner: API_URL + "api/Rooms/Demote",
    getRoomDetails: (id) => `${API_URL}api/Rooms/getRoomById/${id}`,
    searchRoomName: (name) => `${API_URL}api/Rooms/getRoomsByName/${name}`,
    findMember: API_URL + "api/Rooms/FindMember",


}