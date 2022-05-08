
import userCreated from "./events/userCreated"
import userDeleted from "./events/userDeleted"
import categoryCreated from "./events/categoryCreated"
import categoryUpdated from "./events/categoryUpdated"
import categoryDeleted from "./events/categoryDeleted"

export default {
    userCreated,
    userDeleted,
    categoryCreated,
    categoryUpdated,
    categoryDeleted,
} as const