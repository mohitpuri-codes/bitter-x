import type { FormProps } from 'antd';
import { Button, Form, Input, notification } from 'antd';
import { Link, useNavigate } from 'react-router';
import type { LoginData, LoginResponse } from '../../types/AuthTypes';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { apipaths } from '../../config/apiPaths';
import { axiosInstance } from '../../config/axios.config';
import type { AxiosError, AxiosResponse } from 'axios';
import { ROUTE } from '../../Constants/routes.constants';
import { useForm } from 'antd/es/form/Form';
import {
  CreateAuthForm,
  type CreateAuthFormType,
} from '../../types/FormFields';
import { createAuthFormRules } from '../../Constants/rules.constants';
import styles from './auth.module.css';
import { QueryKey } from '../../Constants/queryKeys.constants';
import { TOKEN } from '../../Constants/globals.constants';

type FieldType = {
  username: string;
  password: string;
};

const Login = () => {
  const [form] = useForm<CreateAuthFormType>();
  const navigate = useNavigate();
  const [api, contextHolder] = notification.useNotification();
  const queryClient = useQueryClient();

  const {
    mutateAsync: userLoginMutation,
    error,
    isPending: isLoading,
  } = useMutation<
    AxiosResponse<LoginResponse>,
    AxiosError<AxiosError>,
    LoginData
  >({
    mutationFn: (data) => axiosInstance.post(apipaths.auth.login(), data),
    onSuccess: async (data) => {
      if (!data || !data.data.success || error) {
        console.error('Something went wrong');
        return;
      }
      const token = data.data.data.accessToken;
      localStorage.setItem(TOKEN, token);
      queryClient.invalidateQueries({ queryKey: [QueryKey.profile] });
      // queryClient.setQueryData([QueryKey.profile], {
      //   data: data.data.data,
      // });

      navigate(ROUTE.HOME);
    },
    onError: (error) => {
      api.error({
        message: error.response?.data.message,
        placement: 'topRight',
      });
    },
  });
  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    userLoginMutation({
      username: values.username,
      password: values.password,
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
          name="basic"
          layout="vertical"
          onFinish={onFinish}
          form={form}
          className={styles.form}
        >
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
          <span>Create an account? </span>
          <Link to={ROUTE.SIGNUP}>Signup</Link>
        </div>
      </div>
    </>
  );
};

export default Login;
