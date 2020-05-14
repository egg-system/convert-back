MODULE=convert-csv
FILE=csv

csv.zip:
	@make zip MODULE=convert-csv FILE=csv

storage.zip:
	cd ./storage && yarn install --production
	mkdir -p ./nodejs
	cp -r ./storage ./nodejs/node_modules
	zip -r storage.zip ./nodejs/
	rm -rf ./nodejs

files.zip:
	@make zip MODULE=files FILE=files

deleter.zip:
	@make zip MODULE=file-deleter FILE=deleter

zip:
	cd ${MODULE} && yarn install --production && zip -r ${MODULE}.zip .
	mv ${MODULE}/${MODULE}.zip ./${FILE}.zip
