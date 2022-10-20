const path = require('path');
const { execSync: _execSync } = require('child_process');
const fs = require('fs');

const { addComment } = require('./commentHelper');

const execSync = (command) => _execSync(command, { stdio: 'inherit' });
const toKiloBytes = (size) => `${parseFloat(size / 1024).toFixed(2)}`;

const prDiffHandler = async ({ github, context, core }) => {
    try {
        let buildPath = path.join(__dirname, '../../index.android.bundle');
        const headBuildSize = fs.statSync(buildPath).size;

        const branchNameBase = context.payload.pull_request.base.ref;
        execSync('/usr/bin/git fetch');
        execSync('/usr/bin/git stash');
        execSync(`/usr/bin/git checkout --progress --force ${branchNameBase}`);
        execSync(
            `npx react-native bundle --platform ${process.env.PLATFORM} --dev false --entry-file ${process.env.ENTRY_FILE} --bundle-output ./${process.env.BUNDLE_FILE}`
        );

        buildPath = path.join(__dirname, '../../index.android.bundle');
        const baseBuildSize = fs.statSync(buildPath).size;

        const buildTotalSizeChange = parseFloat(
            ((headBuildSize - baseBuildSize) * 100) / baseBuildSize
        ).toFixed(4);

        let messageToPost =
            '## Changes in app bundle\n' +
            '| Original Size (KB) | New Size (KB)  | Change (%) |\n' +
            '|   :------------:   |   :--------:   | :--------: |\n';

        messageToPost += `| ${toKiloBytes(baseBuildSize)} |${toKiloBytes(
            headBuildSize
        )} | ${buildTotalSizeChange}|`;

        await addComment({
            github,
            issue_number: context.issue.number,
            owner: context.repo.owner,
            repo: context.repo.repo,
            body: messageToPost,
            stringToSearch: '## Changes in app bundle',
        });
    } catch (e) {
        console.log('ERROR', e);
        console.log('ERROR:stringified:', JSON.stringify(e));
    }
};

module.exports = prDiffHandler;
