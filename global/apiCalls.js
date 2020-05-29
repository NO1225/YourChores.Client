import { AsyncStorage } from 'react-native'

const get = async (apiRoute) => {
    var res = await fetch(apiRoute);

    var data = res.json();

    return data;
}

const authGet = async (apiRoute) => {
    var token = await AsyncStorage.getItem("TOKEN");

    var res = await fetch(apiRoute, {
        method: "get",
        headers: new Headers({
            "Authorization": `Bearer ${token}`
        })
    })
    var data = res.json();

    return data;
}

const post = async (apiRoute, body) => {

    var res = await fetch(apiRoute, {
        method: "post",
        headers: new Headers({
            "Content-Type": "application/json"
        }),
        body: JSON.stringify(body)
    })

    var data = res.json();

    return data;
}

const authPost = async (apiRoute, body) => {
    var token = await AsyncStorage.getItem("TOKEN");
    var res = await fetch(apiRoute, {
        method: "post",
        headers: new Headers({
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`
        }),
        body: JSON.stringify(body)
    })

    console.log(res.status);

    var data={};
    if (res.status == "401") {
        data.success = false;
        data.errors = ["Unauthorized"];
        return data;
    }
    data = res.json();

    return data;
}

module.exports = {
    get,
    authGet,
    post,
    authPost
}