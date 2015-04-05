import JSONModel from "sap/ui/model/json/JSONModel"

export default class DeviceModel extends JSONModel {

    /**
     * Creates a bindable device model with predefined data
     * the data has following properties:
     * <ul>
     *    <li>isTouch - if the device has touch support</li>
     *    <li>isNoTouch - if the device has no touch support</li>
     *    <li>isPhone - if the device is a phone</li>
     *    <li>isNoPhone - if the device is no phone</li>
     * </ul>
     *
     * @class
     * @public
     * @alias sap.ui.demo.mdtemplate.model.Device
     */
    constructor() {
        super({
            isTouch: sap.ui.Device.support.touch,
            isNoTouch: !sap.ui.Device.support.touch,
            isPhone: sap.ui.Device.system.phone,
            isNoPhone: !sap.ui.Device.system.phone
        });
        this.setDefaultBindingMode("OneWay");
    }
};