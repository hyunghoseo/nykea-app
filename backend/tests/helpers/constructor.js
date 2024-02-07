/**
 * @param {string | number} id
 */
const constructGroup = (id) => {
    return {
        data: {
            "Name": "Test Group " + id,
            "ShortDescription": "Group Description " + id,
            "Picture": null,
            "locale": "en",
            "publishedAt": Date.now(),
        }
    };
}

module.exports = {
    constructGroup
}