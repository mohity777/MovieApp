const { execSync } = require("child_process");
const path = require("path");
const fs = require("fs");

const {
	getBasicDiffDetails,
	getCoverageDetails
} = require("./jestJsonDiffChecker");
const { addComment } = require("./commentHelper");

const directoryPath = path.join(__dirname, "../../", "coverage");
const coverageJsonPath = path.join(directoryPath, "coverage-summary.json");

module.exports = async ({ github, context, core }) => {
	try {
		const branchNameBase = context.payload.pull_request.base.ref;
		const branchNameHead = context.payload.pull_request.head.ref;
		const codeCoverageNew = JSON.parse(
			fs.readFileSync(coverageJsonPath, "utf-8").toString()
		);
		execSync("/usr/bin/git fetch");
		execSync("/usr/bin/git stash");
		execSync(`/usr/bin/git checkout --progress --force ${branchNameBase}`);
		execSync('npx jest src --collectCoverage --passWithNoTests --updateSnapshot');
		const codeCoverageOld = JSON.parse(
			fs.readFileSync(coverageJsonPath, "utf-8").toString()
		);
		const currentDirectory = execSync("pwd").toString().trim();
		const diffChecker = getBasicDiffDetails(codeCoverageNew, codeCoverageOld);
		let messageToPost = `## Test coverage results :test_tube: \n
        Code coverage diff between base branch: ${branchNameBase} and head branch: ${branchNameHead} \n`;
		const coverageDetails = getCoverageDetails(
			true,
			`${currentDirectory}/`,
			diffChecker
		);
		if (coverageDetails.length === 0) {
			messageToPost = `## Test coverage results :test_tube: \n
				No changes to code coverage between the base branch and the head branch`;
		} else {
			messageToPost +=
				"Status | File | % Stmts | % Branch | % Funcs | % Lines \n -----|-----|---------|----------|---------|------ \n";
			messageToPost += coverageDetails.join("\n");
		}
		await addComment({
			github,
			issue_number: context.issue.number,
			owner: context.repo.owner,
			repo: context.repo.repo,
			body: messageToPost,
			stringToSearch: "## Test coverage results"
		});
	} catch (err) {
		console.log("err : ", err);
	}
};
