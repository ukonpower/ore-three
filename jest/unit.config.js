module.exports = {
	"moduleFileExtensions": [
		"ts",
		"js"
	],
	"testEnvironment": "jsdom",
	"transform": {
		"^.+\\.ts$": [ "ts-jest", {
			"tsconfig": "<rootDir>/tsconfig.json"
		} ]
	},
	"globals": {
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
};
