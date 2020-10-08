/* eslint-disable no-unused-vars */
/**
* Removes user scores from user's profile.
* @param module users data SQL queries module.
* @param module gamification data SQL queries module.
* @callback 
* @async
* @param {number} id - The unique user number.
* @return {Promise<object>}
*/
const removeUserPoints = (usersData, gamificationData) => {
    return async (userId) => {
        const date = await usersData.getExpDate(+userId);
        const points = Math.round(date.dateDiff / 10);
        const removePoints = await gamificationData.removePoints(userId, +points);
        const currentPoints = await gamificationData.getPoints(userId);
        if (currentPoints[0].user_points <= 50) {
            const currentLevel = Math.ceil(currentPoints[0].user_points / 10);
            const update = await gamificationData.decreaseLevel(currentLevel, userId);
        }
    };
};


/**
* Adds scores to user's profile.
* @param module gamification data SQL queries module.
* @callback 
* @async
* @param {number} id - The unique user number.
* @return {Promise<object>}
*/
const addUserPoints = (gamificationData) => {
    return async (userId) => {
        const addPoint = await gamificationData.addPoint(userId);
        const pointsInfo = await gamificationData.getPoints(userId);
        if (pointsInfo[0].user_points % 10 === 0 && pointsInfo[0].user_points <= 50) {
            const update = await gamificationData.changeLevel(userId);
        }
    };
};

export default {
    removeUserPoints,
    addUserPoints,
};