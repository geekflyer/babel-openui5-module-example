import UIComponent from "sap/ui/core/UIComponent";
import ResourceModel from "sap/ui/model/resource/ResourceModel";
import DeviceModel from "./model/Device";
import AppModel from "./model/AppModel";
import ListSelector from "./controller/ListSelector";
import BusyHandler from "./controller/BusyHandler";
import ErrorHandler from "./controller/ErrorHandler";
import formatter from "./model/formatter";
import grouper from "./model/grouper";

export default UIComponent.extend("sap.ui.demo.mdtemplate.Component", {

    metadata: {
        name: "MD Template",
        manifest: "json",

        config: {
            // always use absolute paths relative to our own component
            // (relative paths will fail if running in the Fiori Launchpad)
            rootPath: jQuery.sap.getModulePath("sap.ui.demo.mdtemplate")
        }
    },

    /**
     * The component is initialized by UI5 automatically during the startup of the app and calls the init method once.
     * In this method, the resource and application models are set and the router is initialized.
     * @public
     * @override
     */
    init: function () {
        var mConfig = this.getMetadata().getConfig();

        // call the base component's init function
        sap.ui.core.UIComponent.prototype.init.apply(this, arguments);

        // set the internationalization model
        this.setModel(new ResourceModel({
            bundleName: mConfig.messageBundle
        }), "i18n");

        this.oListSelector = new ListSelector();

        // set the app data model
        this.setModel(new AppModel(mConfig.serviceUrl));
        this._createMetadataPromise(this.getModel());

        this._oErrorHandler = new ErrorHandler(this);
        // initialize the busy handler with the component
        this._oBusyHandler = new BusyHandler(this);

        // set the device model
        this.setModel(new DeviceModel(), "device");

        // create the views based on the url/hash
        this.getRouter().initialize();
    },

    /**
     * The component is destroyed by UI5 automatically.
     * In this method, the ListSelector and BusyHandler are destroyed.
     * @public
     * @override
     */
    destroy: function () {
        this.oListSelector.destroy();
        this._oBusyHandler.destroy();
        this._oErrorHandler.destroy();
        // call the base component's destroy function
        sap.ui.core.UIComponent.prototype.destroy.apply(this, arguments);
    },

    /**
     * In this method, the rootView is initialized and stored.
     * @public
     * @override
     */
    createContent: function () {
        // call the base component's createContent function
        this._oRootView = sap.ui.core.UIComponent.prototype.createContent.apply(this, arguments);

        if (!sap.ui.Device.support.touch) { // apply compact mode if touch is not supported; this could me made configurable on "combi" devices with touch AND mouse
            this._oRootView.addStyleClass("sapUiSizeCompact");
        }

        return this._oRootView;
    },

    /**
     * Creates a promise which is resolved when the metadata is loaded.
     * @param {sap.ui.core.Model} oModel the app model
     * @private
     */
    _createMetadataPromise: function (oModel) {
        this.oWhenMetadataIsLoaded = new Promise(function (fnResolve, fnReject) {
            oModel.attachEventOnce("metadataLoaded", function () {
                fnResolve();
            });
            oModel.attachEventOnce("metadataFailed", function () {
                fnReject();
            });
        });
    }
});
