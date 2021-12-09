# Headless installation

If you're installing the authoring tool on a headless server or otherwise want a more streamlined install process without the installer UI, you can run the installer using the `--no-ui` flag.

> Make sure to check the [main install instructions](install) for the list of prerequisites required prior to installation.

## 1. Create your configuration file
As there's no interface to guide you through the required configuration options, it's expected that you have a valid configuration file with all of the required attributes.

You can find instructions on setting up your config file on [this page](configure-environment).

## 2. Run the installer in headless mode
```bash
npx adapt-security/at-utils install --no-ui --prerelease
```