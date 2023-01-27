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

If session auth is being used, the component will expect a valid session cookie, using
the [{credentials: "include"}](https://developer.mozilla.org/en-US/docs/Web/API/fetch#credentials) setting on `fetch`

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

# Image upload

This component does not include an image uploader, but provides the hooks for a consuming application to integrate one.

When you load the `InboxComponent`, pass a prop of `:image-upload-enabled="true"` to show the invoker within the
textarea. In addition, pass a named `imagePicker` template containing the actual image picker/uploader component.

The slot is passed the following props:

| Name          | Type                  | Description                                                                                                                      |
|---------------|-----------------------|----------------------------------------------------------------------------------------------------------------------------------|
| `isOpen`      | `Boolean`             | Will be false initially, will be flipped to true when the image picker should open                                               |
| `attachImage` | `Function(url, name)` | Call this with the URL (and optionally name) of the image when done. This must be a publicly accessible URL reachable by Twilio. |
| `onClose`     | `Function`            | Call this when the image picker is closed. Sets `isOpen` to false. This is necessary, otherwise the image picker can't reopen.   |

You can find an example of usage in `InboxWrapper.vue` and `ImagePicker.vue`.

# Development
If you want to hack on this repo while having your changes show up quickly within w2h core (or some other UI), here's a workflow to make that happen:
1. Within this repo, run `yarn link`
2. Within the main app (e.g. w2h core), run `yarn link @waytohealth/inbox-component`. That will make `./node_modules/@waytohealth/inbox-component` a symlink to this repo.
    * You may need to restart webpack dev server after doing this.
3. Set up a File Watcher in your IDE to run `yarn build` after each modification. (This will make sure that changes make their way into `dist/` and not just `src/`).
