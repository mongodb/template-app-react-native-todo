# React Native Template App

## Configuration

Ensure `react-native/realm.json` exists and contains the following properties:

- **appId:** your Atlas App Services App ID.
- **baseUrl:** the App Services backend URL. This should be https://realm.mongodb.com in most cases.

### Cloning from GitHub

If you have cloned this repository from the GitHub 
[mongodb/template-app-react-native-todo](https://github.com/mongodb/template-app-react-native-todo.git) 
repository, you must create a separate App Services App with Device Sync 
enabled to use this client. You can find information about how to do this 
in the Atlas App Services documentation page:
[Template Apps -> Create a Template App](https://www.mongodb.com/docs/atlas/app-services/reference/template-apps/#create-a-template-app)

Once you have created the App Services App, replace any value in this client's
`appId` field with your App Services App ID. For help finding this ID, refer 
to: [Find Your Project or App Id](https://www.mongodb.com/docs/atlas/app-services/reference/find-your-project-or-app-id/)

## How to Run the Application for Mac Users:
- make sure you are in this directory
- `npm install`
- `npx pod-install`
- `npm run ios` (or `npm run android`, if you have an emulator running. Note: If you have not set up your development environment for running react-native android apps, see: https://reactnative.dev/docs/environment-setup)

## Issues

Please report issues with the template at https://github.com/mongodb-university/realm-template-apps/issues/new
