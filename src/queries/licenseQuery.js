export const get30License = "SELECT * FROM license_challenge.license ORDER BY bigCategory, smallCategory, licenseName LIMIT "
export const getLicense = "SELECT * FROM license_challenge.license WHERE licenseId = ?;"