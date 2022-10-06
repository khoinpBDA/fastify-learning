/**
 * Generate random string
 * @param {*} length default 8
 * @returns string
 */
 function randomString(length = 8) {
    var result = "";
    var characters = "0123456789abcdefghijklmnopqrstuvwxyz";
    var charactersLength = characters.length;
    for (var i = 0; i < length; i++) {
        result += characters.charAt(
            Math.floor(Math.random() * charactersLength)
        );
    }
    return result;
}

module.exports = { randomString };
