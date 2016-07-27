# meteor-settings-from-env


This just interpolates enviroment variables into the Meteor.settings variable that is normally populated from the settings.json file.

Install it from the repo:

    npm install --save git+https://git@github.com/rmoskal/meteor-settings-from-env

To use it set any envionment variables you wish to interpolate. By default, they should be prefixed my METEOR_, but you can override that when you call the function.  Additionally anything prefixed with METEOR_PUBLIC will be placed in the public portion of the settings file that is shipped to the client.

Depending on how your modules are set up, you might be able to simply call this in a Meteor.startup() function:

    Meteor.startup(() => {
      require('meteor-settings-from-env')().do(Meteor.settings)
    });

However, it seems mostly you cannot do this and have to do it much earlier in the boot process.  Modules in the /lib directory are run in alphabetical order. Place a module in this drectory named something like  _startup.js to make sure it is run before anything else.

    
    
If you want to use a different prefix, just pass it into the function:

    require('meteor-settings-from-env')('FOO.').do(Meteor.settings)

If you use this approach, you can still use a settings file, and not set any METEOR_ environment variables. Your development flow will be unchanged.
