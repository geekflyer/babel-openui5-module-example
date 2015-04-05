import Controller from "sap/ui/core/mvc/Controller";

export default class BaseController extends Controller {

    /**
     * Convenience method for accessing the event bus in every controller of the application.
     * @public
     * @returns {sap.ui.core.EventBus} the event bus for this component
     */
    getEventBus() {
        return this.getOwnerComponent().getEventBus();
    }

    /**
     * Convenience method for accessing the router in every controller of the application.
     * @public
     * @returns {sap.ui.core.routing.Router} the router for this component
     */
    getRouter() {
        return sap.ui.core.UIComponent.getRouterFor(this);
    }

    /**
     * Convenience method for getting the view model by name in every controller of the application.
     * @public
     * @param {string} sName the model name
     * @returns {sap.ui.model.Model} the model instance
     */
    getModel(sName) {
        return this.getView().getModel(sName);
    }

    /**
     * Convenience method for setting the view model in every controller of the application.
     * @public
     * @param {sap.ui.model.Model} oModel the model instance
     * @param {string} sName the model name
     * @returns {sap.ui.mvc.View} the view instance
     */
    setModel(oModel, sName) {
        return this.getView().setModel(oModel, sName);
    }

    /**
     * Convenience method for getting the resource bundle.
     * @public
     * @returns {sap.ui.model.resource.ResourceModel} the resourceModel of the component
     */
    getResourceBundle() {
        return this.getOwnerComponent().getModel("i18n").getResourceBundle();
    }

    /**
     * Event handler  for navigating back.
     * It checks if there is a history entry. If yes, history.go(-1) will happen.
     * If not, a backward navigation with forward history will take place.
     * @param sRoute the route name where you would like to navigate to
     * @param mData optional data for the route
     * @public
     */
    onNavBack(sRoute, mData) {
        var oHistory = sap.ui.core.routing.History.getInstance();
        var sPreviousHash = oHistory.getPreviousHash();

        //The history contains a previous entry
        if (sPreviousHash !== undefined) {
            window.history.go(-1);
        } else {
            var bReplace = true; // otherwise we go backwards with a forward history
            this.getRouter().navTo(sRoute, mData, bReplace);
        }
    }
}

jQuery.sap.setObject('sap.ui.demo.mdtemplate.controller.BaseController', BaseController);
