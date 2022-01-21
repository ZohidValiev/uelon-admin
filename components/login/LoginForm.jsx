
import styles from './LoginForm.module.css'

export default function LoginForm({ handleChange, handleSubmit, values, errors, isSubmitted })
{
    return (
        <form action="#" 
              className={"form " + styles["login-form"]}
              onSubmit={handleSubmit}>
                <div className={"form__row " + (errors.username !== '' ? 'has-errors' : '')}>
                    <label htmlFor="username" 
                           className="form__label">Введите ваш Email адрес:</label>
                    <input type="text" 
                           id="username" 
                           name="username"
                           className={`form__input v-input ${styles["login-form__input"]} ${styles["login-form__input-username"]}`}
                           placeholder="Введите ваш Email адрес"
                           onChange={handleChange}
                           value={values.username}
                           disabled={isSubmitted}/>
                    <div className="invalid">{errors.username}</div>
                </div>
                <div className={"form__row " + (errors.password !== '' ? 'has-errors' : '')}>
                    <label htmlFor="password" 
                           className="form__label">Введите текущий пароль от UELON:</label>
                    <input type="password" 
                           id="password" 
                           name="password"
                           className={`form__input v-input ${styles["login-form__input"]} ${styles["login-form__input-password"]}`} 
                           placeholder="Введите текущий пароль от UELON"
                           onChange={handleChange}
                           value={values.password}
                           disabled={isSubmitted}/>
                    <div className="invalid">{errors.password}</div>
                </div>
                <div className="form__buttons">
                    <input type="submit" 
                           className={`button form__button ${styles["login-form__button"]}`} 
                           value="Войти"
                           disabled={isSubmitted}/>
                </div>
        </form>
    )
}