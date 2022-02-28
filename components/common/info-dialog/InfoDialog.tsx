
import { Portal } from "@/components/hoc"
import { Dialog } from "@/components/dialog"
import { observer } from "mobx-react"
import store from "@/stores/InfoDialogStore"


const InfoDialog = observer(() => {

    if (!store.visible) {
        return null
    }

    const buttons = [
        {
            value: "Закрыть",
            onClick: () => {
                store.close()
            }
        }
    ]

    return (
        <Portal>
            <Dialog type={store.type} title={store.title} buttons={buttons} >
                {store.content}
            </Dialog>
        </Portal>
    )
})

export default InfoDialog