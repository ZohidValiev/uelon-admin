
import userCreated from "./events/userCreated"
import categoryCreated from "./events/categoryCreated"
import categoryUpdated from "./events/categoryUpdated"
import categoryDeleted from "./events/categoryDeleted"

export default {
    userCreated,
    categoryCreated,
    categoryUpdated,
    categoryDeleted,
} as const