/**
 * Remove the database name from the query
 * @param {string} databaseName
 * @param {string} query
 * @returns {string}
 */
export function removeDatabaseNameFromQuery(databaseName, query) {
    return query.replace(new RegExp('`' + databaseName + '`\\.', 'g'), '');
};