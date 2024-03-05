function toCamelCase(input) {
    if (typeof input !== "string") return input;
    return input
        .toLowerCase()
        .replace(/[-_]+(.)/g, (_, char) => char.toUpperCase())
        .replace(/[^a-zA-Z0-9]+(.)/g, (_, char) => char.toUpperCase())
        .replace(/^./, firstChar => firstChar.toLowerCase());
}

function toHyphenatedLowerCase(input) {
    if (typeof input !== "string") return input;
    return input
        .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
        .toLowerCase();
}