BASE_FOLDER := $(dir $(realpath $(lastword $(MAKEFILE_LIST))))
PROJECT_FOLDER := BASE_FOLDER
BIN_FOLDER := $(BASE_FOLDER)/bin
JS_SRC_FOLDER := $(BASE_FOLDER)/src
JS_NS_FOLDER := $(JS_SRC_FOLDER)
PLOVR=java -jar $(BIN_FOLDER)/plovr.jar
OJSTER= $(BIN_FOLDER)/ojster/bin/ojster

build:  compile-templates js-build

js-serve:
	$(PLOVR) serve --port 3333 plovrconfig.json

js-build:
	@echo ""
	@echo Compile js
	@echo ==========
	$(PLOVR) build plovrconfig.json

compile-templates:
	@echo ""
	@echo Compile templates
	@echo =================
	rm -rf $(JS_NS_FOLDER)/*.ojst.js
	$(OJSTER) $(JS_NS_FOLDER) $(JS_NS_FOLDER) --ext .ojst.js --goog

install:
	@echo ""
	@echo Install dependencies
	@echo ====================
	./bootstrap.sh
	@echo ""
	@echo All deps installed
	@echo ==================

