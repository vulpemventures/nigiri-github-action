const core = require('@actions/core');
const exec = require('@actions/exec');
const tc = require('@actions/tool-cache');
const io = require('@actions/io');

const path = require('path');


async function run() {

  try {
    let version = core.getInput('version');
    let repository = core.getInput('repository_url');


    core.info(`Installing Nigiri     ${version}`);
    core.info(`Repository URL        ${repository}`);

    const name = "nigiri";
    const downloadURL = !version || version === "latest" ?
      `${repository}/releases/latest/download/nigiri-linux-amd64` :
      `${repository}/releases/download/${version}/nigiri-linux-amd64`;

    let cachedPath = tc.find(name, version)
    if (!cachedPath) {
      core.addPath(cachedPath)

      core.info(`Fetching from ${downloadURL}`)
      const downloadPath = await tc.downloadTool(downloadURL);
      cachedPath = await tc.cacheFile(downloadPath, name, name, version);

      core.addPath(cachedPath)
    }
    core.info(`🍣 Nigiri Bitcoin installed`);

    const filePath = path.join(cachedPath, name);

    core.info(`Setting binary permissions...`);
    await exec.exec("chmod", ["+rwx", filePath]);

    const dataDir = "/home/runner/.nigiri";

    core.info(`Creating ~/.nigiri folder...`);
    await io.mkdirP(dataDir);

    core.info(`Check Nigiri version...`);
    await exec.exec(filePath, ["version"]);

    core.info(`Setting ~/.nigiri permissions...`);
    await exec.exec("chmod", ["-R", "777", dataDir]);

    core.info(`Running Nigiri...`);
    await exec.exec(filePath, ["start", "--liquid", "--ci"]);

  } catch (error) {
    core.setFailed(error.message);
  }
}


run();
