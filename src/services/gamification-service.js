/* eslint-disable no-unused-vars */

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