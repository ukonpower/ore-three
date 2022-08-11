module.exports = {
	"moduleFileExtensions": [
		"ts",
		"js"
	],
	"testEnvironment": "jsdom",
	"transform": {
		"^.+\\.ts$": "ts-jest"
	},
	"globals": {
		"ts-jest": {
			"tsconfig": "./tsconfig.json"
		}
	},
	"testMatch": [
		"**/tests/**/*.test.ts"
	]
}