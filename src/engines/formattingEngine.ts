export function escapePattern (pattern: string): string {
    return pattern.replace(/[-\/\\^$*+?.()|[\]{}]/g, '\\$&')
}