import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner';
import * as actions from '../../store/actions/index';

import classes from './Auth.module.css';

const Auth = props => {
    const [authForm, setAuthForm] = useState({
        email: {
            elementType: 'input',
            elementConfig: {
                type: 'email',
                placeholder: 'Mail Adress'
            },
            value: '',
            validation: {
                required: true,
                isEmail: true
            },
            valid: false,
            touched: false
        },
        password: {
            elementType: 'input',
            elementConfig: {
                type: 'password',
                placeholder: 'Password'
            },
            value: '',
            validation: {
                required: true,
                minLength: 6
            },
            valid: false,
            touched: false
        },
    });

   const [isSignUp, setSignUp] = useState(true);
    
    
useEffect(() => {
    if (props.buildingBurger && props.authRedirectPath !== '/') {
        props.onSetAuthRedirectPath();
    }
}, []);

    const checkValidity = (value, rules) => {

        let isValid = true;

        if (!rules) {
            return true;
        }

        if (rules.required) {
           isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid
        }

        return isValid;
}

const inputChangedHandler = (event, controlName) => {
        const updateControls = {
           ...authForm,
           [controlName]: {
               ...authForm[controlName],
               value: event.target.value,
               valid: checkValidity(event.target.value, authForm[controlName].validation),
               touched: true
           }
        };
        setAuthForm(updateControls);
        //this.setState({controls: updateControls});
}

const submitHandler = (event) => {
    event.preventDefault();
    props.onAuth(authForm.email.value, authForm.password.value, isSignUp);
}

const switchAuthModeHandler = () => {
   setSignUp(!isSignUp);
}
    

        const fromElementsArray = [];
        for (let key in authForm) {
            fromElementsArray.push({
                id: key,
                config: authForm[key]
            });
        }

        let form = fromElementsArray.map(formElement => (
            <Input 
            key={formElement.id}
            elementType={formElement.config.elementType}
            elementConfig={formElement.config.elementConfig}
            value={formElement.config.value}
            invalid={!formElement.config.valid}
            shouldValidate={formElement.config.validation}
            touched={formElement.config.touched}
            changed={(event) => inputChangedHandler(event, formElement.id)}
            />
            
        ));

            if(props.loading) {
                form = <Spinner />
            }

            let errorMessage = null;
            if (props.error) {
                errorMessage = (
                <p>{props.error.message}</p>
                );
            };

        let authRedirect = null;
        if (props.isAuthenticated) {
                authRedirect = <Redirect to={props.authRedirectPath} />
        }


        return (
            <div className={classes.Auth}>
                {authRedirect}
                {errorMessage}
                <form onSubmit={submitHandler}>
                {form}
                <Button btnType="Success">SUBMIT</Button>
                </form>
                <Button 
                btnType="Danger" 
                clicked={switchAuthModeHandler}>SWITCH TO {isSignUp ? 'SIGN IN' : 'SIGN UP'}</Button>
            </div>
        );
    
};

const mapStateToProps = state => {
    return {
           loading: state.auth.loading ,
           error: state.auth.error,
           isAuthenticated: state.auth.token !== null,
           buildingBurger: state.burgerBuilder.building,
           authRedirectPath: state.auth.authRedirectPath
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (email, password, isSignUp) => dispatch(actions.auth(email, password, isSignUp)),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
    }

}
 
export default connect(mapStateToProps, mapDispatchToProps)(Auth);