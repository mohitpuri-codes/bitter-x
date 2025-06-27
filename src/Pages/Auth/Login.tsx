import React from 'react';
import type { FormProps } from 'antd';
import { Button, Form, Input } from 'antd';
import { Link, useNavigate } from 'react-router';
import type { LoginData, LoginResponse } from '../../types/AuthTypes';
import { useMutation } from '@tanstack/react-query';
import { apipaths } from '../../config/apiPaths';
import { axiosInstance } from '../../config/axios.config';
import { TOKEN } from '../../Constants/globals.constants';
import type { AxiosError, AxiosResponse } from 'axios';
import { ROUTE } from '../../Constants/routes.constants';

type FieldType = {
  username: string;
  password: string;
};

const onFinishFailed: FormProps<FieldType>['onFinishFailed'] = (errorInfo) => {
  console.log('Failed:', errorInfo);
};

const Login: React.FC = () => {
  const navigate = useNavigate();

  const {
    mutateAsync: userLoginMutation,
    error,
    isPending: isLoading,
  } = useMutation<AxiosResponse<LoginResponse>, AxiosError, LoginData>({
    mutationFn: (data: LoginData) =>
      axiosInstance.post(apipaths.auth.login(), data),
    onSuccess: (data) => {
      if (!data || !data.data.success || error) {
        console.error('Something went wrong');
        return;
      }

      const token = data.data.data.accessToken;
      localStorage.setItem(TOKEN, token);
      navigate(ROUTE.HOME);
    },
  });
  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    console.log('Success:', values);
    await userLoginMutation({
      username: values.username,
      password: values.password,
    });
  };
  return (
    <div className="login-container">
      <div className="bitter-logo">
        <img
          src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3qYraKRBr6_XBl8XOkTQRv3EgvcaAwBYjWA&s"
          alt="logo"
        />
        <p>Bitter</p>
      </div>
      <Form
        name="basic"
        layout="vertical"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
        className="login-form"
      >
        <Form.Item<FieldType>
          label="Username"
          name="username"
          rules={[
            { required: true, message: 'Please input your username!' },
            { min: 1, message: 'Username must be atleast one character long' },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Password"
          name="password"
          rules={[
            { required: true, message: 'Please input your password!' },
            { min: 6, message: 'Password must be atleast 6 character long' },
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item label={null}>
          <Button type="primary" htmlType="submit" disabled={isLoading} block>
            Submit
          </Button>
        </Form.Item>
      </Form>
      <div style={{ textAlign: 'center', marginTop: '1rem' }}>
        <span>Create an account? </span>
        <Link to={ROUTE.SIGNUP}>Signup</Link>
      </div>
    </div>
  );
};

export default Login;
