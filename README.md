# Adapt Authoring Tool

This is a prototype for the restructure of the [Adapt authoring tool application](https://github.com/adaptlearning/adapt_authoring/issues).

![](http://code.tomtaylor.name/ls/esdoc/badge.svg)

This repository marks the entry point, and only contains the code necessary to bootstrap the application. For the actual code, see the list of [`package.json` dependencies](https://github.com/taylortom/adapt-authoring/blob/master/package.json#L42-L47) (starting with the [`adapt-authoring-core` module](https://github.com/taylortom/adapt-authoring-core)).

Supporting documentation can be found in Adapt’s [documentation repository](https://github.com/adaptlearning/documentation/blob/master/02_authoring_tool/04_feature_development/server_restructure). In particular, the following documents may be of use:
- [Proposal document](https://github.com/adaptlearning/documentation/blob/master/02_authoring_tool/04_feature_development/server_restructure)
- [Minimum Viable Product definition](https://github.com/adaptlearning/documentation/blob/master/02_authoring_tool/04_feature_development/server_restructure/Server-rewrite-mvp-definition.pdf)

To follow the discussion, you can head to the [server-refactor room](https://gitter.im/adaptlearning/server-refactor) on Adapt’s Gitter community.

## To run the prototype

To test the prototype, you simply need to install all dependencies, and then run the start script:
```
npm install && npm start
```
