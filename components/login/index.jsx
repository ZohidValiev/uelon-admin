import React, { Component } from 'react'
import { withRouter } from 'next/router'
import axios from 'axios'
import BlockYellow from '@/components/block/BlockYellow'
import LoginForm from '@/components/login/LoginForm'
import styles from '@/components/login/Login.module.css'
import Validator from '../../utils/validator/index.js'

class Login extends Component
{
    constructor(props)
    {
        super(props);
        this.state = {
            isSubmited: false,
            values: {
                username: '',
                password: '',
            },
            errorUsername: '',
            errorPassword: '',
        };

        this.validator = new Validator()
        this.validator
            .setValues({
                username: () => {
                    return this.state.values.username 
                },
                password: () => {
                    return this.state.values.password
                }
            })
            .setRules({
                username: {
                    notEmpty: {
                        message: 'Пожалуйста введите email'
                    },
                    email: {
                        message: 'Пожалуйста введите правильный email'
                    }
                },
                password: {
                    notEmpty: {
                        message: 'Пожалуйста введите пароль'
                    },
                    string: {
                        length: [7, 20],
                        tooShort: 'Пароль должен содержать минимум {min} символов',
                        tooLong: 'Пароль должен содержать максимум {max} символов',
                    }
                }
            })
    }

    handleChange = (e) => {
        const target = e.target
        this.setState((prevState) => {
            return {
                values: {
                    ...prevState.values,
                    [target.name]: target.value,
                }
            }
        })
    }

    handleSubmit = async (e) => {
        e.preventDefault()

        let errorUsername = ''
        let errorPassword = ''

        if (!this.validator.validate()) {
            errorUsername = this.validator.getFirstError('username') ?? ''
            errorPassword = this.validator.getFirstError('password') ?? ''

            this.setState({
                errorUsername,
                errorPassword,
            });

            return
        }

        this.setState({
            isSubmitted: true,
            errorUsername,
            errorPassword,
        }, async () => {
            try {
                const response = await axios.post(
                    'http://localhost:8000/api/admin/login_check', 
                    {
                        ...this.state.values
                    },
                    {
                        withCredentials: true,
                        timeout: 600000,
                    })
                console.log(response.data)
            } catch (error) {
                console.log(error)
            }
    
            this.setState({
                isSubmitted: false,
            })
        })
    }

    render()
    {
        const errors = {
            username: this.state.errorUsername,
            password: this.state.errorPassword,
        }
        const { isSubmitted } = this.state

        return (
            <div className="block block_bg-yellow block_with-border block_with-border-radius" 
                 style={{ width: '38rem', minHeight: '46.8rem'}}>
                <div className={styles.login}>
                    <div className={styles.login__header}>
                        <span className={styles.login__title}>Войти</span>
                    </div>
                    <div className={styles.login__body}>
                        <div className={styles.login__text}>Добро пожаловать</div>
                        <LoginForm handleChange={this.handleChange} 
                                   handleSubmit={this.handleSubmit}
                                   values={this.state.values}
                                   errors={errors}
                                   isSubmitted={isSubmitted}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Login)