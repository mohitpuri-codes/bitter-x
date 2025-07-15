import { useMutation } from '@tanstack/react-query';
import type { AxiosError, AxiosResponse } from 'axios';
import Button from 'antd/es/button';
import Form from 'antd/es/form';
import type { FormProps } from 'antd/es/form';
import Input from 'antd/es/input';
import notification from 'antd/es/notification';
import { useForm } from 'antd/es/form/Form';
import { Link, useNavigate } from 'react-router';
import type {
  APIResponse,
  LoggedinUserReponse,
  SignupData,
  ErrorResponse,
} from '../../types/AuthTypes';
import { ROUTE } from '../../Constants/routes.constants';
import {
  CreateAuthForm,
  type CreateAuthFormType,
} from '../../types/FormFields';
import { createAuthFormRules } from '../../Constants/rules.constants';
import styles from './auth.module.css';
import axios from 'axios';
import { apipaths } from '../../config/apiPaths';
import { VALIDATION_ERROR } from '../../Constants/errors.constants';

type FieldType = {
  email: string;
  username: string;
  password: string;
};

const Signup = () => {
  const [form] = useForm<CreateAuthFormType>();
  const navigate = useNavigate();
  const [api, contextHolder] = notification.useNotification();

  const {
    mutateAsync: userLoginMutation,
    error,
    isPending: isLoading,
  } = useMutation<
    AxiosResponse<APIResponse<LoggedinUserReponse>>,
    AxiosError<ErrorResponse>,
    SignupData
  >({
    mutationFn: (data) =>
      axios.post(
        `${import.meta.env.VITE_BASE_URL}${apipaths.auth.signup()}`,
        data
      ),
    onSuccess: (data) => {
      if (!data || !data.data.success || error) {
        console.error('Something went wrong');
        return;
      }
      navigate(ROUTE.LOGIN);
    },
    onError: (error) => {
      const errorMessage = error.response?.data?.message || VALIDATION_ERROR;
      const errorDescription =
        error.response?.data?.errors?.[0]?.username ||
        error.response?.data?.errors?.[0]?.email ||
        error.response?.data?.errors?.[0]?.password;

      api.error({
        message: errorMessage,
        description: errorDescription,
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
      <div className={styles.formContainer}>
        <div className={styles.bitterLogo}>
          <img
            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR3qYraKRBr6_XBl8XOkTQRv3EgvcaAwBYjWA&s"
            alt="logo"
          />
          <p>Bitter</p>
        </div>
        <Form
          className={styles.form}
          name="basic"
          layout="vertical"
          onFinish={onFinish}
          form={form}
        >
          <Form.Item
            label="Email"
            name={CreateAuthForm.Email}
            rules={createAuthFormRules[CreateAuthForm.Email]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Username"
            name={CreateAuthForm.Username}
            rules={createAuthFormRules[CreateAuthForm.Username]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name={CreateAuthForm.Password}
            rules={createAuthFormRules[CreateAuthForm.Password]}
          >
            <Input.Password />
          </Form.Item>

          <Button type="primary" htmlType="submit" disabled={isLoading} block>
            Submit
          </Button>
        </Form>

        <div className={styles.navigator}>
          <span>Already have an account? </span>
          <Link to={ROUTE.LOGIN}>Login</Link>
        </div>
      </div>
    </>
  );
};

export default Signup;
