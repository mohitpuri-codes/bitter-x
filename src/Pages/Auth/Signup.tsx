import React from 'react';
import type { FormProps } from 'antd';
import { Button, Form, Input } from 'antd';
import { Link, useNavigate } from 'react-router';
import type { LoginResponse, SignupData } from '../../types/AuthTypes';
import { useMutation } from '@tanstack/react-query';
import { apipaths } from '../../config/apiPaths';
import { axiosInstance } from '../../config/axios.config';
import type { AxiosError, AxiosResponse } from 'axios';

type FieldType = {
  email: string;
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
  } = useMutation<AxiosResponse<LoginResponse>, AxiosError, SignupData>({
    mutationFn: (data: SignupData) =>
      axiosInstance.post(apipaths.auth.signup(), data),
    onSuccess: (data) => {
      if (!data || !data.data.success || error) {
        console.error('Something went wrong');
        return;
      }

      navigate('/login');
    },
  });

  const onFinish: FormProps<FieldType>['onFinish'] = async (values) => {
    console.log('Success:', values);
    await userLoginMutation({
      username: values.username,
      password: values.password,
      email: values.email,
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
        className="login-form"
        name="basic"
        layout="vertical"
        initialValues={{ remember: true }}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          label="Email"
          name="email"
          rules={[
            { required: true, message: 'Please input your email!' },
            { type: 'email', message: 'Please enter a valid email' },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item<FieldType>
          label="Username"
          name="username"
          rules={[
            { required: true, message: 'Please input your username!' },
            { min: 1, message: 'Username must be at least one character long' },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="Password"
          name="password"
          rules={[
            { required: true, message: 'Please input your password!' },
            { min: 6, message: 'Password must be at least 6 characters long' },
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
        <span>Already have an account? </span>
        <Link to="/login">Login</Link>
      </div>
    </div>
  );
};

export default Login;
