#.PHONY: build-RuntimeDependenciesLayer build-lambda-common
.PHONY: build-LogItemFunction build-GetInventoryFunction build-RemoveFromInventoryFunction

build-LogItemFunction:
	$(MAKE) HANDLER=src/handlers/logItem.ts build-lambda-common
build-GetInventoryFunction:
	$(MAKE) HANDLER=src/handlers/getInventory.ts build-lambda-common
build-RemoveFromInventoryFunction:
	$(MAKE) HANDLER=src/handlers/removeFromInventory.ts build-lambda-common

build-lambda-common:
	npm install
	rm -rf dist
	npm run build -- ${HANDLER} --outdir=dist --bundle --platform=node
	cp -r dist/* "$(ARTIFACTS_DIR)/"

#build-RuntimeDependenciesLayer:
#	mkdir -p "$(ARTIFACTS_DIR)/nodejs"
#	cp package.json package-lock.json "$(ARTIFACTS_DIR)/nodejs/"
#	npm install --production --prefix "$(ARTIFACTS_DIR)/nodejs/"
#	rm "$(ARTIFACTS_DIR)/nodejs/package.json" # to avoid rebuilding when changes doesn't relate to dependencies
