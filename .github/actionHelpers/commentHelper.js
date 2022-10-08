const addComment = async ({
	github,
	issue_number,
	owner,
	repo,
	body,
	stringToSearch
}) => {
	const { data: comments } = await github.issues.listComments({
		owner,
		repo,
		issue_number
	});
	const existingComment = comments.find((comment) =>
		comment.body.includes(stringToSearch)
	);
	if (existingComment) {
		await github.issues.updateComment({
			owner,
			repo,
			comment_id: existingComment.id,
			body
		});
	} else {
		await github.issues.createComment({
			owner,
			repo,
			issue_number,
			body
		});
	}
};

module.exports = {
	addComment: addComment
};