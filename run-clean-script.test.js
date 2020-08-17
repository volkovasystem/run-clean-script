"use strict";

const assert = require( "assert" );
const util = require( "util" );

const strictAssert = (
	assert
	.strict
);

const executeShellCommand = (
	async	function executeShellCommand( shellCommand, moduleDirectoryPath ){
				const childProcess = require( "child_process" );
				const path = require( "path" );

				const execAsync = (
					util
					.promisify(
						(
							childProcess
							.exec
						)
					)
				);

				if(
						(
								typeof
								moduleDirectoryPath
							==	"string"
						)

					&&	(
								moduleDirectoryPath
								.length
							>	0
						)
				){
					moduleDirectoryPath = (
						path
						.resolve(
							(
								moduleDirectoryPath
							)
						)
					);
				}
				else{
					moduleDirectoryPath = (
						process
						.cwd( )
					);
				}

				try{
					const	{
								stdout,
								stderr
							}
						=	(
								await	execAsync(
											(
												shellCommand
											),

											(
												{
													"cwd": (
														moduleDirectoryPath
													)
												}
											)
										)
							);

					return	(
								{
									"outputLog": (
										stdout
										.trim( )
									),

									"errorLog": (
										stderr
										.trim( )
									)
								}
							);
				}
				catch( error ){
					return	(
								{
									"error": (
										util
										.inspect(
											(
												error
											)
										)
									)
								}
							);
				}
			}
);

const SETUP_TEST_DIRECTORY = (
	async	function SETUP_TEST_DIRECTORY( ){
				const shellParameterList = (
					process
					.argv
				);

				const DISABLE_SETUP_TEST_DIRECTORY_SHELL_PARAMETER = (
					"--disableSetupTestDirectory"
				);

				const DISABLE_SETUP_TEST_DIRECTORY_SHORT_SHELL_PARAMETER = (
					"--xstd"
				);

				const disableSetupTestDirectory = (
						(
								shellParameterList
								.includes(
									(
										DISABLE_SETUP_TEST_DIRECTORY_SHELL_PARAMETER
									)
								)
							===	true
						)

					||	(
								shellParameterList
								.includes(
									(
										DISABLE_SETUP_TEST_DIRECTORY_SHORT_SHELL_PARAMETER
									)
								)
							===	true
						)
				);

				if(
						(
								disableSetupTestDirectory
							===	true
						)
				){
					return	(
								true
							);
				}

				return	(
							await	executeShellCommand(
										(
											"mkdir .test || true"
										)
									)
						);
			}
);

const CLEAN_TEST_DIRECTORY = (
	async	function CLEAN_TEST_DIRECTORY( ){
				const shellParameterList = (
					process
					.argv
				);

				const DISABLE_CLEAN_TEST_DIRECTORY_SHELL_PARAMETER = (
					"--disableCleanTestDirectory"
				);

				const DISABLE_CLEAN_TEST_DIRECTORY_SHORT_SHELL_PARAMETER = (
					"--xctd"
				);

				const disableCleanTestDirectory = (
						(
								shellParameterList
								.includes(
									(
										DISABLE_CLEAN_TEST_DIRECTORY_SHELL_PARAMETER
									)
								)
							===	true
						)

					||	(
								shellParameterList
								.includes(
									(
										DISABLE_CLEAN_TEST_DIRECTORY_SHORT_SHELL_PARAMETER
									)
								)
							===	true
						)
				);

				if(
						(
								disableCleanTestDirectory
							===	true
						)
				){
					return	(
								true
							);
				}

				return	(
							await	executeShellCommand(
										(
											"rm -rfv .test || true"
										)
									)
						);
			}
);

const runCleanScript = (
	require( "./run-clean-script.js" )
);

const TEST_RUN_CLEAN_SCRIPT = (
	async	function TEST_RUN_CLEAN_SCRIPT( ){
				(
					await	CLEAN_TEST_DIRECTORY( )
				);

				(
					await	SETUP_TEST_DIRECTORY( )
				);

				const fs = require( "fs" );

				const fsAsync = (
					fs
					.promises
				);

				const moduleDirectoryPath = (
					".test/test-run-clean-script"
				);

				(
					await	executeShellCommand(
								(
									[
										"git clone",
										"https://github.com/volkovasystem/test-run-clean-script.git",
										moduleDirectoryPath
									]
									.join(
										(
											" "
										)
									)
								)
							)
				);

				(
					await	executeShellCommand(
								(
									[
										"npm install"
									]
									.join(
										(
											" "
										)
									)
								),

								(
									moduleDirectoryPath
								)
							)
				);

				try{
					const actualValue = (
							(
									(
										await	runCleanScript(
													(
														moduleDirectoryPath
													)
												)
									)
								===	true
							)

						&&	(
									(
										await	(
													async	function( ){
																	try{
																		return	(
																					(
																						await	fsAsync
																								.stat(
																									(
																										path
																										.resolve(
																											(
																												moduleDirectoryPath
																											),

																											(
																												"node_modules"
																											)
																										)
																									)
																								)
																					)
																					.isDirectory( )
																				);
																	}
																	catch( error ){
																		return	(
																					false
																				);
																	}
															}
												)( )
									)
								===	false
							)

						&&	(
									(
										await	(
													async	function( ){
																	try{
																		return	(
																					(
																						await	fsAsync
																								.stat(
																									(
																										path
																										.resolve(
																											(
																												moduleDirectoryPath
																											),

																											(
																												"package-lock.json"
																											)
																										)
																									)
																								)
																					)
																					.isFile( )
																				);
																	}
																	catch( error ){
																		return	(
																					false
																				);
																	}
															}
												)( )
									)
								===	false
							)
					);

					const testValue = (
						true
					);

					strictAssert
					.equal(
						(
							actualValue
						),

						(
							testValue
						),

						(
							[
								"#test-run-clean-script;",

								"test run clean script;",
								"must remove node module directory;",
								"must remove package lock json file;",

								`must assert to, ${ testValue };`
							]
						)
					);

					return	(
								true
							);
				}
				catch( error ){
					console
					.error(
						(
							error
						)
					);

					return	(
								false
							);
				}
				finally{
					(
						await	CLEAN_TEST_DIRECTORY( )
					);
				}
			}
);

(
	async	function TEST_SCENE_BASIC( ){
				(
					await	CLEAN_TEST_DIRECTORY( )
				);

				console
				.table(
					(
						[
							{
								"test": (
									"test run clean script"
								),

								"result": (
									await	TEST_RUN_CLEAN_SCRIPT( )
								)
							}
						]
					)
				);

				(
					await	CLEAN_TEST_DIRECTORY( )
				);
			}
)( );
