/**
  * @param {string | number} id
  */
const constructUserInfo = (id) => {
    return {
        data: {
            "DisplayName": "Chulsoo" + id + " Kim" + id,
            "FirstName": "Chulsoo" + id,
            "LastName": "Kim" + id,
            "MiddleName": null,
            "users_permissions_user": null,
            "locale": "en",
            "publishedAt": Date.now(),
        }
    };
}

/**
  * @param {string | number} id
  * @param {string | number} userInfoId
  */
const constructLeader = (id, userInfoId) => {
    return {
        data: {
            "StartYear": 2020,
            "EndYear": 9999,
            "FullName": userInfoId,
            "Title": "Pastor",
            "Picture": null,
            "locale": "en",
            "publishedAt": Date.now(),
        }
    };
}

module.exports = {
    constructUserInfo, constructLeader
}