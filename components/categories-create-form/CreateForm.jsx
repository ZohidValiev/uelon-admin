
import React from "react"
import * as api from "../../api/categories.js"
import Validator from "@/utils/validator"
import { withEventManager } from "@/components/hoc"
//import FormRow from "./FormRow"
import { FormRow } from "@/components/form"
import FieldLevel from "./FieldLevel"
import FieldSelectCategory from "./FieldSelectCategory"
import FieldInput from "./FieldInput"
import FieldActive from "./FieldActive"
import styles from "@/styles/CategoryForm.module.css"


const LEVEL1 = '1'
const LEVEL2 = '2'
const LEVEL3 = '3'

class CreateForm extends React.Component 
{
    constructor(props)
    {
        super(props)
        this.state = {
            // form data
            level: 1,
            active: 1,
            titleUz: '',
            titleRu: '',
            categoryLevel1: '',
            categoryLevel2: '',
            // form fields state
            isLoadingCategoryLevel1: false,
            categoriesLevel1: [],
            isLoadingCategoryLevel2: false,
            categoriesLevel2: [],
            // errors
            errors: {
                level: '',
                active: '',
                categoryLevel1: '',
                categoryLevel2: '',
                titleUz: '',
                titleRu: '',
            },
            isSubmitted: false,
        }

        this.validator = new Validator()
        this.validator  
            .setValues({
                level: () => {
                    return this.state.level
                },
                active: () => {
                    return this.state.active
                },
                titleUz: () => {
                    return this.state.titleUz
                },
                titleRu: () => {
                    return this.state.titleRu
                },
            })
            .setRules({
                level: {
                    notEmpty: {
                        message: 'Выберите значение',
                    }
                },
                active: {
                    notEmpty: {
                        message: 'Выберите значение',
                    },
                    boolean: {
                        message: 'Значение должно быть либо {true} либо {false}',
                    },
                },
                titleUz: {
                    notEmpty: {
                        message: 'Введите значение',
                    },
                    string: {
                        max: 20,
                        tooLong: 'Введите не более 20 символов',
                    },
                },
                titleRu: {
                    notEmpty: {
                        message: 'Введите значение',
                    },
                    string: {
                        max: 20,
                        tooLong: 'Введите не более 20 символов',
                    },
                }
            })
    }

    onChangeLevelHandler = (e) =>
    {
        this.setState({
            level: e.target.value,
            categoriesLevel1: [],
            categoriesLevel2: [],
        }, async () => {
            
            const { level } = this.state

            this.validator.deleteProperties('categoryLevel1', 'categoryLevel2')

            if (level === LEVEL1) {
                return
            }

            if ([LEVEL2, LEVEL3].includes(level)) {
                this.validator
                    .setValue('categoryLevel1', () => {
                        return this.state.categoryLevel1
                    })
                    .setRule('categoryLevel1', {
                        notEmpty: {
                            message: 'Выберите значение'
                        },
                    })

                if (level === LEVEL3) {
                    this.validator
                        .setValue('categoryLevel2', () => {
                            return this.state.categoryLevel2
                        })
                        .setRule('categoryLevel2', {
                            notEmpty: {
                                message: 'Выберите значение'
                            },
                        })
                }
            }

            this.setState((prevState) => {
                return {
                    isLoadingCategoryLevel1: true,
                    categoriesLevel1: [],
                    errors: {
                        ...prevState.errors,
                        categoryLevel1: '',
                        categoryLevel2: '',
                    }
                }
            })

            const categoriesLevel1 = await this._loadCategoriesLevel1()
            
            this.setState({
                isLoadingCategoryLevel1: false,
                categoriesLevel1,
            })
        })
    }

    onChangeCateogryLevel1Handler = (e) =>
    {
        this.setState({
            categoryLevel1: e.target.value,
        }, async () => {
            const { level, categoryLevel1 } = this.state

            if (level === LEVEL2) {
                return
            }

            if (level === LEVEL3 && categoryLevel1 === '') {
                this.setState({
                    categoriesLevel2: [],
                })
                return
            }

            this.setState({
                isLoadingCategoryLevel2: true,
                categoriesLevel2: [],
            })

            const categoriesLevel2 = await this._loadCategoriesLevel2(categoryLevel1)

            this.setState({
                isLoadingCategoryLevel2: false,
                categoriesLevel2,
            })
        })
    }

    onChangeHandler = (e) => 
    {
        const target = e.target
        this.setState({
            [target.name]: target.value,
        })
    }

    onBlurHandler = (e) =>
    {
        const target = e.target
        
        // if (!this.validator.hasProperty(target.name)) {
        //     return
        // }

        this.validator.validate(target.name)
        this.setState((prevState) => {
            return {
                errors: {
                    ...prevState.errors,
                    [target.name]: this.validator.getFirstError(target.name)
                }
            }
        })
    }

    onSubmitHandler = async (e) => 
    {
        e.preventDefault()

        this.validator.validate()
        this.setState({
            errors: {
                level: this.validator.getFirstError('level') ?? '',
                active: this.validator.getFirstError('active') ?? '',
                categoryLevel1: this.validator.getFirstError('categoryLevel1') ?? '',
                categoryLevel2: this.validator.getFirstError('categoryLevel2') ?? '',
                titleUz: this.validator.getFirstError('titleUz') ?? '',
                titleRu: this.validator.getFirstError('titleRu') ?? '',
            }
        })

        if (!this.validator.hasErrors()) {
            this.setState({
                isSubmitted: true,
            })

            try {
                await this._create()    
            } catch (error) {
                return   
            } finally {
                this.setState({
                    isSubmitted: false,
                })
            }
            
            this._resetForm()
        }
    }

    _create = async () =>
    {
        const {
            level,
            active,
            categoryLevel1,
            categoryLevel2,
            titleUz,
            titleRu,
        } = this.state

        let data = {
            title: titleRu,
            isActive: active === "1",
            parentId: null,
            translations: [
                {
                    locale: "UZ",
                    title: titleUz,
                },
                {
                    locale: "RU",
                    title: titleRu,
                },
            ]
        }

        if (level === LEVEL2) {
            data.parentId = categoryLevel1
        } else if (level === LEVEL3) {
            data.parentId = categoryLevel2
        }

        const em = this.props.eventManager

        em.trigger("category:before-create")
        try {
            await api.create(data)    
        } catch (error) {
            em.trigger("category:error-create")
            throw error
        }
        em.trigger("category:after-create")
    }

    _loadCategoriesLevel1 = async () => 
    {
        const response = await api.loadCategoriesLevel1()
        return response.data["hydra:member"]
    }

    _loadCategoriesLevel2 = async (parentCategoryId) => 
    {
        const response = await api.loadCategoriesLevel2(parentCategoryId)
        return response.data["hydra:member"]
    }

    _resetForm = ()=>
    {
        const { level } = this.state
        const fields = {
            active: 1,
            categoryLevel1: '',
            categoryLevel2: '',
            titleUz: '',
            titleRu: '',
        }

        if (level == 1) {
            this.setState({
                ...fields,
                categoriesLevel1: [],
                categoriesLevel2: [],
            })
        } else {
            this.setState({
                ...fields,
                categoriesLevel2: [],
            })    
        }
    }

    render()
    {
        const { 
            level, 
            active,
            categoryLevel1,
            categoryLevel2,
            titleUz,
            titleRu,
            categoriesLevel1, 
            isLoadingCategoryLevel1,
            categoriesLevel2, 
            isLoadingCategoryLevel2,
            errors,
            isSubmitted,
        } = this.state

        return (
            <form className={`form ${styles['category-form']}`} onSubmit={this.onSubmitHandler}>
                <FormRow error={errors.level}>
                    <FieldLevel value={level}
                                onChange={this.onChangeLevelHandler}
                                onBlur={this.onBlurHandler}
                                disabled={isSubmitted} />
                </FormRow>
                { [LEVEL2, LEVEL3].includes(level) ? (
                    <FormRow error={errors.categoryLevel1}>
                        <FieldSelectCategory label="Категория уровень 1:" 
                                             name="categoryLevel1" 
                                             value={categoryLevel1}
                                             categories={categoriesLevel1}
                                             isLoading={isLoadingCategoryLevel1}
                                             disabled={isSubmitted}
                                             onBlur={this.onBlurHandler}
                                             onChange={this.onChangeCateogryLevel1Handler} />
                    </FormRow>
                ) : null }
                { level === LEVEL3 ? (
                    <FormRow error={errors.categoryLevel2}>
                        <FieldSelectCategory label="Категория уровень 2:" 
                                             name="categoryLevel2"
                                             value={categoryLevel2} 
                                             categories={categoriesLevel2}
                                             isLoading={isLoadingCategoryLevel2}
                                             disabled={isSubmitted}
                                             onBlur={this.onBlurHandler}
                                             onChange={this.onChangeHandler} />
                    </FormRow>
                ) : null }
                <FormRow 
                    error={errors.active}
                    horizontal={true}
                >
                    <FieldActive 
                        label="Отображать:"
                        name="active"
                        value={active}
                        disabled={isSubmitted}
                        onBlur={this.onBlurHandler}
                        onChange={this.onChangeHandler}
                        horizontal={true}
                    />
                </FormRow>
                <FormRow error={errors.titleUz}>
                    <FieldInput label="Название Uz:" 
                                name="titleUz" 
                                value={titleUz}
                                disabled={isSubmitted}
                                onBlur={this.onBlurHandler}
                                onChange={this.onChangeHandler} />
                </FormRow>
                <FormRow error={errors.titleRu}>
                    <FieldInput label="Название Ru:" 
                                name="titleRu"
                                value={titleRu} 
                                disabled={isSubmitted}
                                onBlur={this.onBlurHandler}
                                onChange={this.onChangeHandler} />
                </FormRow>
                <div className="form__buttons">
                    <button className={"button form__button" + (isSubmitted ? " form__button_is-loading" : "")}
                            disabled={isSubmitted}>Создать</button>
                </div>
            </form>
        )
    }
}

export default withEventManager(CreateForm)