FILE=./source-files/GreekWordList.esm.js
if [ ! -f "$FILE" ]; then
	sed 's/greekWordList =/export default/' ./source-files/GreekWordList.js > ./source-files/GreekWordList.esm.js
fi