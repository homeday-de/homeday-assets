const { exec } = require('child_process');

const SEMANTIC_VERION_TYPE = {
  MAJOR: {
    name: 'major',
    gitmoji: ':boom:',
  },
  MINOR: {
    name: 'minor',
    gitmoji: ':sparkles:',
  },
  PATCH: {
    name: 'patch',
    gitmoji: ':bento:',
  },
};

pushChanges();

async function pushChanges() {
  await stageChanges();
  const commitMessage = await getCommitMessage();

  if (commitMessage !== null) {
    await commitChanges(commitMessage);
    await pushToMaster();
  } else {
    console.log('No changes to push');
  }
}

function stageChanges() {
  return execPromise('git add -A');
}

async function commitChanges(message) {
  const userName = await getUserName();
  let finalCommitMessage = message;

  if (!userName) {
    await setActionBotUser();

    finalCommitMessage = `${finalCommitMessage} | Triggered by: ${process.env.TRIGGERED_BY}`;
  }

  return execPromise(`git commit -m "${finalCommitMessage}"`);
}

async function setActionBotUser() {
  execPromise(
    'git config --local user.email "41898282+github-actions[bot]@users.noreply.github.com"'
  );
  execPromise('git config --local user.name "github-actions[bot]"');
}

async function pushToMaster() {
  return execPromise('git push origin master');
}

async function getCommitMessage() {
  const semanticVersionType = await getSemanticVersionType();

  return semanticVersionType !== null
    ? `${semanticVersionType.gitmoji} Auto-sync with the Figma library`
    : null;
}

async function getSemanticVersionType() {
  const changesString = await execPromise('git status --porcelain');
  let changes = changesString.split('\n');
  console.log('changes', changes);

  // It's a major if an asset was deleted, renamed or moved
  const isMajor = changes.some(
    (change) => change.startsWith('D  ') || change.startsWith('R  ')
  );
  if (isMajor) {
    return SEMANTIC_VERION_TYPE.MAJOR;
  }
  // it's a minor if a new asset was added
  const isMinor = changes.some((change) => change.startsWith('A  '));
  if (isMinor) {
    return SEMANTIC_VERION_TYPE.MINOR;
  }

  // it's a patch if an asset was modified
  const isPatch = changes.some((change) => change.startsWith('M  '));
  if (isPatch) {
    return SEMANTIC_VERION_TYPE.PATCH;
  }

  return null;
}

async function getUserName() {
  return execPromise('git config user.name');
}

async function getTriggerer() {
  const githubUsername = await execPromise('git config user.name');
  console.log('github user.name', githubUsername);
  const triggeredBy = process.env.TRIGGERED_BY || githubUsername;
  return triggeredBy;
}

function execPromise(command) {
  return new Promise(function (resolve, reject) {
    exec(command, (error, stdout) => {
      if (error) {
        reject(error);
        return;
      }

      resolve(stdout.trim());
    });
  });
}
