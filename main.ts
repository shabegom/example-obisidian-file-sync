import Diff from "diff";
import { App, Notice, Plugin } from "obsidian";

const fileName = "test";

export default class MyPlugin extends Plugin {
  async onload() {
    console.log("loading plugin");
    await processFiles(this.app);
    //run the diffing every 10 seconds, in reality you'll want this to be much longer
    this.registerInterval(
      window.setInterval(() => {
        console.log("running interval");
        processFiles(this.app);
      }, 10000)
    );
  }

  onunload() {
    console.log("unloading plugin");
  }
}

// This function fetches a file from the Glitch Server
async function fetchServerFile(fileName: string) {
  return await fetch(
    `https://example-obsidian-file-syncing.glitch.me/${fileName}.md`
  )
    .then(res => res.text())
    .catch(() => {
      new Notice(`couldn't find the server file`, 2000);
      return "";
    });
}

// This function fetches the file on the disk
async function fetchLocalFile(app: App, fileName: string) {
  const files = app.vault.getFiles();
  const match = files.filter(file => file.basename === fileName);
  if (match[0]) {
    return await app.vault.read(match[0]);
  } else {
    new Notice(`couldn't find the local file`, 2000);
  }
  return "";
}

// This function runs a diff between the file on disk and the server file to see
// if there are changes. If there are it returns true
function diffFiles(localFile: string, serverFile: string) {
  let diff = Diff.diffLines(localFile, serverFile);
  if (diff.length > 1) {
    return true;
  } else {
    return false;
  }
}

// This function will replace the data of the localFile with the data in the server hosted file this has a lot of repition with fetchLocalFile, but is made it's own function for example purposes
async function replaceLocalFile(
  app: App,
  fileName: string,
  replaceWith: string
) {
  const files = app.vault.getFiles();
  const match = files.filter(file => file.basename === fileName);
  if (match[0]) {
    return await app.vault.modify(match[0], replaceWith);
  } else {
    new Notice(`couldn't find the local file`, 2000);
  }
  return "";
}

// lets put all this together into a function that grabs the local and server file and if there are differences, replaces the local with the server
async function processFiles(app: App) {
  let serverFile = await fetchServerFile(fileName);
  let localFile = await fetchLocalFile(app, fileName);
  let initialDiff = diffFiles(localFile, serverFile);
  if (initialDiff) {
    await replaceLocalFile(app, fileName, serverFile);
  } else {
    new Notice("the files are the same!", 2000);
  }
}
