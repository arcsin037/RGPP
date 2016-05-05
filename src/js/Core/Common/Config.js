/**
 * Global Object of RGPP
 * 
 * @module RGPP
 * @namespace RGPP
 */
(function(global) {
	/* global RGPP */
	"use strict";

	/**
	 * Configuration Properties
	 * 
	 * @class Config
	 * @author arcsin
	 */
	var Config = Config || {
		/**
		 * Game name
		 * 
		 * @property GAME_NAME
		 * @type {String}
		 */
		GAME_NAME: "My Game",

		/**
		 * Resolution X
		 * 
		 * @property RESOLUTION_X
		 * @default 480
		 * @type Number
		 */
		RESOLUTION_X: 640,
		/**
		 * Resolution Y
		 * 
		 * @property RESOLUTION_Y
		 * @default 480
		 * @type Number
		 */
		RESOLUTION_Y: 480,
		/**
		 * Whether debug boot mode or not.
		 * 
		 * @property DEBUG_BOOT_MODE
		 * @default false
		 * @type Boolean
		 */
		DEBUG_BOOT_MODE: false,
		
		/**
		 * Image directory path for System
		 * 
		 * @property SYSTEM_IMAGE_PATH
		 * @default "resources/Image/System/"
		 * @type String
		 */
		SYSTEM_IMAGE_PATH: "resources/Image/System/",
		/**
		 * Sound directory path for System
		 * 
		 * @property SYSTEM_SOUND_PATH
		 * @default "resources/Sound/System/"
		 * @type String
		 */
		SYSTEM_SOUND_PATH: "resources/Sound/System/",
		/**
		 * Image directory path for User
		 * 
		 * @property USER_IMAGE_DIRECTORY_PATH
		 * @default "System/Sound/"
		 * @type String
		 */
		USER_IMAGE_DIRECTORY_PATH: "User/ImageData/",
		/**
		 * Sound directory path for User
		 * 
		 * @property USER_SOUND_DIRECTORY_PATH
		 * @default "User/Sound/"
		 * @type String
		 */
		USER_SOUND_DIRECTORY_PATH: "User/Sound/",
		/**
		 * Script directory path for User
		 * 
		 * @property USER_SCRIPT_DIRECTORY_PATH
		 * @default "User/Script/"
		 * @type String
		 */
		USER_SCRIPT_DIRECTORY_PATH: "User/Script/",
		LOAD_END_SYSTEM_SCRIPT: false,
		LOAD_END_MW_SCRIPT: false,
		LOAD_END_USER_SCRIPT: false,
		/**
		 * Default font
		 * 
		 * @property DEFAULT_FONT
		 * @default "1.5em serif"
		 * @type {String}
		 */ 
		DEFAULT_FONT: "1.5em serif",
	};

	RGPP.Config = Config;

})((this || 0).self || global);