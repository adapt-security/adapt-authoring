# Peer code review

All code must go through a peer-approval process before it is merged with any of the collaborator-maintained codebases. This is to ensure that it firstly 'scratches' the intended 'itch', and complies to the guidelines set out by the project.

## The Process

When code is ready for review, the below process is followed:

1. Code is submitted for review as a pull request.
1. Code is then reviewed by peers using GitHub's [pull-request review](https://help.github.com/articles/about-pull-request-reviews/) feature to leave comments where necessary and give an approval/rejection.
1. Code is amended if needed until it satisfies the required number of approvals.
1. Provided all unit tests are passing, code is merged.

## The Rules

The reviewing process is governed by these rules:

* The developer who submits the PR is not allowed to submit a review.
* If a commit is added to the PR, any previously given reviews are invalidated. Everyone must re-post their verdicts after reviewing the commit.
* Any new functionality/feature requests uncovered during review of a PR must be separated into new issues/PRs, unless directly related.
* **For code to be merged, a minimum of three approvals is required. Of these, at least two must have come from a core team member. In the interest of impartiality, it is generally not advised to get all three approvals from a single collaborating company.**  
* The person who merges the PR must also submit their review prior to merging **if their vote is required**. Merging a PR which already has enough approvals does not require the review of the merger themselves.
* Any review rejections must be accompanied by an adequate explanation of why the PR should not be merged. Without this, the review will be disregarded.
* Any concerns signalled by a 'rejected' review warrant careful consideration, but no reviewer has veto rights. If the PR receives enough approvals, it can still be merged (provided the other rules outlined on this page are followed).
  1. Concerns will be resolved in conversation between the submitter of the PR and the reviewer who rejected the PR. When/if satisfied, the reviewer will change verdict to an approval.
  2. At an impasse, a course of action will be decided by the core development team.

## The Verdict

There are two 'statuses' which can be applied to submitted PRs: **approve** and **request changes**. See below for a quick checklist for each:

### Request changes.
A core developer may reject a PR because any (or all) of the following:

- The code fails testing.
- The code does not meet Adapt standards.
- The code negatively impacts the application.
- There are unresolved questions about the intent of the code.

### Approved.
A core developer will approve an PR because of the following:

- The intentions of the submitter are understood.
- The implementation of the PR is accepted.
- The submitted code complies with the code-style outlined in the project's [styleguide](https://github.com/adaptlearning/documentation/blob/master/01_cross_workstream/style_guide.md).
- The code passes all automated tests.
- No negative issues resulting from the proposed changes are forseen.

## References

[SmartBear: 11 Best Practices for Peer Code Review](http://smartbear.com/smartbear/media/pdfs/wp-cc-11-best-practices-of-peer-code-review.pdf)