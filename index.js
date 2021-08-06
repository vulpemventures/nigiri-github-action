const core = require('@actions/core');
const exec = require('@actions/exec');
const tc = require('@actions/tool-cache');



async function run() {

  try {
    let version = core.getInput('version');
    let repository = core.getInput('repository');


    core.info(`Installing Nigiri     ${version}`);
    core.info(`Repository            ${repository}`);

    const name = "nigiri"
    const downloadURL = `${repository}/releases/download/${version}/nigiri-linux-amd64`;

    let cachedPath = tc.find(name, version)
    if (!cachedPath) {
      core.addPath(cachedPath)

      core.info(`Fetching from ${downloadURL}...`)
      await tc.downloadTool(downloadURL);

      cachedPath = await tc.cacheFile(name, name, name, version);
      core.addPath(cachedPath)
    }


    core.info(`Setting binary permissions...`);
    await exec.exec("chmod", ["+x", cachedPath]);

    core.info(`🍣 Nigiri Bitcoin installed`);

    core.info(`Running Nigiri...`);
    await exec.exec(cachedPath, ["start", "--liquid", "--ci"]);

  } catch (error) {
    core.setFailed(error.message);
  }
}


run();
