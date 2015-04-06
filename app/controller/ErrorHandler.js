import MessageBox from 'sap/m/MessageBox';

export default class ErrorHandler {

    /**
     * Handles application errors by automatically attaching to the model events and displaying errors when needed.
     *
     * @class
     * @public
     * @alias sap.ui.demo.mdtemplate.controller.ErrorHandler
     */
    constructor(oComponent) {
        this._oResourceBundle = oComponent.getModel("i18n").getResourceBundle();
        this._oComponent = oComponent;
        this._oModel = oComponent.getModel();
        this._bFirstCall = true;
        this._bMessageOpen = false;
        this._sCompactModeClass = sap.ui.Device.support.touch ? "" : "sapUiSizeCompact"; // compact mode for the MessageBoxes on non-touch devices

        this._oModel.attachEvent(
                "metadataFailed",
                oEvent => this._showMetadataError(this.constructor._constructErrorMessageFromResponse(oEvent.getParameters())),
                this
        );

        this._oModel.attachEvent("requestFailed", function (oEvent) {
            var response = oEvent.getParameters().response;

            // An entity that was not found in the service is also throwing a 404 error in oData.
            // We already cover this case with a notFound target so we skip it here.
            // A request that cannot be sent to the server is a technical error that we have to handle though
            if (response.statusCode != "404" || (response.statusCode === 404 && response.responseText.indexOf("Cannot POST") === 0)) {
                this._showServiceError(this.constructor._constructErrorMessageFromResponse(response));
            }
        }, this);
    }

    static _constructErrorMessageFromResponse(oResponse) {
        return `${oResponse.statusCode} (${oResponse.statusText})
                ${oResponse.message}
                ${oResponse.responseText}
                `
    }

    /**
     * Shows a {@link sap.m.MessageBox} when the metadata call has failed.
     * The user can try to refresh the metadata.
     *
     * @param {string} sDetails a technical error to be displayed on request
     * @private
     */
    _showMetadataError(sDetails) {
        MessageBox.show(
            this._oResourceBundle.getText("errorMetadataText"),
            {
                icon: sap.m.MessageBox.Icon.ERROR,
                title: this._oResourceBundle.getText("errorMetadataTitle"),
                details: sDetails,
                styleClass: this._sCompactModeClass,
                actions: [sap.m.MessageBox.Action.RETRY, sap.m.MessageBox.Action.CLOSE],
                onClose: function (sAction) {
                    if (sAction === sap.m.MessageBox.Action.RETRY) {
                        this.bMessageOpen = false;
                        this._oModel.refreshMetadata();
                    }
                }.bind(this)
            }
        )
        ;
    }

    /**
     * Shows a {@link sap.m.MessageBox} when a service call has failed.
     * Only the first error message will be display.
     *
     * @param {string} sDetails a technical error to be displayed on request
     * @private
     */
    _showServiceError(sDetails) {
        if (!this._bMessageOpen) {
            this._bMessageOpen = true;
            MessageBox.show(
                this._oResourceBundle.getText("errorServiceText"),
                {
                    icon: sap.m.MessageBox.Icon.ERROR,
                    title: this._oResourceBundle.getText("errorServiceTitle"),
                    details: sDetails,
                    styleClass: this._sCompactModeClass,
                    actions: [sap.m.MessageBox.Action.CLOSE],
                    onClose: function (sAction) {
                        this._bMessageOpen = false;
                    }.bind(this)
                });
        }
    }
}