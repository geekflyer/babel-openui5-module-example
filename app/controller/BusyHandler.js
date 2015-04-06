export default class BusyHandler {

    /**
     * Provides a convenience API for managing the busy indications.
     *
     * @class
     * @public
     * @alias sap.ui.demo.mdtemplate.controller.BusyHandler
     */
    constructor(oComponent) {
        this._oComponent = oComponent;
        // set the busy indication on application level, because unless the metadata is loaded
        // the user cannot interact with the application
        this._oComponent.oWhenMetadataIsLoaded.then(
            this._setRootViewInitiallyBusy.bind(this,false),
            this._setRootViewInitiallyBusy.bind(this,false)
        );
        this._setRootViewInitiallyBusy(true);
    }

    /**
     * This method removes or sets the busy indicator delay and sets or removes the root view busy.
     * The busy indicator delay is reset to the UI5 default after the initial busy state of the application.
     *
     * @param {boolean} bBusy indicates if busy indication should be shown (true) or removed (false)
     * @private
     */
    _setRootViewInitiallyBusy(bBusy) {
        this._oComponent._oRootView.setBusyIndicatorDelay(bBusy ? 0 : null);
        this._oComponent._oRootView.setBusy(bBusy);
    }

}