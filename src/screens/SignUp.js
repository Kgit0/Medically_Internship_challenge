import React from "react";
import { Formik } from 'formik'
import '../assets/css/main.css'
import * as Yup from "yup";
import img from '../assets/images/image.jpg'
import logo from '../assets/images/goosen_logo.png'
import {Link} from 'react-router-dom'

Yup.addMethod(Yup.string, "pw_sanitize", function (errorMessage) {
    return this.test(`test-pw`, errorMessage, function (value) {
        const { path, createError } = this;

        let error = ''
        if (value) {
            if (value.length < 8) { error = error + ' tooshort' }
            if (value.match(/.*\d/) == null) { error = error + ' digit' }
            if (value.match(/.*[!@#$%^&()-=+{};:,<.>]{1}/) == null) { error = error + ' symbol' }
            if (value.match(/.*[a-z]{1}/) == null) { error = error + ' lowerCase' }
            if (value.match(/.*[A-Z]{1}/) == null) { error = error + ' upperCase' }
            if (error === '') {
                return (true)
            } else {
                return (createError({ path, message: error }))
            }
        } else {
            return (createError({ path, message: 'tooshort digit symbol lowerCase upperCase' }))
        }
    });
});

let SignupSchema = Yup.object({
    lastName: Yup.string().required('Please enter your last name'),
    otherNames: Yup.string().required('Please enter your other name'),
    address: Yup.string().required('Please enter your address'),
    username: Yup.string().required('Please enter a username'),
    password: Yup.string()
        .pw_sanitize('@'),
    email: Yup.string().email('Invalid email address').required('Email address required'),

});

let Passwordcheck = ({ status, children }) => {
    return (
        <div style={{ display: "flex", flexDirection: 'row', }}>
            <span
                className={status ? 'passwordcheck neg' : 'passwordcheck pos'}
            >{status ? '⨯' : '✓'}</span>
            <span>{children}</span>
        </div>
    )
}
export default class Login extends React.Component {
    register = async (body) => {
        try {
            let res = await fetch('https://medicaly-internship-api.herokuapp.com/signup ', {
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
                <div className='form signUpForm'>
                    <Formik
                        initialValues={{
                            email: '',
                            password: '',
                            lastName: '',
                            otherNames: '',
                            address: '',
                            username: '',
                        }}
                        validationSchema={SignupSchema}
                        onSubmit={async (values, { setSubmitting }) => {
                            await this.register(values)
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
                                <div className='hbar'>
                                    <img src={logo} alt='logo' />
                                    <span className='heading'>Register</span>
                                </div>
                                <div className='hbar'>
                                    <div>
                                        <p>Lastname</p>
                                        <input
                                            type="text"
                                            name="lastName"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.lastName}
                                            placeholder='Lastname'
                                        />
                                        <p className='errorMessage'>{errors.lastName && touched.lastName && errors.lastName}</p>
                                    </div>

                                    <div>

                                        <p>Other names</p>
                                        <input
                                            type="text"
                                            name="otherNames"
                                            onChange={handleChange}
                                            onBlur={handleBlur}
                                            value={values.otherNames}
                                            placeholder='Othernames'
                                        />
                                        <p className='errorMessage'>{errors.otherNames && touched.otherNames && errors.otherNames}</p>
                                    </div>
                                    <br />
                                </div>

                                <p>Email</p>
                                <input
                                    type="email"
                                    name="email"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.email}
                                    placeholder='example@tld.com'
                                />
                                <p className='errorMessage'>{errors.email && touched.email && errors.email}</p>
                                <br />

                                <p>Address</p>
                                <input
                                    type="text"
                                    name="address"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.address}
                                    placeholder='where do you live?'
                                />
                                <p className='errorMessage'>{errors.address && touched.address && errors.address}</p>
                                <br />

                                <p>City/town</p>
                                <input
                                    type="text"
                                    name="city_town"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.city_town}
                                    placeholder='ex. Lagos'
                                />
                                <p className='errorMessage'>{errors.city_town && touched.city_town && errors.city_town}</p>
                                <br />

                                <p>Username</p>
                                <input
                                    type="text"
                                    name="username"
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    value={values.username}
                                    placeholder='Username'
                                />
                                <p className='errorMessage'>{errors.username && touched.username && errors.username}</p>
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
                                {/* <p className='errorMessage'>{errors.password && touched.password && errors.password}</p> */}
                                <br />
                                <Passwordcheck status={errors.password && errors.password.includes('tooshort')}>Password must be at least 8 characters long</Passwordcheck>
                                <Passwordcheck status={errors.password && errors.password.includes('digit')}>Password must contain at least one digit</Passwordcheck>
                                <Passwordcheck status={errors.password && errors.password.includes('symbol')}>Password must contain at least one symbol</Passwordcheck>
                                <Passwordcheck status={errors.password && errors.password.includes('lowerCase')}>Password must contain at least one LOWERCASE letter</Passwordcheck>
                                <Passwordcheck status={errors.password && errors.password.includes('upperCase')}>Password must contain at least one UPPERCASE letter</Passwordcheck>
                                <br />

                                <div className='remMeBox'>
                                    <div>
                                        <input type='checkbox' />
                                        <span>Accept Terms and Conditions</span>
                                    </div>
                                    <span style={{fontSize:'20px'}}>|</span>
                                    <Link to='/login'><span>Already have an account? Signin</span></Link>
                                </div>

                                <button disabled={isSubmitting}>Register</button>
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