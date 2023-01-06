const NOT_MEANINGFUL_ARG_COUNT = 2;
const FIRST_CHARS_TO_REMOVE_IN_OPTION_NAME = 2;

const parseArgs = () => {
    const meaningfulArguments = process.argv.slice(NOT_MEANINGFUL_ARG_COUNT);

    const optionsWithValues = collectOptions(meaningfulArguments);

    printOptions(optionsWithValues);
};

const collectOptions = (meaningfulArguments) => {
    const optionsWithValues = {};
    let previousOption = null;

    for (const currentArgument of meaningfulArguments) {
        // if arguments starts with `--, we treat it as Option with the value as a next argument
        if (currentArgument.startsWith('--')) {
            previousOption = currentArgument.slice(FIRST_CHARS_TO_REMOVE_IN_OPTION_NAME);
        } else if (previousOption !== null) {
            optionsWithValues[previousOption] = currentArgument;
            previousOption = null;
        }
    }

    return optionsWithValues;
}

const printOptions = (optionsWithValues) => {
    const entries = Object.entries(optionsWithValues);

    if (entries.length === 0) {
        return;
    }

    const optionStrings = [];

    for (const [optionName, optionValue] of entries) {
        optionStrings.push(`${optionName} is ${optionValue}`);
    }

    console.log(optionStrings.join(', '));
}

parseArgs();