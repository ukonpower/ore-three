module.exports = {
	preset: 'jest-puppeteer',
	moduleFileExtensions: [ 'js', 'ts' ],
	transform: {
		'^.+\\.ts$': [ 'ts-jest', {
			"tsconfig": "./tsconfig.test.json"
		} ],
	},
	"globals": {
	},
	setupFilesAfterEnv: [ './tests/jest-setup.ts' ],
	modulePathIgnorePatterns: [ 'jest-setup.ts' ],
	testMatch: [
		"<rootDir>/tests/**/*.ts",
	],
	rootDir: "../"
};
