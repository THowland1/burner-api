module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    moduleDirectories: [
        "functions",
        "node_modules"
    ],
    testPathIgnorePatterns: ["/lib/", "/node_modules/"],
    transform: {
        '^.+\\.(ts|tsx)?$': 'ts-jest',
        "^.+\\.(js|jsx)$": "babel-jest",
    }
}