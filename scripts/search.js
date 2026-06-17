export function compileRegex(pattern, caseInsensitive) {
    try {
        const flags = caseInsensitive ? "i" : "";
        return pattern ? new RegExp(pattern, flags) : null;
    } catch {
        return null;
    }
}