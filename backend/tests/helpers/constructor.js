/**
 * @param {string | number} id
 */
const constructGroup = (id) => {
    return {
        data: {
            "Name": "Test Group " + id,
            "ShortDescription": "Group Description " + id,
            "Picture": null,
            "Type": "Administrative",
            "locale": "en",
            "publishedAt": Date.now(),
        }
    };
}

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
            "Title": "Pastor",
            "FullName": userInfoId,
            "Picture": null,
            "locale": "en",
            "publishedAt": Date.now(),
        }
    };
}

/**
 * @param {string | number} id
 */

const constructSupportTicket = (id) => {
    return {
        data: {
            "FullName": "Test Name" + id,
            "Email": "test" + id + "@email.com",
            "Phone": "111-111-1111",
            "Title": "Test Title" + id,
            "Message": "Test Message" + id,
            "DateSubmitted": Date.now(),
            "Status": "Submitted", // "Under Review" or "Completed"
            "Memo": "Test Memo" + id,
            "DateCompleted": Date.now(),
        }
    };
}

module.exports = {
    constructGroup, 
    constructUserInfo, 
    constructLeader,
    constructSupportTicket
}