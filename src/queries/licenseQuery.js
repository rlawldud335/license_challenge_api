export const getManyLicense = "SELECT * FROM license_challenge.license ORDER BY bigCategory, smallCategory, licenseName LIMIT "
export const getLicense = "SELECT * FROM license_challenge.license WHERE licenseId = ?;"
export const searchLicense = "SELECT licenseName, licenseId FROM license_challenge.license WHERE licenseName regexp ?;"