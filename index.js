const { execSync } = require('child_process')
const versions = require('./truffle-versions')
const importFresh = require('import-fresh')
const semver = require('semver')
const OLD_STRUCTURE_VERSION = '4.1.11'

for (const version of versions) {
    let solcVersion

    let out = execSync(`git checkout tags/v${version}`, { cwd: './truffle', windowsHide: true, stdio: 'pipe' })

    if (semver.gt(version, OLD_STRUCTURE_VERSION)) {
        const trufflePackage = importFresh(`./truffle/packages/truffle-compile/package.json`)
        solcVersion = trufflePackage.dependencies.solc
    }
    else {        
        const trufflePackage = importFresh(`./truffle/package.json`)
        solcVersion = trufflePackage.dependencies.solc
    }
    console.log(`${version}: ${solcVersion}`)

}