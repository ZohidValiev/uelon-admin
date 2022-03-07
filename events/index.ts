
export * as UserEvent from "./users"
export * as CategoryEvent from "./categories"

export function createEventAlias(event: string, alias: string = ""): string {
    return event + "." + alias
}