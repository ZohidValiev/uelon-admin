
import _Pagination from "react-js-pagination"
import Icon from "./Icon"
import styles from "@/styles/Pagination.module.css"


function Pagination({ activePage, itemsCountPerPage, totalItemsCount, pageRangeDisplayed, onChange }) {

    return (
        <_Pagination 
            activePage={activePage}
            itemsCountPerPage={itemsCountPerPage}
            totalItemsCount={totalItemsCount}
            pageRangeDisplayed={pageRangeDisplayed}
            onChange={onChange}
            disabledClass={styles.pagination__item_disabled}
            innerClass={styles.pagination}
            itemClass={styles.pagination__item}
            activeClass={styles.pagination__item_active}
            linkClass={styles.pagination__link}
            activeLinkClass={styles.pagination__link_active}
            firstPageText={
                <Icon id="triangleLeft" title="Первый"/>
            }
            prevPageText={
                <Icon id="chevronLeft" title="Назад" />
            }
            nextPageText={
                <Icon id="chevronRight" title="Вперед" />
            }
            lastPageText={
                <Icon id="triangleRight" title="Последний"/>
            }
        />
    )
}

export default Pagination