MODULE=convert-csv
FILE=csv

csv.zip:
	@make zip MODULE=convert-csv FILE=csv

storage.zip:
	@make layer MODULE=storage FILE=storage

files.zip:
	@make zip MODULE=files FILE=files

deleter.zip:
	@make zip MODULE=file-deleter FILE=deleter

zip:
	cd ${MODULE} && yarn install --production && zip -r ${MODULE}.zip .
	mv ${MODULE}/${MODULE}.zip ./${FILE}.zip

layer:
	cd ./${MODULE}/nodejs && yarn install --production
	zip -r ${FILE}.zip ./${MODULE}/nodejs/node_modules
