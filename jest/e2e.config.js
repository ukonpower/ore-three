module.exports = {
	preset: 'jest-puppeteer',
	moduleFileExtensions: [ 'js', 'ts' ],
	transform: {
		'^.+\\.ts$': 'ts-jest',
	},
	"globals": {
		"ts-jest": {
			"tsconfig": "./tsconfig.json"
		},
	},
	setupFilesAfterEnv: [ './tests/jest-setup.ts' ],
	modulePathIgnorePatterns: [ 'jest-setup.ts' ],
	testMatch: [
		"<rootDir>/tests/**/*.ts",
	],
	rootDir: "../"
};
