# Updates

## File name hash
There has been a report that Microsoft included a flag in later builds of the SPFx that should allow removing the hash from the bundle file name during release builds.
I have yet to confirm that, since updating the SPFx version on an existing project is not a simple task, but regardless it seems this does not provide a way to include the package version in the file name.

Read more about it here: https://kwizcom.blogspot.ca/2017/10/removing-hash-from-spfx-bundle-file-name.html


Update: I can confirm the new version does allow you to drop the hash in the bundle JS file, but previous customization of the build that allowed me to append the version number now do not work.

It seems impossible now to modify the file name in the bundle manually, and changing the file name in the config is the only way that works. Alas, it does not allow for "." in the bundle file name...


## Update SPFx to 1.4.0
Updating the react demo to run on 1.4.0 while the KO demo still runs on 1.1.0