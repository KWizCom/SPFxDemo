# Updates

## File name hash
There has been a report that Microsoft included a flag in later builds of the SPFx that should allow removing the hash from the bundle file name during release builds.
I have yet to confirm that, since updating the SPFx version on an existing project is not a simple task, but regardless it seems this does not provide a way to include the package version in the file name.

Read more about it here: https://kwizcom.blogspot.ca/2017/10/removing-hash-from-spfx-bundle-file-name.html


Update: I can confirm the new version does allow you to drop the hash in the bundle JS file, but previous customization of the build that allowed me to append the version number now do not work.

It seems impossible now to modify the file name in the bundle manually, and changing the file name in the config is the only way that works. Alas, it does not allow for "." in the bundle file name...


## Update SPFx to 1.4.0
Updating the react demo to run on 1.4.0 while the KO demo still runs on 1.1.0
Read more about the upgrade experience:
https://kwizcom.blogspot.ca/2018/04/upgrading-spfx-react-from-110-to-140.html

Note regarding external packages:
Since I want to use them in both web parts, and they each use a different build of SPFx - gulp will not be able to compile the shared packages as they were before.
I now must remove any dependency to SPFx modules if I want to use the packages in both projects.
This makes sharing code beween projects a bit more complicated, and would perhaps cause us to either duplicate the code, or simply share the TS files of our common-code.
This definitly requires more research.
The sharedcode, however, shows that I can reuse the code but will have to replace the npm packages to match the version used by my web part. See "readme.md" for more info, and comments in Utilities.ts regarding how to handle a breaking change.
Alternativly, we could publish kwizcom-license in 2 different build versions, each with the correct dependencies on SPFx. Then set the dependency in each SPFx project to the right version. (1.0.0 built with SPFx 1.1.0 and 2.0.0 built with 1.4.0 for example)