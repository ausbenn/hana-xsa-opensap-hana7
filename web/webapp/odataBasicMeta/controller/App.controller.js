/*eslint no-console: 0, no-unused-vars: 0, no-use-before-define: 0, no-redeclare: 0, no-undef: 0*/
/*eslint-env es6 */
//To use a javascript controller its name must end with .controller.js
sap.ui.define([
	"opensap/odataBasic/controller/BaseController",
	"sap/ui/model/json/JSONModel"
], function (BaseController, JSONModel) {
	"use strict";

	return BaseController.extend("opensap.odataBasic.controller.App", {

		onInit: function () {
			this.getView().addStyleClass("sapUiSizeCompact"); // make everything inside this View appear in Compact mode
			var oConfig = this.getOwnerComponent().getModel("config");
			var userName = oConfig.getProperty("/UserName");
			var bpModel = this.getOwnerComponent().getModel("bpModel");
			var oTable = this.getView().byId("bpTable");

			function fnLoadMetadata() {
				try {
					oTable.setModel(bpModel);
					oTable.setEntitySet("BusinessPartners");
					var oMeta = bpModel.getServiceMetadata();
					var headerFields = "";
					for (var i = 0; i < oMeta.dataServices.schema[0].entityType[0].property.length; i++) {
						var property = oMeta.dataServices.schema[0].entityType[0].property[i];
						headerFields += property.name + ",";
					}
					oTable.setInitiallyVisibleFields(headerFields);
				} catch (e) {
					console.log(e.toString());
					oDataFailed();
				}
			}
			bpModel.attachMetadataLoaded(bpModel, function () {
				fnLoadMetadata();
			});
			fnLoadMetadata();

		}
	});
});