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
		},
		"coverageThreshold": {
			"global": {
				"lines": 80,
			},
		},
	},
	"testMatch": [
		"**/tests/**/*.test.ts"
	]
}