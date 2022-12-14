import * as React from "react";
import { Form, message } from "antd";
import Input from "antd/lib/input/Input";
import { Link, useNavigate } from "react-router-dom";
import "../resources/authentication.css";
import axios from "axios";
import Spinner from "../components/Spinner";

const Register = () => {
  const [loading, setLoading] = React.useState(false);
  const navigate = useNavigate(true);
  const onFinish = async (values) => {
    try {
      setLoading(true);
      await axios.post("/api/users/register", values);
      message.success("Registration Successfull");
      setLoading(false);
    } catch (error) {
      message.error("Something went wrong");
      setLoading(false);
    }
  };

  React.useEffect(() => {
    if (localStorage.getItem("money-track-user")) {
      navigate("/");
    }
  }, []);

  return (
    <div className='register'>
      {loading && <Spinner />}
      <div className='row justify-content-center align-items-center w-100 h-100'>
        <div className='col-md-5'>
          <div className='lottie'>
            <lottie-player
              src='https://assets5.lottiefiles.com/packages/lf20_06a6pf9i.json'
              background='transparent'
              speed='1'
              loop
              autoplay
            ></lottie-player>
          </div>
        </div>

        <div className='col-md-5'>
          <h1>MONEY TRACKER REGISTER</h1>
          <hr />
          <Form layout='vertical' onFinish={onFinish}>
            <Form.Item label='Nombre' name='name'>
              <Input />
            </Form.Item>

            <Form.Item label='Email' name='email'>
              <Input />
            </Form.Item>

            <Form.Item label='Contraseña' name='password'>
              <Input type='password' />
            </Form.Item>

            <div className='d-flex justify-content-between align-items-center'>
              <Link to='/login'>¿Ya estas registrado? Click para iniciar sesión</Link>
              <button type='submit' className='primary'>
                REGISTRARSE
              </button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Register;
