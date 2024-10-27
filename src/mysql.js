/**
 * Compile a CREATE VIEW statement.
 * @param {string} name
 * @param {string} query
 * @param {bool} orReplace
 * @returns {string}
 */
export function compileCreateView(name, query, orReplace) {
    return `CREATE ${orReplace ? 'OR REPLACE ' : ''}VIEW \`${name}\` AS ${query};`;
}

/**
 * Compile a DROP VIEW statement.
 * @param {string} name
 * @param {boolean} ifExists
 * @returns {string}
 */
export function compileDropView(name, ifExists) {
    return `DROP VIEW ${ifExists ? 'IF EXISTS ' : ''}\`${name}\`;`;
}