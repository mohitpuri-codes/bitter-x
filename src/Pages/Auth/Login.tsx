import { useMutation, useQueryClient } from '@tanstack/react-query';
import type { AxiosError, AxiosResponse } from 'axios';
import Button from 'antd/es/button';
import Form from 'antd/es/form';
import Input from 'antd/es/input';
import notification from 'antd/es/notification';
import { useForm, type FormProps } from 'antd/es/form/Form';
import { Link, useNavigate } from 'react-router';
import { apipaths } from '../../config/apiPaths';
import { axiosInstance } from '../../config/axios.config';
import type {
  APIResponse,
  LoggedinUserReponse,
  LoginData,
} from '../../types/AuthTypes';
import {
  CreateAuthForm,
  type CreateAuthFormType,
} from '../../types/FormFields';
import { ROUTE } from '../../Constants/routes.constants';
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
    AxiosResponse<APIResponse<LoggedinUserReponse>>,
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
