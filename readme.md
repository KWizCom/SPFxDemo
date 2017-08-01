[Read more and comment on my blog...](https://kwizcom.blogspot.ca/2017/08/spfx-isv-insight-to-microsofts-latest.html)

# Code demo key points:

1. The demo has 4 projects:
* KODemo
* ReactDemo
* SharedCode
* kwizcom-license
1. Two SPFx projects, one using Knockout and the other using React to render. One local package, and one local folder with some code.
1. check our laungh.json for debug settings. 4 configurations, 2 for each project.

# Initial Setup
1. run npm install on all root folders
1. Go to "SharedCode" folder, run:
```
    npm install @microsoft/sp-core-library@~1.1.0
    npm install @microsoft/sp-webpart-base@~1.1.1
```

# KODemo
Contains an SPFx WebPart using Knockout to render the UI.
It uses SharedCode directly from a relative path, bundled into the WebPart.
It included kwizcom-license npm package, and bundles it as well.
Cannot run on local workbench since it connects to Microsoft Graph API.

# ReactDemo
Contains an SPFx WebPart using React to render the UI.
It uses SharedCode directly from a relative path, bundled into the WebPart.
It included kwizcom-license npm package, loading it as an external package from CDN: 
https://kwizcom.sharepoint.com/SITES/S/CDN/License.js

## Custom property
The react demo has a custom property sample featuring a color picker.

## Multiple web part definitions
See ReactWebPartWebPart.manifest.json for preconfiguredEntries, a second instance with different default properties was added.

# SharedCode
This is just a folder with some code we want to share.
We include tsconfig.json since we want to work with TypeScript.
run npm install to get the packages we need. Since there is no package.json file -
```
    npm install @microsoft/sp-core-library@~1.1.0
    npm install @microsoft/sp-webpart-base@~1.1.1
```
run tsc when you want to build the JS files after updating the TypeScript.
    note: I cannot get rid of the type mismatch error. have to send variables as type any.

# kwizcom-license
This simulates a folder that it its own npm package.
We run npm init to create a package, and keep versioning updates.
We add it to our other web parts as packages in hte package.json dependencies, using a local relative folder path:
    "kwizcom-license": "file:../kwizcom-license"
and use npm install and npm update to add it.
This package published the output JS file to a CDN:
https://kwizcom.sharepoint.com/SITES/S/CDN/License.js
and can be loaded as an external (and not bundled)
