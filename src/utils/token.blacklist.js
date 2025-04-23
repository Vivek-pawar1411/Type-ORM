// Using a Set for O(1) average time complexity for lookups
const blacklistedTokens = new Set();

const addTokenToBlacklist = (token) => {
    blacklistedTokens.add(token);
};

const isBlacklisted = (token) => {
    return blacklistedTokens.has(token);
};

module.exports = {
    blacklistedTokens,
    addTokenToBlacklist,
    isBlacklisted
};
