
export * as UserEvent from "./users"

export function createEventAlias(event: string, alias: string = ""): string {
    return event + "." + alias
}