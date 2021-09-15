# Semantic version numbers

We have opted to use semantic version for release numbers of Adapt products. This page goes some way to explain how they work.

# Overview

Semantic Versioning uses a three-part version number, represented by: **MAJOR**.**MINOR**.**PATCH** 

### Major releases
A **major** release signifies changes to the API which are _not backward-compatible_ (we call these breaking changes).
- Usually introduces backwards-incompatible, breaking changes.
- Introduces the APIs we intend to support for the foreseeable future.

### Minor releases
A **minor** release add new (but crucially, **backward-compatible**) API features.
- Includes additions and/or refinements of APIs and subsystems.
- Do not generally change APIs nor introduce backwards-incompatible breaking changes, except where unavoidable.
- Are mostly additive releases.

### Patch releases
A **patch** release represents minor changes and bug fixes which do not change the software's public API/interface.
- Includes bug, performance, and security fixes.
- Do not add nor change public interfaces.
- Do not alter the expected behaviour of a given interface.
- Can correct behaviour if it is out-of-sync with the documentation.

## Example scenario

- A plugin's first stable release should have a version number of: **`1.0.0`**
- A subsequent bug-fix should bump the patch version number, resulting in **`1.0.1`**
- A new _backward-compatible_ feature is added, so the minor version is incremented: **`1.1.0`** (note that the patch number is reset to `0`)
- Another bug-fix is added, changing the version to: **`1.1.1`**
- Some breaking changes are introduced, so the major version is incremented, and the minor and patch numbers are reset: **`2.0.0`**


## More information

If you want to know more about semantic versioning, check out [this page](http://semver.org/). 

The Node.js community have straightforward guidelines for their release process (upon which we have modelled our own process).