/**
 * System module
 * @module System
 * @namespace RGPP.System
 */
(function(global) {
	/* global RGPP */
	"use strict";
	var objName = "Modal";

	/**
	 * Button UI
	 * @class Modal UI
	 * @author arcsin
	 * @constructor
	 * @param {object} spec 
	 * @param spec.title
	 * @param spec.bodyElement
	 * @param spec.footerButton
	 * @param spec.approveFunc
	 */
	var constructor = function(spec) {
		var that = {};

		// Get modal division element
		that.modal = modal;

		// Open modal
		that.open = open;

		// Hide modal
		that.hide = hide;

		var mWindow = null;

		/**
		 * Get modal division element
		 * @method modal
		 * @return modal division element
		 */
		function modal() {
			return mWindow;
		}

		/**
		 * Open modal
		 * @method open
		 */
		function open() {
			$(mWindow).modal("show");
		}

		/**
		 * Hide modal
		 * @method hide
		 */
		function hide() {
			$(mWindow).modal("hide");
		}

		var initializeUI_ = function() {

			// Modal header
			var escapeButton = createEscapeButtonElement_();
			var modalHeader = createModalHeader_(spec.title, escapeButton);

			// Modal body
			var modalBody = createModalBody_(spec.bodyElement);

			// Modal footer
			var approveButtonElement = createApproveButtonElement_(spec.footerButton);
			var cancelButtonElement = createCancelButtonElement_();
			var modalFooter = createModalFooter_(approveButtonElement, cancelButtonElement);

			// Modal Content
			var modalContent = createModalContent_(modalHeader, modalBody, modalFooter);

			// Modal Dialog
			var modalDialog = createModalDialog_(modalContent);

			// Modal Window
			mWindow = createModalWindowElement_(modalDialog);

			// Set click function
			var uiOperator = RGPP.System.UIOperator.getInstance();
			uiOperator.registClickFunction(approveButtonElement, spec.approveFunc);
		};

		var createEscapeButtonElement_ = function() {
			var escapeButton = RGPP.System.Button("&times;");
			escapeButton.setAttr("type", "button");
			escapeButton.addClass("close");
			escapeButton.setAttr("data-dismiss", "modal");
			escapeButton.setAttr("aria-hidden", "true");
			return escapeButton.element();
		};

		var createCancelButtonElement_ = function() {
			var cancelButton = RGPP.System.Button("cancel");
			cancelButton.setAttr("type", "button");
			cancelButton.addClass("btn");
			cancelButton.addClass("btn-default");
			cancelButton.setAttr("data-dismiss", "modal");
			return cancelButton.element();
		};

		var createApproveButtonElement_ = function(footerButton) {
			var approveButton = RGPP.System.Button(footerButton);
			approveButton.addClass("btn");
			approveButton.addClass("btn-primary");

			approveButton.setAttr("type", "button");
			return approveButton.element();
		};

		var createModalWindowElement_ = function(modalDialog) {
			var modalWindowElement = $("<div>");
			$(modalWindowElement).addClass("modal fade");
			$(modalWindowElement).attr("tabindex", -1);

			$(modalWindowElement).attr("role", "dialog");
			$(modalWindowElement).attr("aria-labelledby", spec.title);
			$(modalWindowElement).attr("aria-hidden", "true");
			$(modalWindowElement).append(modalDialog);
			return modalWindowElement;
		};

		var createModalHeader_ = function(title, escapeButton) {
			var modalHeader = $("<div>");
			$(modalHeader).addClass("modal-header");

			$(modalHeader).append(escapeButton);
			$(modalHeader).append(title);
			return modalHeader;
		};

		var createModalBody_ = function(bodyElement) {
			var modalBody = $("<div>");
			modalBody.addClass("modal-body");
			RGPP.System.CssStyle.getInstance().setScroll(modalBody);

			$(modalBody).append(bodyElement);
			return modalBody;
		};

		var createModalFooter_ = function(approveButtonElement, cancelButtonElement) {
			var modalFooter = $("<div>");
			modalFooter.addClass("modal-footer");

			$(modalFooter).append(approveButtonElement);
			$(modalFooter).append(cancelButtonElement);

			return modalFooter;
		};

		var createModalDialog_ = function(modalContent) {
			var modalDialog = $("<div>");
			modalDialog.addClass("modal-dialog");
			$(modalDialog).append(modalContent);
			return modalDialog;
		};

		var createModalContent_ = function(modalHeader, modalBody, modalFooter) {
			var modalContent = $("<div>");
			$(modalContent).addClass("modal-content");
			$(modalContent).append(modalHeader);
			$(modalContent).append(modalBody);
			$(modalContent).append(modalFooter);
			return modalContent;
		};


		initializeUI_();

		return that;
	};

	RGPP.System.exports({
		name: objName,
		constructorFunc: constructor,
		module: module
	});

})((this || 0).self || global);