# Git process

> This article assumes that you understand the [basic concepts of the git version control system](https://help.github.com/articles/good-resources-for-learning-git-and-github/)._

### Overview

On the authoring tool project, we organise the branches in our repos in a similar way to standard [git flow](https://datasift.github.io/gitflow/IntroducingGitFlow.html), with a few alterations.

### Branching

We use the following branches:

Name | Description | Persisting
---- | ----------- | ----------
`master` | Contains the stable, released code. | yes
`develop` | Contains the latest features. Not guaranteed to have been tested, so not suitable for production installs. | yes
`release/VERSION_NAME`<br/>*(e.g. `release/v1.0`)* | A release candidate branch. Contains **development** code, and should not be considered stable. Use this code at your own risk! | no
`issue/TICKET_NAME` <br/>*(e.g. `issue/1024`)* | A self-contained bug-fix/feature. Should be named after a corresponding issue ID. Finished changes should be submitted as a pull request. | no

We also apply the following rules:

* The `master` and `develop` branches are the only persisting branches. All other branches should be deleted post-merge.
* The `master` branch contains only *thoroughly* tested code, and should only ever merge code from a `release` branch.
* Any `issue` branches should be submitted as a PR to the current `release` branch (**NOT** `master` -- unlike standard git flow, we don't allow hotfixes directly into `master`).

### Gearing up for release

We go through the following schedule prior to making a release:

1. The core development team assign a bunch of issues/features to the relevant release.
1. A `release` branch is created from the latest `develop` code.
1. The coders are let loose :wrench:, and submit their additions as PRs using the [documented process](peer-review).
1. Once all work has been done, we call a code freeze :snowflake:, and the branch goes through our testing process.
1. Any issues are fixed.

### Releasing

Once the release code has been tested, we are ready to merge the release branch into `master`. When this is done, we tag the `master` branch with the release number, and **party**! :tada::balloon::tropical_drink:

