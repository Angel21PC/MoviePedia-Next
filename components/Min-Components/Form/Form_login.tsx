import { useState } from "react";

//next 
import { useRouter } from 'next/router'

//Form
import {useForm} from 'react-hook-form';

//validation
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';


//Notification
import { store } from 'react-notifications-component';

//Icons
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons'

//firebase
import { useAuth } from '../../../firebase/AuthContext';

export interface FormLProps {
    
}


const schema = yup.object().shape({
    email: yup.string().email().required(),
    password: yup.string().required(),
});

const FormL: React.SFC<FormLProps> = () => {

    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(schema),
     });
     
    const onSubmit = async (data: INewUser) => {
        try {
            console.log(data)
            setLoading(true)
            await login(data.email, data.password)
            router.push('/')
        } catch {
            store.addNotification({
                title: "Fail!",
                message: "Fail to log in",
                type: "danger",
                insert: "top",
                container: "top-center",
                animationIn: ["animate__animated", "animate__fadeIn"],
                animationOut: ["animate__animated", "animate__fadeOutUp"],
                dismiss: {
                    duration: 2000,
                    touch: true,
                }
            }); 
        }
        setLoading(false)
    }
    
    //firebase
    const { login } = useAuth();

    return ( 
        <div className="registration-form">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="form-icon">
                        <span><i className="icon icon-user"><FontAwesomeIcon icon={faUser} /></i></span>
                    </div>
                    <div className="form-group">
                        <input type="text" className="form-control item" key="email" id="email" placeholder="Email" name="email" {...register('email')}  pattern='[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+' />
                        {errors.email?.message && <p>{errors.email?.message}</p>}
                    </div>
                    <div className="form-group">
                        <input type="password" className="form-control item" key="password" id="password" placeholder="Password" name="password" {...register('password')} pattern='^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$' />
                        {errors.password?.message && <p>{errors.password?.message}</p>}
                    </div>
                    <div className="form-group">
                        <button  disabled={loading}  type="submit" className="btn btn-block create-account">Enter</button>
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
                <style jsx>{`
                .registration-form{
                    padding: 50px 0;
                }

                .registration-form form{
                    background-color: #fff;
                    max-width: 600px;
                    margin: auto;
                    padding: 50px 70px;
                    border-top-left-radius: 30px;
                    border-top-right-radius: 30px;
                    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.075);
                }

                .registration-form .form-icon{
                    text-align: center;
                    background-color: #5891ff;
                    border-radius: 50%;
                    font-size: 40px;
                    color: white;
                    width: 100px;
                    height: 100px;
                    margin: auto;
                    margin-bottom: 50px;
                    line-height: 100px;
                }

                .registration-form .item{
                    border-radius: 20px;
                    margin-bottom: 25px;
                    padding: 10px 20px;
                }

                .registration-form .create-account{
                    border-radius: 30px;
                    padding: 10px 20px;
                    font-size: 18px;
                    font-weight: bold;
                    background-color: #5791ff;
                    border: none;
                    color: white;
                    margin-top: 20px;
                }

                .registration-form .social-media{
                    max-width: 600px;
                    background-color: #fff;
                    margin: auto;
                    padding: 35px 0;
                    text-align: center;
                    border-bottom-left-radius: 30px;
                    border-bottom-right-radius: 30px;
                    color: #9fadca;
                    border-top: 1px solid #9097a3;
                    box-shadow: 0px 2px 10px rgba(0, 0, 0, 0.281);
                }

                .registration-form .social-icons{
                    margin-top: 30px;
                    margin-bottom: 16px;
                }

                .registration-form .social-icons a{
                    font-size: 23px;
                    margin: 0 3px;
                    color: #5691ff;
                    border: 1px solid;
                    border-radius: 50%;
                    width: 45px;
                    display: inline-block;
                    height: 45px;
                    text-align: center;
                    background-color: #fff;
                    line-height: 45px;
                }

                .registration-form .social-icons a:hover{
                    text-decoration: none;
                    opacity: 0.6;
                }

                @media (max-width: 576px) {
                    .registration-form form{
                        padding: 50px 20px;
                    }

                    .registration-form .form-icon{
                        width: 70px;
                        height: 70px;
                        font-size: 30px;
                        line-height: 70px;
                    }
                }
            `}</style>
            </div>
     );
}
 
export default FormL;