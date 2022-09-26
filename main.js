import { DB } from "https://deno.land/x/sqlite/mod.ts"

const INSERT_LIMIT = 5000

const db = new DB("./build/glosses.sqlite")

console.log("If this import fails, run `prepare.sh`")
import greekWordList from "./source-files/GreekWordList.esm.js"
console.log("Okay, ignore the above. Successful import")

db.execute(`
DROP TABLE IF EXISTS glosses
`)
db.execute(`
CREATE TABLE glosses (
	key TEXT,
	lemma TEXT,
	pos TEXT,
	src TEXT,
	def TEXT,
	deriv TEXT,
	v TEXT,
	l TEXT,
	m TEXT
)`)

const escape = str => "'" + str.replace(/'/g, "''").normalize('NFC') + "'"

const objToRow = ({ key, obj }) =>
	escape(key) + "," +
	("lemma" in obj ? escape(obj["lemma"]) : "NULL") + "," +
	("pos" in obj ? escape(obj["pos"]) : "NULL") + "," +
	("src" in obj ? escape(obj["src"]) : "NULL") + "," +
	("def" in obj ? escape(obj["def"]) : "NULL") + "," +
	("deriv" in obj ? escape(obj["deriv"]) : "NULL") + "," +
	("v" in obj ? escape(obj["v"]) : "NULL") + "," +
	("l" in obj ? escape(obj["l"]) : "NULL") + "," +
	("m" in obj ? escape(obj["m"]) : "NULL")

const createInsertStatement = values => `
INSERT INTO glosses VALUES ${values.map(row =>
	`(${objToRow(row)})`
).join(",")}
`

const words = Object.keys(greekWordList)

while (words.length > 0) {
	const insertSet = words.splice(0, INSERT_LIMIT)
	const mappedInsertSet = insertSet.map(w =>
		({ key: w, obj: greekWordList[w] })
	)
	const stmt = createInsertStatement(mappedInsertSet)
	db.execute(stmt)
}