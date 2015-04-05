
export default {

		/**
		 * Grouping function to group the master list by price
		 *
		 * @public
		 * @param oContext the current list item context
		 * @returns {object} an object with the rating as key and a text for the group headers
		 */
		Group1 : function (oContext){
			var iPrice = oContext.getProperty("UnitNumber"),
				sKey,
				sText,
				oResourceBundle = this.getModel("i18n").getResourceBundle(); // this is the source control

			if (iPrice <= 20) {
				sKey = "LE20";
				sText = oResourceBundle.getText("masterGroup1Header1");
			} else {
				sKey = "GT20";
				sText = oResourceBundle.getText("masterGroup1Header2");
			}
			return {
				key : sKey,
				text : sText
			};
		}
	};