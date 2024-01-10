# React Native Template App

A todo list application built with the [React Native SDK](https://www.mongodb.com/docs/realm/sdk/react-native/) and [Atlas Device Sync](https://www.mongodb.com/docs/atlas/app-services/sync/).

You can follow along with the [React Native Tutorial](https://www.mongodb.com/docs/atlas/app-services/tutorial/react-native/) to see how to build, modify, and
run this template app.

## Prerequisites

- Make sure your system is setup to run a React Native application by following the [setup guide](https://reactnative.dev/docs/environment-setup)
- Set up an Atlas account and [deploy a cluster](https://www.mongodb.com/docs/atlas/tutorial/deploy-free-tier-cluster/)
- Set up an application in App Services.

  - You can use the [`realm-cli`](https://www.mongodb.com/docs/atlas/app-services/cli/) to set up the backend and download a copy of this template:

    ```
    realm-cli apps create -n "<App Name>" --template "react-native.todo.flex"
    ```

## Configuration

Ensure `atlasConfig.json` exists and contains the following properties:

- **appId:** your Atlas App Services App ID.
- **baseUrl:** the App Services backend URL. This should be https://services.cloud.mongodb.com in most cases.

### Using the Atlas App Services UI

The easiest way to use this template app is to log on to [Atlas App Services](https://services.cloud.mongodb.com) and click the **Create App From Template** button. Choose
**Real Time Sync**, and then follow the prompts. While the backend app is being
created, you can download this React Native template app pre-configured for your new
app.

### Cloning from GitHub

If you have cloned this repository from the GitHub
[mongodb/template-app-react-native-todo](https://github.com/mongodb/template-app-react-native-todo.git)
repository, you must create a separate App Services App with Device Sync
enabled to use this client. You can find information about how to do this
in the Atlas App Services documentation page:
[Template Apps -> Create a Template App](https://www.mongodb.com/docs/atlas/app-services/reference/template-apps/)

Once you have created the App Services App, replace any value in this client's
`appId` field with your App Services App ID. For help finding this ID, refer
to: [Find Your Project or App Id](https://www.mongodb.com/docs/atlas/app-services/reference/find-your-project-or-app-id/)

### Download the Client as a Zip File

If you have downloaded this client as a .zip file from the Atlas App Services
UI, it does not contain the App Services App ID. You must replace any value
in this client's `appId` field in `atlasConfig.json` with your
App Services App ID. For help finding this ID, refer to:
[Find Your Project or App Id](https://www.mongodb.com/docs/atlas/app-services/reference/find-your-project-or-app-id/)

## How to Run the Application:

- Make sure you are in this directory
- `npm install`
- `npx pod-install` if on Mac
- `npm run ios` (or `npm run android`, if you have an emulator running. Note: If you have not set up your development environment for running react-native android apps, see: https://reactnative.dev/docs/environment-setup)

## Issues

Please report issues with the template at https://github.com/mongodb-university/realm-template-apps/issues/new
