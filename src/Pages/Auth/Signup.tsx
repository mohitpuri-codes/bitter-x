import type { FormProps } from 'antd';
import { Button, Form, Input, notification } from 'antd';
import { Link, useNavigate } from 'react-router';
import type { LoginResponse, SignupData } from '../../types/AuthTypes';
import { useMutation } from '@tanstack/react-query';
import { apipaths } from '../../config/apiPaths';
import { axiosInstance } from '../../config/axios.config';
import type { AxiosError, AxiosResponse } from 'axios';
import {
  FIELDS_VALIDATION_MESSAGE,
  VALIDATION_ERROR,
} from '../../Constants/errors.constants';
import { ROUTE } from '../../Constants/routes.constants';

type FieldType = {
  email: string;
  username: string;
  password: string;
};

const Signup: React.FC = () => {
  const navigate = useNavigate();
  const [api, contextHolder] = notification.useNotification();

  const {
    mutateAsync: userLoginMutation,
    error,
    isPending: isLoading,
  } = useMutation<
    AxiosResponse<LoginResponse>,
    AxiosError<AxiosError>,
    SignupData
  >({
    mutationFn: (data: SignupData) =>
      axiosInstance.post(apipaths.auth.signup(), data),
    onSuccess: (data) => {
      if (!data || !data.data.success || error) {
        console.error('Something went wrong');
        return;
      }
      navigate(ROUTE.LOGIN);
    },
    onError: (error) => {
      api.error({
        message: VALIDATION_ERROR,
        description: error.response?.data.message,
        placement: 'topRight',
      });
    },
  });

  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    userLoginMutation({
      username: values.username,
      password: values.password,
      email: values.email,
    });
  };

  return (
    <>
      {contextHolder}
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
          autoComplete="off"
        >
          <Form.Item<FieldType>
            label="Email"
            name="email"
            rules={[
              { required: true, message: FIELDS_VALIDATION_MESSAGE.NO_EMAIL },
              { type: 'email', message: FIELDS_VALIDATION_MESSAGE.VALID_EMAIL },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item<FieldType>
            label="Username"
            name="username"
            rules={[
              {
                required: true,
                message: FIELDS_VALIDATION_MESSAGE.NO_USERNAME,
              },
              {
                min: 1,
                message: FIELDS_VALIDATION_MESSAGE.VALID_USERNAME,
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item<FieldType>
            label="Password"
            name="password"
            rules={[
              {
                required: true,
                message: FIELDS_VALIDATION_MESSAGE.NO_PASSWORD,
              },
              {
                min: 6,
                message: FIELDS_VALIDATION_MESSAGE.VALID_PASSWORD,
              },
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
          <Link to={ROUTE.LOGIN}>Login</Link>
        </div>
      </div>
    </>
  );
};

export default Signup;
