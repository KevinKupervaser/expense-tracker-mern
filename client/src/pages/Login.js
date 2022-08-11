import * as React from "react";
import { Form, message } from "antd";
import Input from "antd/lib/input/Input";
import { Link, useNavigate } from "react-router-dom";
import "../resources/authentication.css";
import axios from "axios";
import Spinner from "../components/Spinner";

const Login = () => {
  const [loading, setLoading] = React.useState(false);

  const navigate = useNavigate();

  const onFinish = async (values) => {
    try {
      setLoading(true);
      const response = await axios.post("/api/users/login", values);
      localStorage.setItem(
        "money-track-user",
        JSON.stringify({ ...response.data, password: "" })
      );
      setLoading(false);
      message.success("Login successfull");
      navigate("/");
    } catch (error) {
      setLoading(false);
      message.error("login failed");
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
          <h1>MONEY TRACKER LOGIN</h1>
          <hr />
          <Form layout='vertical' onFinish={onFinish}>
            <Form.Item label='Email' name='email'>
              <Input />
            </Form.Item>

            <Form.Item label='Contraseña' name='password'>
              <Input type='password' />
            </Form.Item>

            <div className='d-flex justify-content-between align-items-center'>
              <Link to='/register'>
                ¿No estas registrado? Click aqui para registrarte
              </Link>
              <button type='submit' className='primary'>
                Iniciar Sesión
              </button>
            </div>
          </Form>
        </div>

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
      </div>
    </div>
  );
};

export default Login;
