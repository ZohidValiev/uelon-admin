
import React from "react"
import { withEventManager } from "@/components/hoc"
import * as api from "../../api/categories"
import Validator from "@/utils/validator"
import FormRow from "./FormRow"
import FieldInput from "./FieldInput"
import FieldActive from "./FieldActive"
import styles from "@/styles/CategoryForm.module.css"


class Form extends React.Component
{
    constructor(props) 
    {
        super(props)

        const { category } = props

        this.state = {
            fields: {
                active : category.isActive ? 1 : 0,
                icon: category.icon,
                titleUz: category.translations.UZ.title,
                titleRu: category.translations.RU.title,
            },
            errors: {
                active: '',
                titleUz: '',
                titleRu: '',
            },
            isSubmitted: false,
        }

        this.validator = new Validator()
        this.validator
            .setValues({
                active: () => {
                    return this.state.fields.active
                },
                titleUz: () => {
                    return this.state.fields.titleUz
                },
                titleRu: () => {
                    return this.state.fields.titleRu
                },
            })
            .setRules({
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
                },
                titleRu: {
                    notEmpty: {
                        message: 'Введите значение',
                    },
                },
            })
    }

    onChangeHandler = (e) => 
    {
        this.setState((prevState) => {
            return {
                fields: {
                    ...prevState.fields,
                    [e.target.name]: e.target.value,
                }
            }
        })
    }

    getCategoryTitle(category) {
        let titles = []
        
        for (let translation in category.translations) {
            titles.push(category.translations[translation].title)
        }
    
        return titles.join(" / ")
    }

    onBlurHandler = (e) =>
    {
        const target = e.target
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
                active: this.validator.getFirstError("active"),
                titleUz: this.validator.getFirstError("titleUz"),
                titleRu: this.validator.getFirstError("titleRu"),
            }
        })

        if (!this.validator.hasErrors()) {
            this.setState({
                isSubmitted: true,
            })

            try {
                await this._update()
            } catch (error) {
                return
            } finally {
                this.setState({
                    isSubmitted: false,
                })
            }
        }
    }

    _update = async () => {
        const id = this.props.category.id
        const em = this.props.eventManager
        const fields = this.state.fields
        const data = {
            isActive: fields.active == "1",
            icon:  fields.icon,
            translations: [
                {
                    locale: "UZ",
                    title : fields.titleUz,
                },
                {
                    locale: "RU",
                    title : fields.titleRu,
                },
            ]
        }

        em.trigger("category:before-update")
        try {
            await api.update(id, data)
        } catch (error) {
            em.trigger("category:error-update")
            throw error
        }
        em.trigger("category:after-update")
    }

    render() 
    {
        const LEVEL2 = 2, LEVEL3 = 3
        const { rootCategory, parentCategory, category } = this.props
        const { errors, fields, isSubmitted } = this.state

        return (
            <form className={"form " + styles["category-form"]} onSubmit={this.onSubmitHandler}>
                <fieldset className="form__fieldset" disabled={isSubmitted}>
                    <FormRow>
                        <FieldInput label="Уровень вложенности:"
                                    name="level"
                                    value={`Уровень ${category.level}`}
                                    readOnly={true}/>
                    </FormRow>
                    { [LEVEL2, LEVEL3].includes(category.level) 
                        ? <FormRow>
                            <FieldInput label="Категория уровень 1:"
                                        name="categoryLevel1"
                                        readOnly={true}
                                        value={this.getCategoryTitle(rootCategory ?? parentCategory)}/>
                          </FormRow>
                        : null 
                    }
                    { LEVEL3 === category.level
                        ? <FormRow>
                            <FieldInput label="Категория уровень 2:"
                                        name="categoryLevel2"
                                        readOnly={true}
                                        value={this.getCategoryTitle(parentCategory)}/>
                          </FormRow>
                        : null 
                    }
                    <FormRow error={errors.active}>
                        <FieldActive label="Отображать:"
                                     name="active"
                                     value={fields.active}
                                     onChange={this.onChangeHandler}
                                     onBlur={this.onBlurHandler}/>
                    </FormRow>
                    <FormRow>
                        <FieldInput label="CSS class или id:"
                                    name="icon"
                                    value={fields.icon}
                                    required={false}
                                    onChange={this.onChangeHandler}
                                    onBlur={this.onBlurHandler}/>
                    </FormRow>
                    <FormRow error={errors.titleUz}>
                        <FieldInput label="Название Uz:"
                                    name="titleUz"
                                    value={fields.titleUz}
                                    required={true}
                                    onChange={this.onChangeHandler}
                                    onBlur={this.onBlurHandler}/>
                    </FormRow>
                    <FormRow error={errors.titleRu}>
                        <FieldInput label="Название Ru:"
                                    name="titleRu"
                                    value={fields.titleRu}
                                    required={true}
                                    onChange={this.onChangeHandler}
                                    onBlur={this.onBlurHandler}/>
                    </FormRow>
                    <div className="form__buttons">
                        <button className={"button form__button" + (isSubmitted ? " form__button_is-loading" : "")}>
                            Сохранить
                        </button>
                    </div>
                </fieldset>
            </form>
        )
    }
}

export default withEventManager(Form)