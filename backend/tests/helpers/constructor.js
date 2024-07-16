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
 */

const constructEvent = (id) => {
    return {
        data: {
            "Title": "Event Title " + id,
            "Poster": null,
            "Picture": null,
            "StartDate": {
                "id": 1,
                "Date": "2024-12-31",
                "Time": "12:00:00.000",
                "TimeZone": "New York, NY, USA (GMT-4)"
            },
            "EndDate": null,
            "Location": [
                {
                    "id": 1,
                    "Label": "KEA NY Family Church",
                    "AddressURL": "https://www.google.com/maps/place/KEA+NY+Family+Church/@40.9663491,-74.1853393,17z/data=!3m1!4b1!4m6!3m5!1s0x89c2fd3b52a5eeb5:0xe3f6754a3483b46d!8m2!3d40.9663451!4d-74.1827697!16s%2Fg%2F11c1ww4t_2?entry=ttu",
                    "Address": "374 Squaw Brook Rd",
                    "AddressDetail": null,
                    "City": "North Haledon",
                    "Country": "USA",
                    "State": "NJ, New Jersey"
                }
            ],
            "Links": [],
            "Description": [
                {
                    "type": "paragraph",
                    "children": [
                        {
                            "type": "text",
                            "text": "Welcome!"
                        }
                    ]
                }
            ],
            "HostingGroup": null,
            "Fee": null, 
            "Contact": null,
            "Private": false,
            "locale": "en"
        }
    };
}

module.exports = {
    constructAnnouncement,
    constructBanner,
    constructChurchInfo,
    constructEvent,
    constructGroup,
    constructLeader,
    constructSupportTicket,
    constructUserInfo
}