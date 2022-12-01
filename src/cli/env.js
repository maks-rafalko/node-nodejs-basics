const parseEnv = () => {
    const rssEnvVariables = [];

    for (const [envVarName, envVarValue] of Object.entries(process.env)) {
        if (envVarName.startsWith('RSS_')) {
            rssEnvVariables.push(`${envVarName}=${envVarValue}`);
        }
    }

    console.log(rssEnvVariables.join('; '));
};

parseEnv();