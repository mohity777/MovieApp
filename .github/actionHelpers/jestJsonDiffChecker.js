const increasedCoverageIcon = ":green_circle:";
const decreasedCoverageIcon = ":red_circle:";
const newCoverageIcon = ":sparkles: :new:";
const removedCoverageIcon = ":x:";

function getPercentageDiff(diffData) {
	// get diff
	const diff = Number(diffData.newPct) - Number(diffData.oldPct);
	// round off the diff to 2 decimal places
	return Math.round((diff + Number.EPSILON) * 100) / 100;
}

function getStatusIcon(diffFileCoverageData) {
	let overallDiff = 0;
	Object.values(diffFileCoverageData).forEach((coverageData) => {
		overallDiff += getPercentageDiff(coverageData);
	});
	if (overallDiff < 0) {
		return decreasedCoverageIcon;
	}
	return increasedCoverageIcon;
}

function createDiffLine(name, diffFileCoverageData) {
	// No old coverage found so that means we added a new file coverage
	const fileNewCoverage = Object.values(diffFileCoverageData).every(
		(coverageData) => coverageData.oldPct === 0
	);
	// No new coverage found so that means we deleted a file coverage
	const fileRemovedCoverage = Object.values(diffFileCoverageData).every(
		(coverageData) => coverageData.newPct === 0
	);
	if (fileNewCoverage) {
		return ` ${newCoverageIcon} | **${name}** | **${diffFileCoverageData.statements.newPct}** | **${diffFileCoverageData.branches.newPct}** | **${diffFileCoverageData.functions.newPct}** | **${diffFileCoverageData.lines.newPct}**`;
	}
	if (fileRemovedCoverage) {
		return ` ${removedCoverageIcon} | ~~${name}~~ | ~~${diffFileCoverageData.statements.oldPct}~~ | ~~${diffFileCoverageData.branches.oldPct}~~ | ~~${diffFileCoverageData.functions.oldPct}~~ | ~~${diffFileCoverageData.lines.oldPct}~~`;
	}
	// Coverage existed before so calculate the diff status
	const statusIcon = getStatusIcon(diffFileCoverageData);
	return ` ${statusIcon} | ${name} | ${
		diffFileCoverageData.statements.newPct
	} **(${getPercentageDiff(diffFileCoverageData.statements)})** | ${
		diffFileCoverageData.branches.newPct
	} **(${getPercentageDiff(diffFileCoverageData.branches)})** | ${
		diffFileCoverageData.functions.newPct
	} **(${getPercentageDiff(diffFileCoverageData.functions)})** | ${
		diffFileCoverageData.lines.newPct
	} **(${getPercentageDiff(diffFileCoverageData.lines)})**`;
}

function compareCoverageValues(diffCoverageData) {
	const keys = Object.keys(diffCoverageData);
	for (const key of keys) {
		if (diffCoverageData[key].oldPct !== diffCoverageData[key].newPct) {
			return 1;
		}
	}
	return 0;
}

function getPercentage(coverageData = {}) {
	return coverageData.pct || 0;
}

module.exports = {
	getBasicDiffDetails: (coverageReportNew, coverageReportOld) => {
		const diffCoverageReport = {};
		const reportNewKeys = Object.keys(coverageReportNew);
		const reportOldKeys = Object.keys(coverageReportOld);
		const reportKeys = new Set([...reportNewKeys, ...reportOldKeys]);

		reportKeys.forEach((filePath) => {
			diffCoverageReport[filePath] = {
				branches: {
					newPct: getPercentage((coverageReportNew[filePath] || {}).branches),
					oldPct: getPercentage((coverageReportOld[filePath] || {}).branches)
				},
				statements: {
					newPct: getPercentage((coverageReportNew[filePath] || {}).statements),
					oldPct: getPercentage((coverageReportOld[filePath] || {}).statements)
				},
				lines: {
					newPct: getPercentage((coverageReportNew[filePath] || {}).lines),
					oldPct: getPercentage((coverageReportOld[filePath] || {}).lines)
				},
				functions: {
					newPct: getPercentage((coverageReportNew[filePath] || {}).functions),
					oldPct: getPercentage((coverageReportOld[filePath] || {}).functions)
				}
			};
		});
		return diffCoverageReport;
	},

	getCoverageDetails: (diffOnly, currentDirectory, diffCoverageReport) => {
		const keys = Object.keys(diffCoverageReport);
		const returnStrings = [];
		keys.forEach((key) => {
			if (compareCoverageValues(diffCoverageReport[key]) !== 0) {
				returnStrings.push(
					createDiffLine(
						key.replace(currentDirectory, ""),
						diffCoverageReport[key]
					)
				);
			} else if (!diffOnly) {
				returnStrings.push(
					`${key.replace(currentDirectory, "")} | ${
						diffCoverageReport[key].statements.newPct
					} | ${diffCoverageReport[key].branches.newPct} | ${
						diffCoverageReport[key].functions.newPct
					} | ${diffCoverageReport[key].lines.newPct}`
				);
			}
		});
		return returnStrings;
	}
};