import React from "react";
import { Formik } from 'formik'
import '../assets/css/main.css'
import * as Yup from "yup";
import img from '../assets/images/image.jpg'
import logo from '../assets/images/goosen_logo.png'

let LoginSchema = Yup.object({
    password: Yup.string()
        .min(8, 'Password is too short')
        .required('Please enter your password'),
    email: Yup.string().email('Invalid email address').required('Email address required'),

});
export default class Login extends React.Component {


    login = async (body) => {
        try {
            let res = await fetch('https://medicaly-internship-api.herokuapp.com/login ', {
                method: 'post',
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(body)
            })
            if (res.status === 200) {
                let resdata = await res.json()
                console.log(resdata)
                alert(JSON.stringify(resdata))
            } else {
                // handle it
            }
        } catch (err) {
            console.log(err)
        }
    }

    render() {
        return (
            <div className='main'>
                <div className='form'>
                    <Formik
                        initialValues={{ email: '', password: '' }}
                        validationSchema={LoginSchema}
                        onSubmit={async (values, { setSubmitting }) => {
                            await this.login(values)
                            setSubmitting(false);
                        }}
                    >
                        {({
                            values,
                            errors,
                            touched,
                            handleChange,
                            handleBlur,
                            handleSubmit,
                            isSubmitting,
                        }) => (

                            <form onSubmit={handleSubmit}>
                                <img src={logo} alt='logo' />
                                <p>Email/Username</p>
                                <input
                                    type="email"
                                    name="email"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.email}
                                    placeholder='example@tld.com'
                                // focus={true}
                                />
                                <p className='errorMessage'>{errors.email && touched.email && errors.email}</p>
                                <br />

                                <p>Password</p>
                                <input
                                    type="password"
                                    name="password"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.password}
                                    placeholder='܁܁܁܁܁܁܁܁܁܁܁'
                                />
                                <p className='errorMessage'>{errors.password && touched.password && errors.password}</p>
                                <br />

                                <div className='remMeBox'>
                                    <div>
                                        <input type='checkbox' />
                                        <span>Remember me</span>
                                    </div>
                                    <a href='#'><span>Forgot password</span></a>
                                </div>

                                <button disabled={isSubmitting}>Login</button>
                            </form>

                        )}

                    </Formik>

                    <div className='help'>?</div>
                </div>
                <div className='image'>
                    <img src={img} alt='pic of boy' />
                </div>
            </div>
        )
    }
}