import { useEffect, useState } from "react";

import {useForm} from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';


//Notification
import { store } from 'react-notifications-component';

//Icons
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons'

export interface FormSProps {

}

const today = new Date();
const schema = yup.object().shape({
    username: yup.string().required(),
    password: yup.string().required(),
    password2: yup.string().oneOf([yup.ref('password'), null], 'Passwords must match').required(),
    email: yup.string().email().required(),
    phone_number: yup.string(),
    birth_date: yup.date().max(today),
});

const FormS: React.SFC<FormSProps> = () => {

        const [loading, setLoading] = useState(false);

    
        const onSubmit = async (data) => {
            console.log(data)
            // try {
            //     console.log(data)
            //     setLoading(true)
            //     await signup(data.email, data.password).then(saveData(data.username, data.birth_date, data.phone_number, data.email))
            //     history.push("/in")
            // } catch {
            //     store.addNotification({
            //         title: "Fail!",
            //         message: "Fail to create account",
            //         type: "danger",
            //         insert: "top",
            //         container: "top-center",
            //         animationIn: ["animate__animated", "animate__fadeIn"],
            //         animationOut: ["animate__animated", "animate__fadeOutUp"],
            //         dismiss: {
            //             duration: 2000,
            //             touch: true,
            //         }
            //     }); 
        }
        // setLoading(false)

        const {register, handleSubmit, formState: { errors } } = useForm<FormSProps>({
            resolver: yupResolver(schema),
        });

        
        return ( 
            <div className="registration-form">
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="form-icon">
                    <span><i className="icon icon-user"><FontAwesomeIcon icon={faUser} /></i></span>
                </div>
                <div className="form-group">
                    <input type="text" className="form-control item" id="username" placeholder="Username" name="username" {...register} />
                    {/* {errors?.username?.message && <p>{errors?.username?.message}</p>} */}
                </div>
                <div className="form-group">
                    <input type="password" className="form-control item" id="password" placeholder="Password" name="password" {...register} pattern='^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$' />
                    {/* {errors.password?.message && <p>{errors.password?.message}</p>} */}
                </div>
                <div className="form-group">
                    <input type="password" className="form-control item" id="password2" placeholder="Password again pls" name="password2" {...register}  pattern='^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$' />
                    {/* {errors.password2?.message && <p>{errors.password2?.message}</p>} */}
                </div>
                <div className="form-group">
                    <input type="text" className="form-control item" id="email" placeholder="Email" name="email" {...register}  pattern='[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+' />
                    {/* {errors.email?.message && <p>{errors.email?.message}</p>} */}
                </div>
                <div className="form-group">
                    <input type="text" className="form-control item" id="phone_number" name="phone_number" {...register}  placeholder="Phone Number (if you want)"   />
                    {/* {errors.phone_number?.message && <p>{errors.phone_number?.message}</p>} */}
                </div>
                <div className="form-group">
                    <input type="date" className="form-control item" id="birth_date" name="birth_date" {...register}  placeholder="Birth Date"  />
                    {/* {errors.birth_date?.message && <p>{errors.birth_date?.message}</p>} */}
                </div>
                <div className="form-group">
                    <button  disabled={loading}  type="submit" className="btn btn-block create-account">Create Account</button>
                </div>
            </form>
            <div className="social-media">
                <h5>Sign up with social media</h5>
                <div className="social-icons">
                    {/* <a href="#"><i className="icon-social-facebook" title="Facebook"></i></a>
                    <a href="#"><i className="icon-social-google" title="Google"></i></a>
                    <a href="#"><i className="icon-social-twitter" title="Twitter"></i></a> */}
                </div>
            </div>
        </div>
        
        )
    }


export default FormS;