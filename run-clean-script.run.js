#! /usr/bin/env node

(
	async	function runRunCleanScript( shellParameterList ){
				"use strict";

				const MODULE_DIRECTORY_PATH_SHELL_PARAMETER = (
					"--moduleDirectoryPath"
				);

				const MODULE_DIRECTORY_PATH_SHORT_SHELL_PARAMETER = (
					"--mdp"
				);

				const runCleanScript = (
					require( "./run-clean-script.js" )
				);

				const moduleDirectoryPath = (
						(
								(
										shellParameterList
										.includes(
											(
												MODULE_DIRECTORY_PATH_SHELL_PARAMETER
											)
										)
									===	true
								)
						)
					?	(
							shellParameterList[
								(
									(
										shellParameterList
										.indexOf(
											(
												MODULE_DIRECTORY_PATH_SHELL_PARAMETER
											)
										)
									)+1
								)
							]
						)
					:	(
								(
										(
												shellParameterList
												.includes(
													(
														MODULE_DIRECTORY_PATH_SHORT_SHELL_PARAMETER
													)
												)
											===	true
										)
								)
							?	(
									shellParameterList[
										(
											(
												shellParameterList
												.indexOf(
													(
														MODULE_DIRECTORY_PATH_SHORT_SHELL_PARAMETER
													)
												)
											)+1
										)
									]
								)
							:	(
									process
									.cwd( )
								)
						)
				);

				try{
					return	(
								await	runCleanScript(
											(
												moduleDirectoryPath
											)
										)
							);
				}
				catch( error ){
					return	(
								false
							);
				}
			}
)(
	(
		process
		.argv
	)
);
