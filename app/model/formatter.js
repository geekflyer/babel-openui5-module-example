/**
 * Returns None for phone and SingleSelectMaster for other devices
 *
 * @public
 * @param bIsPhone
 * @returns {sap.m.ListMode}
 */
export var listMode = bIsPhone => bIsPhone ? "None" : "SingleSelectMaster";

/**
 * Returns Active for phone and Inactive for other devices
 *
 * @public
 * @param bIsPhone
 * @returns {string}
 */
export var listItemType = bIsPhone => bIsPhone ? "Active" : "Inactive";

/**
 * Rounds the currency value to 2 digits
 *
 * @public
 * @param sValue
 * @returns {string}
 */
export var currencyValue = sValue => !sValue ? '' : parseFloat(sValue).toFixed(2);