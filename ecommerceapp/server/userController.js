const CC = require('./connectAndClose');

async function getUserByEmail(emailAddress) {
    try {
        let user;
        await CC.connectAndClose(async (database) => {
        const Users = database.collection('Users');
        user = await Users.findOne({ email: emailAddress });
        });
        return user;
    } catch (error) {
        console.error(`Error retrieving user ${emailAddress}:`, error);
        throw new Error(`Error retrieving user ${emailAddress}`);
    }
}

async function insertUser() {
    
}
exports.getUserByEmail = getUserByEmail;