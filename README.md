## Example File Syncing Plugin

This is an example Obsidian plugin with a naïve implementation of uni-directional syncing between a remote server and a local Obsidian file. This is for demonstration purposes and probable shouldn't be used as-is.
**This example comes with no guaruntees! Please don't use it on a file you'd be sad if the data was lost**

### Installation

To install the example:
0. made sure you have npm and node installed
1. run `npm install`
2. run `npm run build`
3. create a folder in `$YOUR_VAULT/.obsidian/plugins/` call is `example-file-sync` or whatever you'd like
4. copy `main.js` and `manifest.json` into the created folder
5. add a file to your obsidian vault with the title 'test'
6. Enable the plugin in the Community Plugins settings

### What this plugin does
**Read `main.ts` before you do anything!!**

This plugin reads a file from a Glitch server: https://example-obsidian-file-syncing.glitch.me/test.md
It compares the contents of that file with a file in your obsidian vault: "test.md"

If the two files are different, it replaces the contents of the local file with the contents of the file on the server.

### Making it your own

1. You'll want to Remix the Glitch project: https://glitch.com/edit/#!/example-obsidian-file-syncing
2. Once you have your own Glitch project, you can change the contents of "test.md" or add any other file to the `/files` folder.
3. Update `main.ts` to point to your Glitch project.
4. update `const fileName` to be the name of the obsidian file you'd like to be synced.

### How you could extend this

1. You could make the sync bi-directional so that changes to the local file are pushed to the server.
2. You could write to the server file from some kind of API and it would be synced to your local file.
3. Honestly, this is just an idea! Use it to build any kind of connector to another REST API or whatevs.

### b-b-b-bonus

The Glitch server includes a GET endpoint that will append content to the 'test.md' file. This is an example of how you might write content to the file server-side which is then synced locally.

example: https://example-obsidian-file-syncing.glitch.me/write?content=hello%20world

I suggest reading up on REST API structure (normally this would be a POST request, but I'm using GET so it can easily be run in the browser.)
