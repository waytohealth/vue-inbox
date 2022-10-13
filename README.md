# vue-inbox
A Vue frontend for interacting with a Way to Health participant

# Dependencies
This component has a peer dependency on Bootstrap 4. By default, it uses several bootstrap styles on its components.
If you are unable to use bootstrap 4, the `styles` prop provides a limited ability to override the default styling by 
allowing you to override them and insert your own classes onto most elements

# Properties

## auth

This property defines how the component will authorize its requests for ifs API calls.
There are two supported modes: Session and API Key.

```json
{
  "method": "session"
}
```

```json
{
  "method": "apiKey",
  "apiKey": "API KEY GOES HERE"
}
```

If an API Key is being used, it should have authorization scopes for the following API endpoints:
1. [getTextMessages](https://app.waytohealth.org/api/v2#operation/getTextMessages)
2. [createTextMessageForParticipant](https://app.waytohealth.org/api/v2/participants/{participant_id}/text_messages)

If session auth is being used, the component will expect a valid session cookie, using the [{credentials: "include"}](https://developer.mozilla.org/en-US/docs/Web/API/fetch#credentials) setting on `fetch`
## apiBaseUrl

This required property is the API base for a given environment.
In production (against the core platform) this should be `https://app.waytohealth.org`

## studyId

The ID of the study that the participant is in

## participantId

The Way to Health ID of the participant

## styles

This optional property lets you override the class value of certain items in the Inbox UI.
It should be an object with any of the following keys. Below are the default values:
```json
{
  "inboxSubmit": "btn px-4 btn-primary"
}
```