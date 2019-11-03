/******/ (function(modules) { // webpackBootstrap
/******/ 	// install a JSONP callback for chunk loading
/******/ 	function webpackJsonpCallback(data) {
/******/ 		var chunkIds = data[0];
/******/ 		var moreModules = data[1];
/******/ 		var executeModules = data[2];
/******/
/******/ 		// add "moreModules" to the modules object,
/******/ 		// then flag all "chunkIds" as loaded and fire callback
/******/ 		var moduleId, chunkId, i = 0, resolves = [];
/******/ 		for(;i < chunkIds.length; i++) {
/******/ 			chunkId = chunkIds[i];
/******/ 			if(installedChunks[chunkId]) {
/******/ 				resolves.push(installedChunks[chunkId][0]);
/******/ 			}
/******/ 			installedChunks[chunkId] = 0;
/******/ 		}
/******/ 		for(moduleId in moreModules) {
/******/ 			if(Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				modules[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if(parentJsonpFunction) parentJsonpFunction(data);
/******/
/******/ 		while(resolves.length) {
/******/ 			resolves.shift()();
/******/ 		}
/******/
/******/ 		// add entry modules from loaded chunk to deferred list
/******/ 		deferredModules.push.apply(deferredModules, executeModules || []);
/******/
/******/ 		// run deferred modules when all chunks ready
/******/ 		return checkDeferredModules();
/******/ 	};
/******/ 	function checkDeferredModules() {
/******/ 		var result;
/******/ 		for(var i = 0; i < deferredModules.length; i++) {
/******/ 			var deferredModule = deferredModules[i];
/******/ 			var fulfilled = true;
/******/ 			for(var j = 1; j < deferredModule.length; j++) {
/******/ 				var depId = deferredModule[j];
/******/ 				if(installedChunks[depId] !== 0) fulfilled = false;
/******/ 			}
/******/ 			if(fulfilled) {
/******/ 				deferredModules.splice(i--, 1);
/******/ 				result = __webpack_require__(__webpack_require__.s = deferredModule[0]);
/******/ 			}
/******/ 		}
/******/ 		return result;
/******/ 	}
/******/ 	function hotDisposeChunk(chunkId) {
/******/ 		delete installedChunks[chunkId];
/******/ 	}
/******/ 	var parentHotUpdateCallback = window["webpackHotUpdate"];
/******/ 	window["webpackHotUpdate"] = // eslint-disable-next-line no-unused-vars
/******/ 	function webpackHotUpdateCallback(chunkId, moreModules) {
/******/ 		hotAddUpdateChunk(chunkId, moreModules);
/******/ 		if (parentHotUpdateCallback) parentHotUpdateCallback(chunkId, moreModules);
/******/ 	} ;
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadUpdateChunk(chunkId) {
/******/ 		var script = document.createElement("script");
/******/ 		script.charset = "utf-8";
/******/ 		script.src = __webpack_require__.p + "" + chunkId + "." + hotCurrentHash + ".hot-update.js";
/******/ 		if (null) script.crossOrigin = null;
/******/ 		document.head.appendChild(script);
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotDownloadManifest(requestTimeout) {
/******/ 		requestTimeout = requestTimeout || 10000;
/******/ 		return new Promise(function(resolve, reject) {
/******/ 			if (typeof XMLHttpRequest === "undefined") {
/******/ 				return reject(new Error("No browser support"));
/******/ 			}
/******/ 			try {
/******/ 				var request = new XMLHttpRequest();
/******/ 				var requestPath = __webpack_require__.p + "" + hotCurrentHash + ".hot-update.json";
/******/ 				request.open("GET", requestPath, true);
/******/ 				request.timeout = requestTimeout;
/******/ 				request.send(null);
/******/ 			} catch (err) {
/******/ 				return reject(err);
/******/ 			}
/******/ 			request.onreadystatechange = function() {
/******/ 				if (request.readyState !== 4) return;
/******/ 				if (request.status === 0) {
/******/ 					// timeout
/******/ 					reject(
/******/ 						new Error("Manifest request to " + requestPath + " timed out.")
/******/ 					);
/******/ 				} else if (request.status === 404) {
/******/ 					// no update available
/******/ 					resolve();
/******/ 				} else if (request.status !== 200 && request.status !== 304) {
/******/ 					// other failure
/******/ 					reject(new Error("Manifest request to " + requestPath + " failed."));
/******/ 				} else {
/******/ 					// success
/******/ 					try {
/******/ 						var update = JSON.parse(request.responseText);
/******/ 					} catch (e) {
/******/ 						reject(e);
/******/ 						return;
/******/ 					}
/******/ 					resolve(update);
/******/ 				}
/******/ 			};
/******/ 		});
/******/ 	}
/******/
/******/ 	var hotApplyOnUpdate = true;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentHash = "aef5c567585f767c4787";
/******/ 	var hotRequestTimeout = 10000;
/******/ 	var hotCurrentModuleData = {};
/******/ 	var hotCurrentChildModule;
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParents = [];
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	var hotCurrentParentsTemp = [];
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateRequire(moduleId) {
/******/ 		var me = installedModules[moduleId];
/******/ 		if (!me) return __webpack_require__;
/******/ 		var fn = function(request) {
/******/ 			if (me.hot.active) {
/******/ 				if (installedModules[request]) {
/******/ 					if (installedModules[request].parents.indexOf(moduleId) === -1) {
/******/ 						installedModules[request].parents.push(moduleId);
/******/ 					}
/******/ 				} else {
/******/ 					hotCurrentParents = [moduleId];
/******/ 					hotCurrentChildModule = request;
/******/ 				}
/******/ 				if (me.children.indexOf(request) === -1) {
/******/ 					me.children.push(request);
/******/ 				}
/******/ 			} else {
/******/ 				console.warn(
/******/ 					"[HMR] unexpected require(" +
/******/ 						request +
/******/ 						") from disposed module " +
/******/ 						moduleId
/******/ 				);
/******/ 				hotCurrentParents = [];
/******/ 			}
/******/ 			return __webpack_require__(request);
/******/ 		};
/******/ 		var ObjectFactory = function ObjectFactory(name) {
/******/ 			return {
/******/ 				configurable: true,
/******/ 				enumerable: true,
/******/ 				get: function() {
/******/ 					return __webpack_require__[name];
/******/ 				},
/******/ 				set: function(value) {
/******/ 					__webpack_require__[name] = value;
/******/ 				}
/******/ 			};
/******/ 		};
/******/ 		for (var name in __webpack_require__) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(__webpack_require__, name) &&
/******/ 				name !== "e" &&
/******/ 				name !== "t"
/******/ 			) {
/******/ 				Object.defineProperty(fn, name, ObjectFactory(name));
/******/ 			}
/******/ 		}
/******/ 		fn.e = function(chunkId) {
/******/ 			if (hotStatus === "ready") hotSetStatus("prepare");
/******/ 			hotChunksLoading++;
/******/ 			return __webpack_require__.e(chunkId).then(finishChunkLoading, function(err) {
/******/ 				finishChunkLoading();
/******/ 				throw err;
/******/ 			});
/******/
/******/ 			function finishChunkLoading() {
/******/ 				hotChunksLoading--;
/******/ 				if (hotStatus === "prepare") {
/******/ 					if (!hotWaitingFilesMap[chunkId]) {
/******/ 						hotEnsureUpdateChunk(chunkId);
/******/ 					}
/******/ 					if (hotChunksLoading === 0 && hotWaitingFiles === 0) {
/******/ 						hotUpdateDownloaded();
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 		fn.t = function(value, mode) {
/******/ 			if (mode & 1) value = fn(value);
/******/ 			return __webpack_require__.t(value, mode & ~1);
/******/ 		};
/******/ 		return fn;
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotCreateModule(moduleId) {
/******/ 		var hot = {
/******/ 			// private stuff
/******/ 			_acceptedDependencies: {},
/******/ 			_declinedDependencies: {},
/******/ 			_selfAccepted: false,
/******/ 			_selfDeclined: false,
/******/ 			_disposeHandlers: [],
/******/ 			_main: hotCurrentChildModule !== moduleId,
/******/
/******/ 			// Module API
/******/ 			active: true,
/******/ 			accept: function(dep, callback) {
/******/ 				if (dep === undefined) hot._selfAccepted = true;
/******/ 				else if (typeof dep === "function") hot._selfAccepted = dep;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._acceptedDependencies[dep[i]] = callback || function() {};
/******/ 				else hot._acceptedDependencies[dep] = callback || function() {};
/******/ 			},
/******/ 			decline: function(dep) {
/******/ 				if (dep === undefined) hot._selfDeclined = true;
/******/ 				else if (typeof dep === "object")
/******/ 					for (var i = 0; i < dep.length; i++)
/******/ 						hot._declinedDependencies[dep[i]] = true;
/******/ 				else hot._declinedDependencies[dep] = true;
/******/ 			},
/******/ 			dispose: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			addDisposeHandler: function(callback) {
/******/ 				hot._disposeHandlers.push(callback);
/******/ 			},
/******/ 			removeDisposeHandler: function(callback) {
/******/ 				var idx = hot._disposeHandlers.indexOf(callback);
/******/ 				if (idx >= 0) hot._disposeHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			// Management API
/******/ 			check: hotCheck,
/******/ 			apply: hotApply,
/******/ 			status: function(l) {
/******/ 				if (!l) return hotStatus;
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			addStatusHandler: function(l) {
/******/ 				hotStatusHandlers.push(l);
/******/ 			},
/******/ 			removeStatusHandler: function(l) {
/******/ 				var idx = hotStatusHandlers.indexOf(l);
/******/ 				if (idx >= 0) hotStatusHandlers.splice(idx, 1);
/******/ 			},
/******/
/******/ 			//inherit from previous dispose call
/******/ 			data: hotCurrentModuleData[moduleId]
/******/ 		};
/******/ 		hotCurrentChildModule = undefined;
/******/ 		return hot;
/******/ 	}
/******/
/******/ 	var hotStatusHandlers = [];
/******/ 	var hotStatus = "idle";
/******/
/******/ 	function hotSetStatus(newStatus) {
/******/ 		hotStatus = newStatus;
/******/ 		for (var i = 0; i < hotStatusHandlers.length; i++)
/******/ 			hotStatusHandlers[i].call(null, newStatus);
/******/ 	}
/******/
/******/ 	// while downloading
/******/ 	var hotWaitingFiles = 0;
/******/ 	var hotChunksLoading = 0;
/******/ 	var hotWaitingFilesMap = {};
/******/ 	var hotRequestedFilesMap = {};
/******/ 	var hotAvailableFilesMap = {};
/******/ 	var hotDeferred;
/******/
/******/ 	// The update info
/******/ 	var hotUpdate, hotUpdateNewHash;
/******/
/******/ 	function toModuleId(id) {
/******/ 		var isNumber = +id + "" === id;
/******/ 		return isNumber ? +id : id;
/******/ 	}
/******/
/******/ 	function hotCheck(apply) {
/******/ 		if (hotStatus !== "idle") {
/******/ 			throw new Error("check() is only allowed in idle status");
/******/ 		}
/******/ 		hotApplyOnUpdate = apply;
/******/ 		hotSetStatus("check");
/******/ 		return hotDownloadManifest(hotRequestTimeout).then(function(update) {
/******/ 			if (!update) {
/******/ 				hotSetStatus("idle");
/******/ 				return null;
/******/ 			}
/******/ 			hotRequestedFilesMap = {};
/******/ 			hotWaitingFilesMap = {};
/******/ 			hotAvailableFilesMap = update.c;
/******/ 			hotUpdateNewHash = update.h;
/******/
/******/ 			hotSetStatus("prepare");
/******/ 			var promise = new Promise(function(resolve, reject) {
/******/ 				hotDeferred = {
/******/ 					resolve: resolve,
/******/ 					reject: reject
/******/ 				};
/******/ 			});
/******/ 			hotUpdate = {};
/******/ 			for(var chunkId in installedChunks)
/******/ 			// eslint-disable-next-line no-lone-blocks
/******/ 			{
/******/ 				/*globals chunkId */
/******/ 				hotEnsureUpdateChunk(chunkId);
/******/ 			}
/******/ 			if (
/******/ 				hotStatus === "prepare" &&
/******/ 				hotChunksLoading === 0 &&
/******/ 				hotWaitingFiles === 0
/******/ 			) {
/******/ 				hotUpdateDownloaded();
/******/ 			}
/******/ 			return promise;
/******/ 		});
/******/ 	}
/******/
/******/ 	// eslint-disable-next-line no-unused-vars
/******/ 	function hotAddUpdateChunk(chunkId, moreModules) {
/******/ 		if (!hotAvailableFilesMap[chunkId] || !hotRequestedFilesMap[chunkId])
/******/ 			return;
/******/ 		hotRequestedFilesMap[chunkId] = false;
/******/ 		for (var moduleId in moreModules) {
/******/ 			if (Object.prototype.hasOwnProperty.call(moreModules, moduleId)) {
/******/ 				hotUpdate[moduleId] = moreModules[moduleId];
/******/ 			}
/******/ 		}
/******/ 		if (--hotWaitingFiles === 0 && hotChunksLoading === 0) {
/******/ 			hotUpdateDownloaded();
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotEnsureUpdateChunk(chunkId) {
/******/ 		if (!hotAvailableFilesMap[chunkId]) {
/******/ 			hotWaitingFilesMap[chunkId] = true;
/******/ 		} else {
/******/ 			hotRequestedFilesMap[chunkId] = true;
/******/ 			hotWaitingFiles++;
/******/ 			hotDownloadUpdateChunk(chunkId);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotUpdateDownloaded() {
/******/ 		hotSetStatus("ready");
/******/ 		var deferred = hotDeferred;
/******/ 		hotDeferred = null;
/******/ 		if (!deferred) return;
/******/ 		if (hotApplyOnUpdate) {
/******/ 			// Wrap deferred object in Promise to mark it as a well-handled Promise to
/******/ 			// avoid triggering uncaught exception warning in Chrome.
/******/ 			// See https://bugs.chromium.org/p/chromium/issues/detail?id=465666
/******/ 			Promise.resolve()
/******/ 				.then(function() {
/******/ 					return hotApply(hotApplyOnUpdate);
/******/ 				})
/******/ 				.then(
/******/ 					function(result) {
/******/ 						deferred.resolve(result);
/******/ 					},
/******/ 					function(err) {
/******/ 						deferred.reject(err);
/******/ 					}
/******/ 				);
/******/ 		} else {
/******/ 			var outdatedModules = [];
/******/ 			for (var id in hotUpdate) {
/******/ 				if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 					outdatedModules.push(toModuleId(id));
/******/ 				}
/******/ 			}
/******/ 			deferred.resolve(outdatedModules);
/******/ 		}
/******/ 	}
/******/
/******/ 	function hotApply(options) {
/******/ 		if (hotStatus !== "ready")
/******/ 			throw new Error("apply() is only allowed in ready status");
/******/ 		options = options || {};
/******/
/******/ 		var cb;
/******/ 		var i;
/******/ 		var j;
/******/ 		var module;
/******/ 		var moduleId;
/******/
/******/ 		function getAffectedStuff(updateModuleId) {
/******/ 			var outdatedModules = [updateModuleId];
/******/ 			var outdatedDependencies = {};
/******/
/******/ 			var queue = outdatedModules.slice().map(function(id) {
/******/ 				return {
/******/ 					chain: [id],
/******/ 					id: id
/******/ 				};
/******/ 			});
/******/ 			while (queue.length > 0) {
/******/ 				var queueItem = queue.pop();
/******/ 				var moduleId = queueItem.id;
/******/ 				var chain = queueItem.chain;
/******/ 				module = installedModules[moduleId];
/******/ 				if (!module || module.hot._selfAccepted) continue;
/******/ 				if (module.hot._selfDeclined) {
/******/ 					return {
/******/ 						type: "self-declined",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				if (module.hot._main) {
/******/ 					return {
/******/ 						type: "unaccepted",
/******/ 						chain: chain,
/******/ 						moduleId: moduleId
/******/ 					};
/******/ 				}
/******/ 				for (var i = 0; i < module.parents.length; i++) {
/******/ 					var parentId = module.parents[i];
/******/ 					var parent = installedModules[parentId];
/******/ 					if (!parent) continue;
/******/ 					if (parent.hot._declinedDependencies[moduleId]) {
/******/ 						return {
/******/ 							type: "declined",
/******/ 							chain: chain.concat([parentId]),
/******/ 							moduleId: moduleId,
/******/ 							parentId: parentId
/******/ 						};
/******/ 					}
/******/ 					if (outdatedModules.indexOf(parentId) !== -1) continue;
/******/ 					if (parent.hot._acceptedDependencies[moduleId]) {
/******/ 						if (!outdatedDependencies[parentId])
/******/ 							outdatedDependencies[parentId] = [];
/******/ 						addAllToSet(outdatedDependencies[parentId], [moduleId]);
/******/ 						continue;
/******/ 					}
/******/ 					delete outdatedDependencies[parentId];
/******/ 					outdatedModules.push(parentId);
/******/ 					queue.push({
/******/ 						chain: chain.concat([parentId]),
/******/ 						id: parentId
/******/ 					});
/******/ 				}
/******/ 			}
/******/
/******/ 			return {
/******/ 				type: "accepted",
/******/ 				moduleId: updateModuleId,
/******/ 				outdatedModules: outdatedModules,
/******/ 				outdatedDependencies: outdatedDependencies
/******/ 			};
/******/ 		}
/******/
/******/ 		function addAllToSet(a, b) {
/******/ 			for (var i = 0; i < b.length; i++) {
/******/ 				var item = b[i];
/******/ 				if (a.indexOf(item) === -1) a.push(item);
/******/ 			}
/******/ 		}
/******/
/******/ 		// at begin all updates modules are outdated
/******/ 		// the "outdated" status can propagate to parents if they don't accept the children
/******/ 		var outdatedDependencies = {};
/******/ 		var outdatedModules = [];
/******/ 		var appliedUpdate = {};
/******/
/******/ 		var warnUnexpectedRequire = function warnUnexpectedRequire() {
/******/ 			console.warn(
/******/ 				"[HMR] unexpected require(" + result.moduleId + ") to disposed module"
/******/ 			);
/******/ 		};
/******/
/******/ 		for (var id in hotUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(hotUpdate, id)) {
/******/ 				moduleId = toModuleId(id);
/******/ 				/** @type {TODO} */
/******/ 				var result;
/******/ 				if (hotUpdate[id]) {
/******/ 					result = getAffectedStuff(moduleId);
/******/ 				} else {
/******/ 					result = {
/******/ 						type: "disposed",
/******/ 						moduleId: id
/******/ 					};
/******/ 				}
/******/ 				/** @type {Error|false} */
/******/ 				var abortError = false;
/******/ 				var doApply = false;
/******/ 				var doDispose = false;
/******/ 				var chainInfo = "";
/******/ 				if (result.chain) {
/******/ 					chainInfo = "\nUpdate propagation: " + result.chain.join(" -> ");
/******/ 				}
/******/ 				switch (result.type) {
/******/ 					case "self-declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of self decline: " +
/******/ 									result.moduleId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "declined":
/******/ 						if (options.onDeclined) options.onDeclined(result);
/******/ 						if (!options.ignoreDeclined)
/******/ 							abortError = new Error(
/******/ 								"Aborted because of declined dependency: " +
/******/ 									result.moduleId +
/******/ 									" in " +
/******/ 									result.parentId +
/******/ 									chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "unaccepted":
/******/ 						if (options.onUnaccepted) options.onUnaccepted(result);
/******/ 						if (!options.ignoreUnaccepted)
/******/ 							abortError = new Error(
/******/ 								"Aborted because " + moduleId + " is not accepted" + chainInfo
/******/ 							);
/******/ 						break;
/******/ 					case "accepted":
/******/ 						if (options.onAccepted) options.onAccepted(result);
/******/ 						doApply = true;
/******/ 						break;
/******/ 					case "disposed":
/******/ 						if (options.onDisposed) options.onDisposed(result);
/******/ 						doDispose = true;
/******/ 						break;
/******/ 					default:
/******/ 						throw new Error("Unexception type " + result.type);
/******/ 				}
/******/ 				if (abortError) {
/******/ 					hotSetStatus("abort");
/******/ 					return Promise.reject(abortError);
/******/ 				}
/******/ 				if (doApply) {
/******/ 					appliedUpdate[moduleId] = hotUpdate[moduleId];
/******/ 					addAllToSet(outdatedModules, result.outdatedModules);
/******/ 					for (moduleId in result.outdatedDependencies) {
/******/ 						if (
/******/ 							Object.prototype.hasOwnProperty.call(
/******/ 								result.outdatedDependencies,
/******/ 								moduleId
/******/ 							)
/******/ 						) {
/******/ 							if (!outdatedDependencies[moduleId])
/******/ 								outdatedDependencies[moduleId] = [];
/******/ 							addAllToSet(
/******/ 								outdatedDependencies[moduleId],
/******/ 								result.outdatedDependencies[moduleId]
/******/ 							);
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 				if (doDispose) {
/******/ 					addAllToSet(outdatedModules, [result.moduleId]);
/******/ 					appliedUpdate[moduleId] = warnUnexpectedRequire;
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Store self accepted outdated modules to require them later by the module system
/******/ 		var outdatedSelfAcceptedModules = [];
/******/ 		for (i = 0; i < outdatedModules.length; i++) {
/******/ 			moduleId = outdatedModules[i];
/******/ 			if (
/******/ 				installedModules[moduleId] &&
/******/ 				installedModules[moduleId].hot._selfAccepted
/******/ 			)
/******/ 				outdatedSelfAcceptedModules.push({
/******/ 					module: moduleId,
/******/ 					errorHandler: installedModules[moduleId].hot._selfAccepted
/******/ 				});
/******/ 		}
/******/
/******/ 		// Now in "dispose" phase
/******/ 		hotSetStatus("dispose");
/******/ 		Object.keys(hotAvailableFilesMap).forEach(function(chunkId) {
/******/ 			if (hotAvailableFilesMap[chunkId] === false) {
/******/ 				hotDisposeChunk(chunkId);
/******/ 			}
/******/ 		});
/******/
/******/ 		var idx;
/******/ 		var queue = outdatedModules.slice();
/******/ 		while (queue.length > 0) {
/******/ 			moduleId = queue.pop();
/******/ 			module = installedModules[moduleId];
/******/ 			if (!module) continue;
/******/
/******/ 			var data = {};
/******/
/******/ 			// Call dispose handlers
/******/ 			var disposeHandlers = module.hot._disposeHandlers;
/******/ 			for (j = 0; j < disposeHandlers.length; j++) {
/******/ 				cb = disposeHandlers[j];
/******/ 				cb(data);
/******/ 			}
/******/ 			hotCurrentModuleData[moduleId] = data;
/******/
/******/ 			// disable module (this disables requires from this module)
/******/ 			module.hot.active = false;
/******/
/******/ 			// remove module from cache
/******/ 			delete installedModules[moduleId];
/******/
/******/ 			// when disposing there is no need to call dispose handler
/******/ 			delete outdatedDependencies[moduleId];
/******/
/******/ 			// remove "parents" references from all children
/******/ 			for (j = 0; j < module.children.length; j++) {
/******/ 				var child = installedModules[module.children[j]];
/******/ 				if (!child) continue;
/******/ 				idx = child.parents.indexOf(moduleId);
/******/ 				if (idx >= 0) {
/******/ 					child.parents.splice(idx, 1);
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// remove outdated dependency from module children
/******/ 		var dependency;
/******/ 		var moduleOutdatedDependencies;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					for (j = 0; j < moduleOutdatedDependencies.length; j++) {
/******/ 						dependency = moduleOutdatedDependencies[j];
/******/ 						idx = module.children.indexOf(dependency);
/******/ 						if (idx >= 0) module.children.splice(idx, 1);
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Not in "apply" phase
/******/ 		hotSetStatus("apply");
/******/
/******/ 		hotCurrentHash = hotUpdateNewHash;
/******/
/******/ 		// insert new code
/******/ 		for (moduleId in appliedUpdate) {
/******/ 			if (Object.prototype.hasOwnProperty.call(appliedUpdate, moduleId)) {
/******/ 				modules[moduleId] = appliedUpdate[moduleId];
/******/ 			}
/******/ 		}
/******/
/******/ 		// call accept handlers
/******/ 		var error = null;
/******/ 		for (moduleId in outdatedDependencies) {
/******/ 			if (
/******/ 				Object.prototype.hasOwnProperty.call(outdatedDependencies, moduleId)
/******/ 			) {
/******/ 				module = installedModules[moduleId];
/******/ 				if (module) {
/******/ 					moduleOutdatedDependencies = outdatedDependencies[moduleId];
/******/ 					var callbacks = [];
/******/ 					for (i = 0; i < moduleOutdatedDependencies.length; i++) {
/******/ 						dependency = moduleOutdatedDependencies[i];
/******/ 						cb = module.hot._acceptedDependencies[dependency];
/******/ 						if (cb) {
/******/ 							if (callbacks.indexOf(cb) !== -1) continue;
/******/ 							callbacks.push(cb);
/******/ 						}
/******/ 					}
/******/ 					for (i = 0; i < callbacks.length; i++) {
/******/ 						cb = callbacks[i];
/******/ 						try {
/******/ 							cb(moduleOutdatedDependencies);
/******/ 						} catch (err) {
/******/ 							if (options.onErrored) {
/******/ 								options.onErrored({
/******/ 									type: "accept-errored",
/******/ 									moduleId: moduleId,
/******/ 									dependencyId: moduleOutdatedDependencies[i],
/******/ 									error: err
/******/ 								});
/******/ 							}
/******/ 							if (!options.ignoreErrored) {
/******/ 								if (!error) error = err;
/******/ 							}
/******/ 						}
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// Load self accepted modules
/******/ 		for (i = 0; i < outdatedSelfAcceptedModules.length; i++) {
/******/ 			var item = outdatedSelfAcceptedModules[i];
/******/ 			moduleId = item.module;
/******/ 			hotCurrentParents = [moduleId];
/******/ 			try {
/******/ 				__webpack_require__(moduleId);
/******/ 			} catch (err) {
/******/ 				if (typeof item.errorHandler === "function") {
/******/ 					try {
/******/ 						item.errorHandler(err);
/******/ 					} catch (err2) {
/******/ 						if (options.onErrored) {
/******/ 							options.onErrored({
/******/ 								type: "self-accept-error-handler-errored",
/******/ 								moduleId: moduleId,
/******/ 								error: err2,
/******/ 								originalError: err
/******/ 							});
/******/ 						}
/******/ 						if (!options.ignoreErrored) {
/******/ 							if (!error) error = err2;
/******/ 						}
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				} else {
/******/ 					if (options.onErrored) {
/******/ 						options.onErrored({
/******/ 							type: "self-accept-errored",
/******/ 							moduleId: moduleId,
/******/ 							error: err
/******/ 						});
/******/ 					}
/******/ 					if (!options.ignoreErrored) {
/******/ 						if (!error) error = err;
/******/ 					}
/******/ 				}
/******/ 			}
/******/ 		}
/******/
/******/ 		// handle errors in accept handlers and self accepted module load
/******/ 		if (error) {
/******/ 			hotSetStatus("fail");
/******/ 			return Promise.reject(error);
/******/ 		}
/******/
/******/ 		hotSetStatus("idle");
/******/ 		return new Promise(function(resolve) {
/******/ 			resolve(outdatedModules);
/******/ 		});
/******/ 	}
/******/
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// object to store loaded and loading chunks
/******/ 	// undefined = chunk not loaded, null = chunk preloaded/prefetched
/******/ 	// Promise = chunk loading, 0 = chunk loaded
/******/ 	var installedChunks = {
/******/ 		"script": 0
/******/ 	};
/******/
/******/ 	var deferredModules = [];
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {},
/******/ 			hot: hotCreateModule(moduleId),
/******/ 			parents: (hotCurrentParentsTemp = hotCurrentParents, hotCurrentParents = [], hotCurrentParentsTemp),
/******/ 			children: []
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, hotCreateRequire(moduleId));
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "/dist/";
/******/
/******/ 	// __webpack_hash__
/******/ 	__webpack_require__.h = function() { return hotCurrentHash; };
/******/
/******/ 	var jsonpArray = window["webpackJsonp"] = window["webpackJsonp"] || [];
/******/ 	var oldJsonpFunction = jsonpArray.push.bind(jsonpArray);
/******/ 	jsonpArray.push = webpackJsonpCallback;
/******/ 	jsonpArray = jsonpArray.slice();
/******/ 	for(var i = 0; i < jsonpArray.length; i++) webpackJsonpCallback(jsonpArray[i]);
/******/ 	var parentJsonpFunction = oldJsonpFunction;
/******/
/******/
/******/ 	// add entry module to deferred list
/******/ 	deferredModules.push(["./src/js/script.js","vendors~script"]);
/******/ 	// run deferred modules when ready
/******/ 	return checkDeferredModules();
/******/ })
/************************************************************************/
/******/ ({

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/js/app.vue":
/*!**********************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/js/app.vue ***!
  \**********************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _components_main_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./components/main.vue */ "./src/js/components/main.vue");
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    return {};
  },
  computed: {},
  components: {
    Main: _components_main_vue__WEBPACK_IMPORTED_MODULE_0__["default"]
  },
  methods: {},
  name: 'App'
});

/***/ }),

/***/ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/js/components/main.vue":
/*!**********************************************************************************************************************************!*\
  !*** ./node_modules/babel-loader/lib!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/js/components/main.vue ***!
  \**********************************************************************************************************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue_typer__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue-typer */ "./node_modules/vue-typer/dist/vue-typer.min.js");
/* harmony import */ var vue_typer__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue_typer__WEBPACK_IMPORTED_MODULE_0__);
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ __webpack_exports__["default"] = ({
  data: function data() {
    return {
      partially_judge: false,
      show_card: false,
      sentences: ['阿比比我愛你，希望你一直都很開心快樂阿比比我愛你，希望你一直都很開心快樂阿比比我愛你，希望你一直都很開心快樂阿比比我愛你，希望你一直都很開心快樂阿比比我愛你，希望你一直都很開心快樂阿比比我愛你，希望你一直都很開心快樂阿比比我愛你，希望你一直都很開心快樂阿比比我愛你，希望你一直都很開心快樂阿比比我愛你，希望你一直都很開心快樂阿比比我愛你，希望你一直都很開心快樂', ''],
      show_video_dialog: false,
      media_srcs: '',
      media_index: 0,
      items: [{
        timeline_color: 'green darken-2',
        icon: 'mdi-clover',
        title: '奇妙緣份',
        date: '2019-06-30',
        date_color: 'green',
        contents: '今天是很特別的日子，Dcard抽的女生名字居然是英文！阿垣心想那麼有氣質又可愛的女生，會加我好友嗎？🤔\n互加好友後阿垣問說阿比是不是越南人😂一切就從這裡開始～～',
        has_media: true,
        media_srcs: ['/staticimages/0630-first-time.png']
      }, {
        timeline_color: 'cyan darken-2',
        icon: 'mdi-emoticon-sad-outline',
        title: '害怕失去',
        date: '2019-09-01',
        date_color: '#0097a7',
        contents: '這天是個不太快樂的日子，阿垣想要跟阿比在一起，但不確定阿比的心意，得失心很重QQ\n阿垣整個晚上都睡不太好，阿比也說自己一直哭，但醒來之後的阿垣有個新想法，那就是只要阿比在就好了！珍惜現在所擁有的吧～',
        has_media: false
      }, {
        timeline_color: 'pink darken-2',
        icon: 'mdi-bed-empty',
        title: '床鋪事件',
        date: '2019-09-15',
        date_color: '#c2175b',
        contents: '士官長因為阿比晚睡，不買床墊給阿比，阿垣很擔心阿比睡瑜珈墊會不舒服，想要網購瑜珈墊給阿比，阿比感受到阿垣的關心，很感動也很珍惜～',
        has_media: true,
        media_srcs: ['/staticimages/0915-bed.png']
      }, {
        timeline_color: 'orange darken-2',
        icon: 'mdi-balloon',
        title: '告白氣球',
        date: '2019-10-12',
        date_color: '#f57c00',
        contents: '阿比收回了兩句訊息，阿垣只看到其中一句，經過一番死纏爛打的詢問之後，阿比才鬆口說喜歡阿垣，阿垣先是懷疑自己有沒有看錯，確認無誤之後...又感動又開心的一直陷入迷弟模式xD',
        has_media: true,
        media_srcs: ['/staticimages/1012-ask.png', '/staticimages/1012-love-you.png']
      }, {
        timeline_color: 'red darken-2',
        icon: 'mdi-heart',
        title: '愛の話語',
        date: '2019-10-21',
        date_color: 'red',
        contents: '阿垣問阿比喜歡自己的原因，阿比打了好長一串，阿垣也跟阿比說了自己欣賞阿比的原因～很感謝阿比看得到我的好️❤️',
        has_media: true,
        media_srcs: ['/staticimages/1021-love-words-by-wubi.png', '/staticimages/1021-love-words-by-ts.png']
      }]
    };
  },
  created: function created() {
    this.detect_element_in_window();
  },
  components: {
    VueTyper: vue_typer__WEBPACK_IMPORTED_MODULE_0__["VueTyper"]
  },
  computed: {},
  watch: {},
  methods: {
    detect_element_in_window: function detect_element_in_window() {
      var $this = this;
      window.addEventListener('scroll', function () {
        var element = document.querySelector('#target'); // 填入元件css selector

        var position = element.getBoundingClientRect();
        var target_width = element.clientWidth;
        var target_height = element.clientHeight;
        var half_target_height = target_height / 2;
        var partially_judge = position.top < window.innerHeight;
        var fully_judge = position.bottom <= window.innerHeight;
        var custom_judge = partially_judge && window.innerHeight - position.top > half_target_height;

        if (fully_judge) {
          console.log('該元件可以被完整看到！');
        }

        if (custom_judge) {
          console.log('該元件可看到一半');
        }

        if (partially_judge) {
          $this.partially_judge = true;
          console.log('該元件有一部分可以看到');
        }
      });
    },
    show_video: function show_video(media_srcs) {
      this.media_srcs = media_srcs;
      this.show_video_dialog = true;
      this.media_index = 0;
    },
    ctrl_media_index: function ctrl_media_index(op) {
      if (op == 'add') {
        if (this.media_index < this.media_srcs.length - 1) {
          this.media_index += 1;
        } else {
          this.media_index = 0;
        }
      } else if (op == 'minus') {
        if (this.media_index > 0) {
          this.media_index -= 1;
        } else {
          this.media_index = this.media_srcs.length - 1;
        }
      }
    }
  }
});

/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/style-compiler/index.js?{\"optionsId\":\"0\",\"vue\":true,\"scoped\":false,\"sourceMap\":true}!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./src/js/app.vue":
/*!************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/style-compiler?{"optionsId":"0","vue":true,"scoped":false,"sourceMap":true}!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./src/js/app.vue ***!
  \************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(true);
// Module
exports.push([module.i, "\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n\n", "",{"version":3,"sources":[],"names":[],"mappings":"","file":"app.vue"}]);



/***/ }),

/***/ "./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/style-compiler/index.js?{\"optionsId\":\"0\",\"vue\":true,\"scoped\":false,\"sourceMap\":true}!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./src/js/components/main.vue":
/*!************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/style-compiler?{"optionsId":"0","vue":true,"scoped":false,"sourceMap":true}!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./src/js/components/main.vue ***!
  \************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

exports = module.exports = __webpack_require__(/*! ../../../node_modules/css-loader/dist/runtime/api.js */ "./node_modules/css-loader/dist/runtime/api.js")(true);
// Module
exports.push([module.i, "\n.vue-typer {\n  \t\tfont-family: Arial, 'Helvetica Neue', Helvetica, sans-serif;\n}\n.vue-typer .custom.char.typed {\n  \t\tcolor: #f4f8f8;\n}\n.left-icon {\n\t\tposition: absolute;\n\t\tleft: 50px;\n\t\ttop: calc(50% - 20px);\n}\n.right-icon {\n\t\tposition: absolute;\n\t\tright: 50px;\n\t\ttop: calc(50% - 20px);\n}\nhr#myhr {\n\t\tbackground-color: #fff;\n\t\tborder: 2px dashed #f9af64;\n}\n\t\n", "",{"version":3,"sources":["src/js/components/main.vue","main.vue"],"names":[],"mappings":";AAuPA;IACA,2DAAA;ACrPA;ADwPA;IACA,cAAA;ACtPA;ADyPA;EACA,kBAAA;EACA,UAAA;EACA,qBAAA;ACvPA;AD0PA;EACA,kBAAA;EACA,WAAA;EACA,qBAAA;ACxPA;AD2PA;EACA,sBAAA;EACA,0BAAA;ACzPA","file":"main.vue","sourcesContent":["<template>\n\t<div id=\"mainpage\">\n\t\t<v-timeline>\n\t\t\t<v-timeline-item v-for=\"(item, i) in items\" :key=\"i\" \n\t\t\t\t:color=\"item.timeline_color\"\n\t\t\t\t:icon=\"item.icon\"\n\t\t\t\tfill-dot\n\t\t\t>\n\t\t\t\t<template v-slot:opposite>\n\t\t\t\t\t<span \n\t\t\t\t\t:style=\"{'color': item.date_color, 'font-weight': 'bold'}\"\n\t\t\t\t\tv-text=\"item.date\"\n\t\t\t\t\t></span>\n\t\t\t\t</template>\n\n\t\t\t\t<v-card class=\"elevation-2\">\n\t\t\t\t\t<v-card-title class=\"title\" :class=\"item.timeline_color\" style=\"color: white\"> {{ item.title }} </v-card-title>\n\t\t\t\t\t<v-card-text class=\"white text--primary\" style=\"padding-top: 16px;\">\n\t\t\t\t\t\t<font style=\"white-space: pre-line\"> {{ item.contents }} </font>\n\t\t\t\t\t\t<v-spacer></v-spacer>\n\t\t\t\t\t\t<div class=\"text-right\" v-if=\"item.has_media\">\n\t\t\t\t\t\t\t<v-icon @click=\"show_video(item.media_srcs)\"> mdi-folder-multiple-image </v-icon>\n\t\t\t\t\t\t</div>\n\t\t\t\t\t</v-card-text>\n\t\t\t\t</v-card>\n\t\t\t</v-timeline-item>\n\t\t</v-timeline>\n\n\t\t<div style=\"height: 50px\"></div>\n\t\t<hr id=\"myhr\">\n\t\t<div id=\"target\" style=\"height: 20px\"></div>\n\n\t\t<v-card v-if=\"partially_judge\" class=\"mx-auto\" color=\"#26c6da\" dark max-width=\"400\">\n\t\t\t<v-card-title>\n\t\t\t\t<v-icon large left>\n\t\t\t\tmdi-twitter\n\t\t\t\t</v-icon>\n\t\t\t\t<span class=\"title font-weight-light\">Twitter</span>\n\t\t\t</v-card-title>\n\t\n\t\t\t<v-card-text>\n\t\t\t\t<VueTyper\n\t\t\t\t\t:text='sentences'\n\t\t\t\t\t:repeat='0'\n\t\t\t\t\t:shuffle='false'\n\t\t\t\t\tinitial-action='typing'\n\t\t\t\t\t:pre-type-delay='1000'\n\t\t\t\t\t:type-delay='200'\n\t\t\t\t\t:erase-delay='500'\n\t\t\t\t\terase-style='clear'\n\t\t\t\t\t:erase-on-complete='false'\n\t\t\t\t\tcaret-animation='smooth'\n\t\t\t\t></VueTyper>\n\t\t\t</v-card-text>\n\t\n\t\t\t<v-card-actions>\n\t\t\t\t<v-list-item class=\"grow\">\n\t\t\t\t\t<v-list-item-avatar color=\"grey darken-3\">\n\t\t\t\t\t\t<v-img\n\t\t\t\t\t\tclass=\"elevation-6\"\n\t\t\t\t\t\tsrc=\"https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light\"\n\t\t\t\t\t\t></v-img>\n\t\t\t\t\t</v-list-item-avatar>\n\t\t\t\n\t\t\t\t\t<v-list-item-content>\n\t\t\t\t\t\t<v-list-item-title>Evan You</v-list-item-title>\n\t\t\t\t\t</v-list-item-content>\n\t\t\t\n\t\t\t\t\t<v-row align=\"center\" justify=\"end\">\n\t\t\t\t\t\t<v-icon class=\"mr-1\">mdi-heart</v-icon>\n\t\t\t\t\t\t<span class=\"subheading mr-2\">256</span>\n\t\t\t\t\t\t<span class=\"mr-1\">·</span>\n\t\t\t\t\t\t<v-icon class=\"mr-1\">mdi-share-variant</v-icon>\n\t\t\t\t\t\t<span class=\"subheading\">45</span>\n\t\t\t\t\t</v-row>\n\t\t\t\t</v-list-item>\n\t\t\t</v-card-actions>\n\t\t</v-card>\n\n\t\t<v-dialog v-model=\"show_video_dialog\" width=\"80%\"\n\t\t@keydown.enter=\"show_video_dialog = false\" @keydown.esc=\"show_video_dialog = false\">\n\t\t\t<v-card style=\"text-align: center;\">\n\t\t\t\t<v-card-text>\n\t\t\t\t\t<div style=\"height: 20px\"></div>\n\t\t\t\t\t<v-btn v-show=\"this.media_srcs.length > 1\" @click=\"ctrl_media_index('minus')\"\n\t\t\t\t\t\tfab dark small color=\"blue\" class=\"left-icon\">\n\t\t\t\t\t\t<v-icon dark>mdi-chevron-left</v-icon>\n\t\t\t\t\t</v-btn>\n\t\t\t\t\t<img :src=\"media_srcs[media_index]\" style=\"width: 70%;\" :alt=\"src\"/>\n\t\t\t\t\t<v-btn v-show=\"this.media_srcs.length > 1\" @click=\"ctrl_media_index('add')\"\n\t\t\t\t\t\tfab dark small color=\"blue\" class=\"right-icon\">\n\t\t\t\t\t\t<v-icon dark>mdi-chevron-right</v-icon>\n\t\t\t\t\t</v-btn>\n\n\t\t\t\t\t<v-card-actions>\n\t\t\t\t\t\t<v-spacer></v-spacer>\n\t\t\t\t\t\t<v-btn color=\"error\" dark @click=\"show_video_dialog = false\">關閉</v-btn>\n\t\t\t\t\t</v-card-actions>\n\t\t\t\t</v-card-text>\n\t\t\t</v-card>\n\t\t</v-dialog>\n\n\t</div>\n</template>\n\n<script>\n\nimport { VueTyper } from 'vue-typer'\n\nexport default {\n\tdata: function() {\n\t\treturn {\n\t\t\tpartially_judge: false,\n\t\t\tshow_card: false,\n\t\t\tsentences: ['阿比比我愛你，希望你一直都很開心快樂阿比比我愛你，希望你一直都很開心快樂阿比比我愛你，希望你一直都很開心快樂阿比比我愛你，希望你一直都很開心快樂阿比比我愛你，希望你一直都很開心快樂阿比比我愛你，希望你一直都很開心快樂阿比比我愛你，希望你一直都很開心快樂阿比比我愛你，希望你一直都很開心快樂阿比比我愛你，希望你一直都很開心快樂阿比比我愛你，希望你一直都很開心快樂', ''],\n\t\t\tshow_video_dialog: false,\n\t\t\tmedia_srcs: '',\n\t\t\tmedia_index: 0,\n\t\t\titems: [\n\t\t\t\t{\n\t\t\t\t\ttimeline_color: 'green darken-2',\n\t\t\t\t\ticon: 'mdi-clover',\n\t\t\t\t\ttitle: '奇妙緣份',\n\t\t\t\t\tdate: '2019-06-30',\n\t\t\t\t\tdate_color: 'green',\n\t\t\t\t\tcontents: '今天是很特別的日子，Dcard抽的女生名字居然是英文！阿垣心想那麼有氣質又可愛的女生，會加我好友嗎？🤔\\n互加好友後阿垣問說阿比是不是越南人😂一切就從這裡開始～～',\n\t\t\t\t\thas_media: true,\n\t\t\t\t\tmedia_srcs: ['/staticimages/0630-first-time.png']\n\t\t\t\t},\n\t\t\t\t{\n\t\t\t\t\ttimeline_color: 'cyan darken-2',\n\t\t\t\t\ticon: 'mdi-emoticon-sad-outline',\n\t\t\t\t\ttitle: '害怕失去',\n\t\t\t\t\tdate: '2019-09-01',\n\t\t\t\t\tdate_color: '#0097a7',\n\t\t\t\t\tcontents: '這天是個不太快樂的日子，阿垣想要跟阿比在一起，但不確定阿比的心意，得失心很重QQ\\n阿垣整個晚上都睡不太好，阿比也說自己一直哭，但醒來之後的阿垣有個新想法，那就是只要阿比在就好了！珍惜現在所擁有的吧～',\n\t\t\t\t\thas_media: false\n\t\t\t\t},\n\t\t\t\t{\n\t\t\t\t\ttimeline_color: 'pink darken-2',\n\t\t\t\t\ticon: 'mdi-bed-empty',\n\t\t\t\t\ttitle: '床鋪事件',\n\t\t\t\t\tdate: '2019-09-15',\n\t\t\t\t\tdate_color: '#c2175b',\n\t\t\t\t\tcontents: '士官長因為阿比晚睡，不買床墊給阿比，阿垣很擔心阿比睡瑜珈墊會不舒服，想要網購瑜珈墊給阿比，阿比感受到阿垣的關心，很感動也很珍惜～',\n\t\t\t\t\thas_media: true,\n\t\t\t\t\tmedia_srcs: ['/staticimages/0915-bed.png']\n\t\t\t\t},\n\t\t\t\t{\n\t\t\t\t\ttimeline_color: 'orange darken-2',\n\t\t\t\t\ticon: 'mdi-balloon',\n\t\t\t\t\ttitle: '告白氣球',\n\t\t\t\t\tdate: '2019-10-12',\n\t\t\t\t\tdate_color: '#f57c00',\n\t\t\t\t\tcontents: '阿比收回了兩句訊息，阿垣只看到其中一句，經過一番死纏爛打的詢問之後，阿比才鬆口說喜歡阿垣，阿垣先是懷疑自己有沒有看錯，確認無誤之後...又感動又開心的一直陷入迷弟模式xD',\n\t\t\t\t\thas_media: true,\n\t\t\t\t\tmedia_srcs: ['/staticimages/1012-ask.png', '/staticimages/1012-love-you.png']\n\t\t\t\t},\n\t\t\t\t{\n\t\t\t\t\ttimeline_color: 'red darken-2',\n\t\t\t\t\ticon: 'mdi-heart',\n\t\t\t\t\ttitle: '愛の話語',\n\t\t\t\t\tdate: '2019-10-21',\n\t\t\t\t\tdate_color: 'red',\n\t\t\t\t\tcontents: '阿垣問阿比喜歡自己的原因，阿比打了好長一串，阿垣也跟阿比說了自己欣賞阿比的原因～很感謝阿比看得到我的好️❤️',\n\t\t\t\t\thas_media: true,\n\t\t\t\t\tmedia_srcs: ['/staticimages/1021-love-words-by-wubi.png', '/staticimages/1021-love-words-by-ts.png']\n\t\t\t\t},\n\t\t\t],\n\t\t}\n\t},\n\n\tcreated: function() {\n\t\tthis.detect_element_in_window();\n\t},\n\t\n\tcomponents: {\n\t\tVueTyper\n\t},\n\t\n\tcomputed: {\n\t\t\n\t},\n\t\n\twatch: {\n\n\t},\n\n\tmethods: {\n\t\tdetect_element_in_window: function() {\n\t\t\tlet $this = this;\n\t\t\twindow.addEventListener('scroll', function() {\n\t\t\t\tlet element = document.querySelector('#target'); // 填入元件css selector\n\t\t\t\tlet position = element.getBoundingClientRect();\n\t\t\t\tlet target_width = element.clientWidth;\n\t\t\t\tlet target_height = element.clientHeight;\n\t\t\t\tlet half_target_height = target_height / 2;\n\n\t\t\t\tlet partially_judge = position.top < window.innerHeight;\n\t\t\t\tlet fully_judge = position.bottom <= window.innerHeight;\n\t\t\t\tlet custom_judge = partially_judge && (window.innerHeight - position.top > half_target_height);\n\n\t\t\t\tif(fully_judge) {\n\t\t\t\t\tconsole.log('該元件可以被完整看到！');\n\t\t\t\t}\n\n\t\t\t\tif(custom_judge) {\n\t\t\t\t\tconsole.log('該元件可看到一半');\n\t\t\t\t}\n\n\t\t\t\tif(partially_judge) {\n\t\t\t\t\t$this.partially_judge = true;\n\t\t\t\t\tconsole.log('該元件有一部分可以看到');\n\t\t\t\t}\n\t\t\t});\n\t\t},\n\n\t\tshow_video: function(media_srcs) {\n\t\t\tthis.media_srcs = media_srcs;\n\t\t\tthis.show_video_dialog = true;\n\t\t\tthis.media_index = 0;\n\t\t},\n\n\t\tctrl_media_index: function(op) {\n\t\t\tif(op == 'add') {\n\t\t\t\tif(this.media_index < this.media_srcs.length - 1) {\n\t\t\t\t\tthis.media_index += 1;\n\t\t\t\t}\n\t\t\t\telse {\n\t\t\t\t\tthis.media_index = 0;\n\t\t\t\t}\n\t\t\t}\n\t\t\telse if(op == 'minus') {\n\t\t\t\tif(this.media_index > 0) {\n\t\t\t\t\tthis.media_index -= 1;\n\t\t\t\t}\n\t\t\t\telse {\n\t\t\t\t\tthis.media_index = this.media_srcs.length - 1;\n\t\t\t\t}\n\t\t\t}\n\t\t}\n\t}\n  }\n</script>\n\n<style>\n\n\t.vue-typer {\n  \t\tfont-family: Arial, 'Helvetica Neue', Helvetica, sans-serif;\n\t}\n\n\t.vue-typer .custom.char.typed {\n  \t\tcolor: #f4f8f8;\n\t}\n\n\t.left-icon {\n\t\tposition: absolute;\n\t\tleft: 50px;\n\t\ttop: calc(50% - 20px);\n\t}\n\n\t.right-icon {\n\t\tposition: absolute;\n\t\tright: 50px;\n\t\ttop: calc(50% - 20px);\n\t}\n\n\thr#myhr {\n\t\tbackground-color: #fff;\n\t\tborder: 2px dashed #f9af64;\n\t}\n\t\n</style>","\n.vue-typer {\n  \t\tfont-family: Arial, 'Helvetica Neue', Helvetica, sans-serif;\n}\n.vue-typer .custom.char.typed {\n  \t\tcolor: #f4f8f8;\n}\n.left-icon {\n\t\tposition: absolute;\n\t\tleft: 50px;\n\t\ttop: calc(50% - 20px);\n}\n.right-icon {\n\t\tposition: absolute;\n\t\tright: 50px;\n\t\ttop: calc(50% - 20px);\n}\nhr#myhr {\n\t\tbackground-color: #fff;\n\t\tborder: 2px dashed #f9af64;\n}\n\t\n"]}]);



/***/ }),

/***/ "./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-3d25fde5\",\"hasScoped\":false,\"optionsId\":\"0\",\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/js/components/main.vue":
/*!*****************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-3d25fde5","hasScoped":false,"optionsId":"0","buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/js/components/main.vue ***!
  \*****************************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { attrs: { id: "mainpage" } },
    [
      _c(
        "v-timeline",
        _vm._l(_vm.items, function(item, i) {
          return _c(
            "v-timeline-item",
            {
              key: i,
              attrs: {
                color: item.timeline_color,
                icon: item.icon,
                "fill-dot": ""
              },
              scopedSlots: _vm._u(
                [
                  {
                    key: "opposite",
                    fn: function() {
                      return [
                        _c("span", {
                          style: {
                            color: item.date_color,
                            "font-weight": "bold"
                          },
                          domProps: { textContent: _vm._s(item.date) }
                        })
                      ]
                    },
                    proxy: true
                  }
                ],
                null,
                true
              )
            },
            [
              _vm._v(" "),
              _c(
                "v-card",
                { staticClass: "elevation-2" },
                [
                  _c(
                    "v-card-title",
                    {
                      staticClass: "title",
                      class: item.timeline_color,
                      staticStyle: { color: "white" }
                    },
                    [_vm._v(" " + _vm._s(item.title) + " ")]
                  ),
                  _vm._v(" "),
                  _c(
                    "v-card-text",
                    {
                      staticClass: "white text--primary",
                      staticStyle: { "padding-top": "16px" }
                    },
                    [
                      _c(
                        "font",
                        { staticStyle: { "white-space": "pre-line" } },
                        [_vm._v(" " + _vm._s(item.contents) + " ")]
                      ),
                      _vm._v(" "),
                      _c("v-spacer"),
                      _vm._v(" "),
                      item.has_media
                        ? _c(
                            "div",
                            { staticClass: "text-right" },
                            [
                              _c(
                                "v-icon",
                                {
                                  on: {
                                    click: function($event) {
                                      return _vm.show_video(item.media_srcs)
                                    }
                                  }
                                },
                                [_vm._v(" mdi-folder-multiple-image ")]
                              )
                            ],
                            1
                          )
                        : _vm._e()
                    ],
                    1
                  )
                ],
                1
              )
            ],
            1
          )
        }),
        1
      ),
      _vm._v(" "),
      _c("div", { staticStyle: { height: "50px" } }),
      _vm._v(" "),
      _c("hr", { attrs: { id: "myhr" } }),
      _vm._v(" "),
      _c("div", { staticStyle: { height: "20px" }, attrs: { id: "target" } }),
      _vm._v(" "),
      _vm.partially_judge
        ? _c(
            "v-card",
            {
              staticClass: "mx-auto",
              attrs: { color: "#26c6da", dark: "", "max-width": "400" }
            },
            [
              _c(
                "v-card-title",
                [
                  _c("v-icon", { attrs: { large: "", left: "" } }, [
                    _vm._v("\n\t\t\tmdi-twitter\n\t\t\t")
                  ]),
                  _vm._v(" "),
                  _c("span", { staticClass: "title font-weight-light" }, [
                    _vm._v("Twitter")
                  ])
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "v-card-text",
                [
                  _c("VueTyper", {
                    attrs: {
                      text: _vm.sentences,
                      repeat: 0,
                      shuffle: false,
                      "initial-action": "typing",
                      "pre-type-delay": 1000,
                      "type-delay": 200,
                      "erase-delay": 500,
                      "erase-style": "clear",
                      "erase-on-complete": false,
                      "caret-animation": "smooth"
                    }
                  })
                ],
                1
              ),
              _vm._v(" "),
              _c(
                "v-card-actions",
                [
                  _c(
                    "v-list-item",
                    { staticClass: "grow" },
                    [
                      _c(
                        "v-list-item-avatar",
                        { attrs: { color: "grey darken-3" } },
                        [
                          _c("v-img", {
                            staticClass: "elevation-6",
                            attrs: {
                              src:
                                "https://avataaars.io/?avatarStyle=Transparent&topType=ShortHairShortCurly&accessoriesType=Prescription02&hairColor=Black&facialHairType=Blank&clotheType=Hoodie&clotheColor=White&eyeType=Default&eyebrowType=DefaultNatural&mouthType=Default&skinColor=Light"
                            }
                          })
                        ],
                        1
                      ),
                      _vm._v(" "),
                      _c(
                        "v-list-item-content",
                        [_c("v-list-item-title", [_vm._v("Evan You")])],
                        1
                      ),
                      _vm._v(" "),
                      _c(
                        "v-row",
                        { attrs: { align: "center", justify: "end" } },
                        [
                          _c("v-icon", { staticClass: "mr-1" }, [
                            _vm._v("mdi-heart")
                          ]),
                          _vm._v(" "),
                          _c("span", { staticClass: "subheading mr-2" }, [
                            _vm._v("256")
                          ]),
                          _vm._v(" "),
                          _c("span", { staticClass: "mr-1" }, [_vm._v("·")]),
                          _vm._v(" "),
                          _c("v-icon", { staticClass: "mr-1" }, [
                            _vm._v("mdi-share-variant")
                          ]),
                          _vm._v(" "),
                          _c("span", { staticClass: "subheading" }, [
                            _vm._v("45")
                          ])
                        ],
                        1
                      )
                    ],
                    1
                  )
                ],
                1
              )
            ],
            1
          )
        : _vm._e(),
      _vm._v(" "),
      _c(
        "v-dialog",
        {
          attrs: { width: "80%" },
          on: {
            keydown: [
              function($event) {
                if (
                  !$event.type.indexOf("key") &&
                  _vm._k($event.keyCode, "enter", 13, $event.key, "Enter")
                ) {
                  return null
                }
                _vm.show_video_dialog = false
              },
              function($event) {
                if (
                  !$event.type.indexOf("key") &&
                  _vm._k($event.keyCode, "esc", 27, $event.key, [
                    "Esc",
                    "Escape"
                  ])
                ) {
                  return null
                }
                _vm.show_video_dialog = false
              }
            ]
          },
          model: {
            value: _vm.show_video_dialog,
            callback: function($$v) {
              _vm.show_video_dialog = $$v
            },
            expression: "show_video_dialog"
          }
        },
        [
          _c(
            "v-card",
            { staticStyle: { "text-align": "center" } },
            [
              _c(
                "v-card-text",
                [
                  _c("div", { staticStyle: { height: "20px" } }),
                  _vm._v(" "),
                  _c(
                    "v-btn",
                    {
                      directives: [
                        {
                          name: "show",
                          rawName: "v-show",
                          value: this.media_srcs.length > 1,
                          expression: "this.media_srcs.length > 1"
                        }
                      ],
                      staticClass: "left-icon",
                      attrs: { fab: "", dark: "", small: "", color: "blue" },
                      on: {
                        click: function($event) {
                          return _vm.ctrl_media_index("minus")
                        }
                      }
                    },
                    [
                      _c("v-icon", { attrs: { dark: "" } }, [
                        _vm._v("mdi-chevron-left")
                      ])
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c("img", {
                    staticStyle: { width: "70%" },
                    attrs: {
                      src: _vm.media_srcs[_vm.media_index],
                      alt: _vm.src
                    }
                  }),
                  _vm._v(" "),
                  _c(
                    "v-btn",
                    {
                      directives: [
                        {
                          name: "show",
                          rawName: "v-show",
                          value: this.media_srcs.length > 1,
                          expression: "this.media_srcs.length > 1"
                        }
                      ],
                      staticClass: "right-icon",
                      attrs: { fab: "", dark: "", small: "", color: "blue" },
                      on: {
                        click: function($event) {
                          return _vm.ctrl_media_index("add")
                        }
                      }
                    },
                    [
                      _c("v-icon", { attrs: { dark: "" } }, [
                        _vm._v("mdi-chevron-right")
                      ])
                    ],
                    1
                  ),
                  _vm._v(" "),
                  _c(
                    "v-card-actions",
                    [
                      _c("v-spacer"),
                      _vm._v(" "),
                      _c(
                        "v-btn",
                        {
                          attrs: { color: "error", dark: "" },
                          on: {
                            click: function($event) {
                              _vm.show_video_dialog = false
                            }
                          }
                        },
                        [_vm._v("關閉")]
                      )
                    ],
                    1
                  )
                ],
                1
              )
            ],
            1
          )
        ],
        1
      )
    ],
    1
  )
}
var staticRenderFns = []
render._withStripped = true

if (true) {
  module.hot.accept()
  if (module.hot.data) {
    __webpack_require__(/*! vue-hot-reload-api */ "./node_modules/vue-hot-reload-api/dist/index.js")      .rerender("data-v-3d25fde5", { render: render, staticRenderFns: staticRenderFns })
  }
}

/***/ }),

/***/ "./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-7d73c7f4\",\"hasScoped\":false,\"optionsId\":\"0\",\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/js/app.vue":
/*!*****************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-loader/lib/template-compiler?{"id":"data-v-7d73c7f4","hasScoped":false,"optionsId":"0","buble":{"transforms":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/js/app.vue ***!
  \*****************************************************************************************************************************************************************************************************************************/
/*! exports provided: render, staticRenderFns */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "render", function() { return render; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "staticRenderFns", function() { return staticRenderFns; });
var render = function() {
  var _vm = this
  var _h = _vm.$createElement
  var _c = _vm._self._c || _h
  return _c(
    "div",
    { attrs: { id: "app" } },
    [_c("v-app", { attrs: { id: "inspire" } }, [_c("Main")], 1)],
    1
  )
}
var staticRenderFns = []
render._withStripped = true

if (true) {
  module.hot.accept()
  if (module.hot.data) {
    __webpack_require__(/*! vue-hot-reload-api */ "./node_modules/vue-hot-reload-api/dist/index.js")      .rerender("data-v-7d73c7f4", { render: render, staticRenderFns: staticRenderFns })
  }
}

/***/ }),

/***/ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/style-compiler/index.js?{\"optionsId\":\"0\",\"vue\":true,\"scoped\":false,\"sourceMap\":true}!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./src/js/app.vue":
/*!********************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-style-loader!./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/style-compiler?{"optionsId":"0","vue":true,"scoped":false,"sourceMap":true}!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./src/js/app.vue ***!
  \********************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler?{"optionsId":"0","vue":true,"scoped":false,"sourceMap":true}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./app.vue */ "./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/style-compiler/index.js?{\"optionsId\":\"0\",\"vue\":true,\"scoped\":false,\"sourceMap\":true}!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./src/js/app.vue");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(/*! ../../node_modules/vue-style-loader/lib/addStylesClient.js */ "./node_modules/vue-style-loader/lib/addStylesClient.js").default
var update = add("104ee6fc", content, false, {});
// Hot Module Replacement
if(true) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept(/*! !../../node_modules/css-loader/dist/cjs.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler?{"optionsId":"0","vue":true,"scoped":false,"sourceMap":true}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./app.vue */ "./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/style-compiler/index.js?{\"optionsId\":\"0\",\"vue\":true,\"scoped\":false,\"sourceMap\":true}!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./src/js/app.vue", function() {
     var newContent = __webpack_require__(/*! !../../node_modules/css-loader/dist/cjs.js?sourceMap!../../node_modules/vue-loader/lib/style-compiler?{"optionsId":"0","vue":true,"scoped":false,"sourceMap":true}!../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./app.vue */ "./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/style-compiler/index.js?{\"optionsId\":\"0\",\"vue\":true,\"scoped\":false,\"sourceMap\":true}!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./src/js/app.vue");
     if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/style-compiler/index.js?{\"optionsId\":\"0\",\"vue\":true,\"scoped\":false,\"sourceMap\":true}!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./src/js/components/main.vue":
/*!********************************************************************************************************************************************************************************************************************************************************************************************!*\
  !*** ./node_modules/vue-style-loader!./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/style-compiler?{"optionsId":"0","vue":true,"scoped":false,"sourceMap":true}!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./src/js/components/main.vue ***!
  \********************************************************************************************************************************************************************************************************************************************************************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__(/*! !../../../node_modules/css-loader/dist/cjs.js?sourceMap!../../../node_modules/vue-loader/lib/style-compiler?{"optionsId":"0","vue":true,"scoped":false,"sourceMap":true}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./main.vue */ "./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/style-compiler/index.js?{\"optionsId\":\"0\",\"vue\":true,\"scoped\":false,\"sourceMap\":true}!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./src/js/components/main.vue");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__(/*! ../../../node_modules/vue-style-loader/lib/addStylesClient.js */ "./node_modules/vue-style-loader/lib/addStylesClient.js").default
var update = add("50b7cf84", content, false, {});
// Hot Module Replacement
if(true) {
 // When the styles change, update the <style> tags
 if(!content.locals) {
   module.hot.accept(/*! !../../../node_modules/css-loader/dist/cjs.js?sourceMap!../../../node_modules/vue-loader/lib/style-compiler?{"optionsId":"0","vue":true,"scoped":false,"sourceMap":true}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./main.vue */ "./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/style-compiler/index.js?{\"optionsId\":\"0\",\"vue\":true,\"scoped\":false,\"sourceMap\":true}!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./src/js/components/main.vue", function() {
     var newContent = __webpack_require__(/*! !../../../node_modules/css-loader/dist/cjs.js?sourceMap!../../../node_modules/vue-loader/lib/style-compiler?{"optionsId":"0","vue":true,"scoped":false,"sourceMap":true}!../../../node_modules/vue-loader/lib/selector.js?type=styles&index=0!./main.vue */ "./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/style-compiler/index.js?{\"optionsId\":\"0\",\"vue\":true,\"scoped\":false,\"sourceMap\":true}!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./src/js/components/main.vue");
     if(typeof newContent === 'string') newContent = [[module.i, newContent, '']];
     update(newContent);
   });
 }
 // When the module is disposed, remove the <style> tags
 module.hot.dispose(function() { update(); });
}

/***/ }),

/***/ "./src/js/app.vue":
/*!************************!*\
  !*** ./src/js/app.vue ***!
  \************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_app_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !babel-loader!../../node_modules/vue-loader/lib/selector?type=script&index=0!./app.vue */ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/js/app.vue");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_template_compiler_index_id_data_v_7d73c7f4_hasScoped_false_optionsId_0_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_app_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../node_modules/vue-loader/lib/template-compiler/index?{"id":"data-v-7d73c7f4","hasScoped":false,"optionsId":"0","buble":{"transforms":{}}}!../../node_modules/vue-loader/lib/selector?type=template&index=0!./app.vue */ "./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-7d73c7f4\",\"hasScoped\":false,\"optionsId\":\"0\",\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/js/app.vue");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_component_normalizer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../node_modules/vue-loader/lib/runtime/component-normalizer */ "./node_modules/vue-loader/lib/runtime/component-normalizer.js");
var disposed = false
function injectStyle (context) {
  if (disposed) return
  __webpack_require__(/*! !vue-style-loader!css-loader?sourceMap!../../node_modules/vue-loader/lib/style-compiler/index?{"optionsId":"0","vue":true,"scoped":false,"sourceMap":true}!../../node_modules/vue-loader/lib/selector?type=styles&index=0!./app.vue */ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/style-compiler/index.js?{\"optionsId\":\"0\",\"vue\":true,\"scoped\":false,\"sourceMap\":true}!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./src/js/app.vue")
}
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null

var Component = Object(_node_modules_vue_loader_lib_runtime_component_normalizer__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_app_vue__WEBPACK_IMPORTED_MODULE_0__["default"],
  _node_modules_vue_loader_lib_template_compiler_index_id_data_v_7d73c7f4_hasScoped_false_optionsId_0_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_app_vue__WEBPACK_IMPORTED_MODULE_1__["render"],
  _node_modules_vue_loader_lib_template_compiler_index_id_data_v_7d73c7f4_hasScoped_false_optionsId_0_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_app_vue__WEBPACK_IMPORTED_MODULE_1__["staticRenderFns"],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/js/app.vue"

/* hot reload */
if (true) {(function () {
  var hotAPI = __webpack_require__(/*! vue-hot-reload-api */ "./node_modules/vue-hot-reload-api/dist/index.js")
  hotAPI.install(__webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.js"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-7d73c7f4", Component.options)
  } else {
    hotAPI.reload("data-v-7d73c7f4", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ "./src/js/components/main.vue":
/*!************************************!*\
  !*** ./src/js/components/main.vue ***!
  \************************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_main_vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! !babel-loader!../../../node_modules/vue-loader/lib/selector?type=script&index=0!./main.vue */ "./node_modules/babel-loader/lib/index.js!./node_modules/vue-loader/lib/selector.js?type=script&index=0!./src/js/components/main.vue");
/* empty/unused harmony star reexport *//* harmony import */ var _node_modules_vue_loader_lib_template_compiler_index_id_data_v_3d25fde5_hasScoped_false_optionsId_0_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_main_vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! !../../../node_modules/vue-loader/lib/template-compiler/index?{"id":"data-v-3d25fde5","hasScoped":false,"optionsId":"0","buble":{"transforms":{}}}!../../../node_modules/vue-loader/lib/selector?type=template&index=0!./main.vue */ "./node_modules/vue-loader/lib/template-compiler/index.js?{\"id\":\"data-v-3d25fde5\",\"hasScoped\":false,\"optionsId\":\"0\",\"buble\":{\"transforms\":{}}}!./node_modules/vue-loader/lib/selector.js?type=template&index=0!./src/js/components/main.vue");
/* harmony import */ var _node_modules_vue_loader_lib_runtime_component_normalizer__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../../../node_modules/vue-loader/lib/runtime/component-normalizer */ "./node_modules/vue-loader/lib/runtime/component-normalizer.js");
var disposed = false
function injectStyle (context) {
  if (disposed) return
  __webpack_require__(/*! !vue-style-loader!css-loader?sourceMap!../../../node_modules/vue-loader/lib/style-compiler/index?{"optionsId":"0","vue":true,"scoped":false,"sourceMap":true}!../../../node_modules/vue-loader/lib/selector?type=styles&index=0!./main.vue */ "./node_modules/vue-style-loader/index.js!./node_modules/css-loader/dist/cjs.js?sourceMap!./node_modules/vue-loader/lib/style-compiler/index.js?{\"optionsId\":\"0\",\"vue\":true,\"scoped\":false,\"sourceMap\":true}!./node_modules/vue-loader/lib/selector.js?type=styles&index=0!./src/js/components/main.vue")
}
/* script */


/* template */

/* template functional */
var __vue_template_functional__ = false
/* styles */
var __vue_styles__ = injectStyle
/* scopeId */
var __vue_scopeId__ = null
/* moduleIdentifier (server only) */
var __vue_module_identifier__ = null

var Component = Object(_node_modules_vue_loader_lib_runtime_component_normalizer__WEBPACK_IMPORTED_MODULE_2__["default"])(
  _babel_loader_node_modules_vue_loader_lib_selector_type_script_index_0_main_vue__WEBPACK_IMPORTED_MODULE_0__["default"],
  _node_modules_vue_loader_lib_template_compiler_index_id_data_v_3d25fde5_hasScoped_false_optionsId_0_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_main_vue__WEBPACK_IMPORTED_MODULE_1__["render"],
  _node_modules_vue_loader_lib_template_compiler_index_id_data_v_3d25fde5_hasScoped_false_optionsId_0_buble_transforms_node_modules_vue_loader_lib_selector_type_template_index_0_main_vue__WEBPACK_IMPORTED_MODULE_1__["staticRenderFns"],
  __vue_template_functional__,
  __vue_styles__,
  __vue_scopeId__,
  __vue_module_identifier__
)
Component.options.__file = "src/js/components/main.vue"

/* hot reload */
if (true) {(function () {
  var hotAPI = __webpack_require__(/*! vue-hot-reload-api */ "./node_modules/vue-hot-reload-api/dist/index.js")
  hotAPI.install(__webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.js"), false)
  if (!hotAPI.compatible) return
  module.hot.accept()
  if (!module.hot.data) {
    hotAPI.createRecord("data-v-3d25fde5", Component.options)
  } else {
    hotAPI.reload("data-v-3d25fde5", Component.options)
  }
  module.hot.dispose(function (data) {
    disposed = true
  })
})()}

/* harmony default export */ __webpack_exports__["default"] = (Component.exports);


/***/ }),

/***/ "./src/js/router/index.js":
/*!********************************!*\
  !*** ./src/js/router/index.js ***!
  \********************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.js");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var vue_router__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vue-router */ "./node_modules/vue-router/dist/vue-router.esm.js");


vue__WEBPACK_IMPORTED_MODULE_0___default.a.use(vue_router__WEBPACK_IMPORTED_MODULE_1__["default"]);
/* harmony default export */ __webpack_exports__["default"] = (new vue_router__WEBPACK_IMPORTED_MODULE_1__["default"]({
  mode: 'history',
  routes: []
}));

/***/ }),

/***/ "./src/js/script.js":
/*!**************************!*\
  !*** ./src/js/script.js ***!
  \**************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vuetify_dist_vuetify_min_css__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vuetify/dist/vuetify.min.css */ "./node_modules/vuetify/dist/vuetify.min.css");
/* harmony import */ var vuetify_dist_vuetify_min_css__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vuetify_dist_vuetify_min_css__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.js");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _app_vue__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./app.vue */ "./src/js/app.vue");
/* harmony import */ var _store_store_js__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./store/store.js */ "./src/js/store/store.js");
/* harmony import */ var _router__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./router */ "./src/js/router/index.js");
/* harmony import */ var es6_promise__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! es6-promise */ "./node_modules/es6-promise/dist/es6-promise.js");
/* harmony import */ var es6_promise__WEBPACK_IMPORTED_MODULE_5___default = /*#__PURE__*/__webpack_require__.n(es6_promise__WEBPACK_IMPORTED_MODULE_5__);
/* harmony import */ var _babel_polyfill__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! @babel/polyfill */ "./node_modules/@babel/polyfill/lib/index.js");
/* harmony import */ var _babel_polyfill__WEBPACK_IMPORTED_MODULE_6___default = /*#__PURE__*/__webpack_require__.n(_babel_polyfill__WEBPACK_IMPORTED_MODULE_6__);
/* harmony import */ var vuetify__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! vuetify */ "./node_modules/vuetify/dist/vuetify.js");
/* harmony import */ var vuetify__WEBPACK_IMPORTED_MODULE_7___default = /*#__PURE__*/__webpack_require__.n(vuetify__WEBPACK_IMPORTED_MODULE_7__);






es6_promise__WEBPACK_IMPORTED_MODULE_5___default.a.polyfill();


vue__WEBPACK_IMPORTED_MODULE_1___default.a.use(vuetify__WEBPACK_IMPORTED_MODULE_7___default.a);
vue__WEBPACK_IMPORTED_MODULE_1___default.a.config.productionTip = false; // 我不加也行，不知道功用。

/* harmony default export */ __webpack_exports__["default"] = (new vuetify__WEBPACK_IMPORTED_MODULE_7___default.a({})); // 最主要是這行

new vue__WEBPACK_IMPORTED_MODULE_1___default.a({
  el: '#app',
  store: _store_store_js__WEBPACK_IMPORTED_MODULE_3__["default"],
  vuetify: new vuetify__WEBPACK_IMPORTED_MODULE_7___default.a(),
  // 跟這行
  components: {
    App: _app_vue__WEBPACK_IMPORTED_MODULE_2__["default"]
  },
  router: _router__WEBPACK_IMPORTED_MODULE_4__["default"],
  template: '<App/>',
  created: function created() {},
  methods: {}
});

/***/ }),

/***/ "./src/js/store/store.js":
/*!*******************************!*\
  !*** ./src/js/store/store.js ***!
  \*******************************/
/*! exports provided: default */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! vue */ "./node_modules/vue/dist/vue.js");
/* harmony import */ var vue__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(vue__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var vuex__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! vuex */ "./node_modules/vuex/dist/vuex.esm.js");
/* harmony import */ var es6_promise__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! es6-promise */ "./node_modules/es6-promise/dist/es6-promise.js");
/* harmony import */ var es6_promise__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(es6_promise__WEBPACK_IMPORTED_MODULE_2__);



es6_promise__WEBPACK_IMPORTED_MODULE_2___default.a.polyfill();
vue__WEBPACK_IMPORTED_MODULE_0___default.a.use(vuex__WEBPACK_IMPORTED_MODULE_1__["default"]);
/* harmony default export */ __webpack_exports__["default"] = (new vuex__WEBPACK_IMPORTED_MODULE_1__["default"].Store({
  state: {
    username: ''
  },
  mutations: {
    SET_USERNAME: function SET_USERNAME(state, username) {
      state.username = username;
    }
  },
  actions: {
    set_username: function set_username(context, payload) {
      context.commit('SET_USERNAME', payload);
    }
  },
  getters: {
    username: function username(state) {
      return state.username;
    }
  }
}));

/***/ })

/******/ });
//# sourceMappingURL=script.wubi.js.map