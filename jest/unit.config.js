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
			"tsconfig": "<rootDir>/tsconfig.json"
		},
		"coverageThreshold": {
			"global": {
				"lines": 80,
			},
		},
	},
	testMatch: [
		"<rootDir>/packages/ore-three/**/tests/**/*.ts",
	],
	rootDir: "../"
}