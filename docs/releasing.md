# Publishing a release

> Only users with collaborator status on the Adapt authoring tool repository will have the correct permissions to perform a release.

Releasing a new version of the Adapt authoring tool simply requires running a command-line utility which will automate the following process:

- Updating the `package.json`
- Updating the `CHANGELOG.md`
- Pushing changes to git
- Tagging the release commit on git
- Publishing the release on GitHub

This page documents the manual steps required to perform a release.

## 1. Check the GitHub release data

The release utility pulls all of the relevant data for the release from GitHub, so it is essential that this is present and correct.

#### Create the release

Make sure a **draft** release exists with the correct title (this should be the version number, e.g. v1.0.0) and description. The description need not be long, but should include any useful information about the release. For patch releases, 'Bugfix release' is adequate.

#### Check the issues

The release utility adds all **closed** issues assigned to the release's milestone to the `CHANGELOG.md`. Please make sure the milestone name and release name match, and that all issues have succinct and descriptive names (and no typos!).

## 2. Set environment variables

The utility requires `GITHUB_USER` and `GITHUB_TOKEN` environment variables in order to authenticate with the GitHub API. Please make sure these are set prior to running the tool.

Please consult the documentation for your specific operating system on how to do this.

> You'll need to generate an access token on [this page](https://github.com/settings/tokens/new) with the `public_repo` scope (choose a name and expiry date to suit you).

## 3. Run the utility

Once you've confirmed the above, you can run the release utility using the following command:
```
npx adapt-security/at-utils release
```

The utility will then guide you through the rest.