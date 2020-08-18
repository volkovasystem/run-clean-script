"use strict";

/*;
	@license;
	@module-license:
		MIT License

		Copyright (c) 2020-present Richeve S. Bebedor <richeve.bebedor@gmail.com>

		@copyright:
			Richeve S. Bebedor

			<
				@license-year-range:
					2020-present
				@end-license-year-range
			>

			<
				@contact-detail:
					richeve.bebedor@gmail.com
				@end-contact-detail
			>
		@end-copyright

		Permission is hereby granted, free of charge, to any person obtaining a copy
		of this software and associated documentation files (the "Software"), to deal
		in the Software without restriction, including without limitation the rights
		to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
		copies of the Software, and to permit persons to whom the Software is
		furnished to do so, subject to the following conditions:

		The above copyright notice and this permission notice shall be included in all
		copies or substantial portions of the Software.

		THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
		IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
		FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
		AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
		LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
		OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
		SOFTWARE.
	@end-module-license
*/

const childProcess = require( "child_process" );
const fs = require( "fs" );
const path = require( "path" );
const util = require( "util" );

const fsAsync = (
	fs
	.promises
);

const MODULE_DIRECTORY_PATH_REPLACER_PATTERN = (
	new	RegExp(
			(
				"{{ @module-directory-path }}"
			),

			(
				"gm"
			)
		)
);

const BASIC_CLEAN_SCRIPT = (
	[
		"(rm -rfv {{ @module-directory-path }}/node_modules || true)",
		"(rm -fv {{ @module-directory-path }}/package-lock.json || true)",
		"npm cache clean --force"
	]
	.join(
		(
			"&&"
		)
	)
);

const executeScript = (
	async	function executeScript( moduleDirectoryPath, script ){
				try{
					(
						await	(
									function( ){
										return	(
													new	Promise(
															function( resolve, reject ){
																childProcess
																.spawn(
																	(
																		script
																	),

																	(
																		{
																			"cwd": (
																				moduleDirectoryPath
																			),

																			"stdio": (
																				[
																					(
																						"ignore"
																					),

																					(
																						process
																						.stdout
																					),

																					(
																						process
																						.stdout
																					)
																				]
																			),

																			"shell": (
																				true
																			)
																		}
																	)
																)
																.on(
																	(
																		"close"
																	),

																	function( code ){
																		if(
																				(
																						code
																					===	0
																				)
																		){
																			resolve( );
																		}
																		else{
																			reject( );
																		}
																	}
																);
															}
														)
												);
									}
								)( )
					);

					return	(
								true
							);
				}
				catch( error ){
					return	(
								false
							);
				}
			}
);

const runCleanScript = (
	async	function runCleanScript( moduleDirectoryPath, option ){
				/*;
					@procedure-definition:
						Run NPM based clean script.
					@end-procedure-definition

					@parameter-definition:
						{
							"moduleDirectoryPath": "
								[
									@type:
											string
									@end-type

									<@required;>
								]
							",

							"option": "
								[
									@type:
											object with {

											}
									@end-type

									<@optional;>
								]
							"
						}
					@end-parameter-definition

					@result-definition:
						{
							"result": "
								[
									@type:
											boolean
									@end-type
								]
							"
						}
					@end-result-definition

					@trigger-definition:
						{
							"trigger": "
								[
									@type:
											object as Error
									@end-type

									<@tag:invalid-module-directory-path;>
									<@tag:undefined-module-directory;>
									<@tag:cannot-run-clean-script;>
								]
							"
						}
					@end-trigger-definition
				*/

				try{
					if(
							(
									typeof
									moduleDirectoryPath
								==	"string"
							)

						&&	(
									moduleDirectoryPath
									.length
								>	1
							)
					){
							moduleDirectoryPath
						=	(
								path
								.resolve(
									(
										moduleDirectoryPath
									)
								)
							);

						if(
								(
										(
											await	fsAsync
													.stat(
														(
															moduleDirectoryPath
														)
													)
										)
										.isDirectory( )
									===	true
								)
						){
							option = (
									(
										option
									)

								||	(
										{ }
									)
							);

							const cleanScript = (
								BASIC_CLEAN_SCRIPT
								.replace(
									(
										MODULE_DIRECTORY_PATH_REPLACER_PATTERN
									),

									(
										moduleDirectoryPath
									)
								)
							);

							return	(
										await	executeScript(
													(
														moduleDirectoryPath
													),

													(
														cleanScript
													)
												)
									);
						}
						else{
							throw	(
										new	Error(
												(
													[
														"#undefined-module-directory;",

														"cannot run clean script;",
														"undefined module directory;",

														"@module-directory-path:",
														`${ moduleDirectoryPath };`
													]
												)
											)
									);
						}
					}
					else{
						throw	(
									new	Error(
											(
												[
													"#invalid-module-directory-path;",

													"cannot run clean script;",
													"invalid module directory path;",

													"@module-directory-path:",
													`${ moduleDirectoryPath };`
												]
											)
										)
								);
					}
				}
				catch( error ){
					throw	(
								new	Error(
										(
											[
												"#cannot-run-clean-script;",

												"cannot run clean script;",
												"cannot execute run clean script;",

												"@error-data:",
												`${ util.inspect( error ) };`
											]
										)
									)
							);
				}
			}
);

module.exports = runCleanScript;
