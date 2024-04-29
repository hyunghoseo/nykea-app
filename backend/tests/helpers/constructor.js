/**
 * @param {string | number} id
 */
const constructAnnouncement = (id) => {
    return {
        data: {
            "Title": "Test Announcement " + id,
            "HostingGroup": null,
            "Poster": null,
            "Description": [
                {
                    "type": "heading",
                    "children": [
                        {
                            "type": "text",
                            "text": "HelloOOOOO"
                        }
                    ],
                    "level": 2
                }
            ],
            "Private": false,
            "YoutubeURL": null,
            "locale": "en",
            "publishedAt": Date.now(),
        }
    };
}

/**
     * @param {string | number} id
     */
const constructBanner = (id) => {
    return {
        data: {
            "Title": "Banner Title " + id,
            "Description": "Banner Description " + id,
            "Link": {
                "id": 1,
                "Label": "NY Korean Family Church",
                "URL": "www.nykea.org"
            },
            "StartDate": "2024-01-26",
            "EndDate": "2024-02-26",
            "locale": "en"
        }
    };
}

/**
 * @param {string | number} id
 */

const constructChurchInfo = (id) => {
    return {
        data: {
            "ChurchName": "Test Name " + id,
            "Phone": "000-000-0000",
            "Email": "test" + id + "@test.com",
            "Address": id + "north haledon",
            "PrivatePolicy": "policy" + id,
            "locale": "en",
            "publishedAt": Date.now(),
        }
    };
}

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
            "Memo": null,
            "DateCompleted": null,
        }
    };
}

/**
 * @param {string | number} id
 */

const constructEvent = (id) => {
    return {
        data: {
            "Title": "Event Title " + id,
            "Poster": null,
            "StartDate": {
                "Date": "2024-04-14",
                "Time": "12:13:54.000",
                "TimeZone": "EST"
            },
            "Location": [
                {
                    "Label": "KEA Church 100",
                    "AddressURL": "www.google.com",
                    "Address": "374 Squaw Brook Rd",
                    "AddressDetail": null,
                    "City": null,
                    "Country": null,
                    "state": null
                }
            ],
            "Description": "Event Description " + id,
            "HostingGroup": null,
            "Fee": "$ Event Fee " + id,
            "Contact": "Event Contact " + id,
            "Private": false,
            "locale": "en"
        }
    };
}

module.exports = {
    constructBanner,
    constructGroup,
    constructChurchInfo,
    constructUserInfo,
    constructLeader,
    constructSupportTicket,
    constructEvent,
    constructAnnouncement
}