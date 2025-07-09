import { useState } from 'react';
import Button from 'antd/es/button';
import Modal from 'antd/es/modal';
import Form from 'antd/es/form';
import Input from 'antd/es/input';
import Select from 'antd/es/select';
import notification from 'antd/es/notification';
import type { UserSchema } from '../../types/PostTypes';
import dayjs from 'dayjs';
import customParseFormat from 'dayjs/plugin/customParseFormat';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { axiosInstance } from '../../config/axios.config';
import { apipaths } from '../../config/apiPaths';
import type { AxiosError, AxiosResponse } from 'axios';
import type { APIResponse } from '../../types/AuthTypes';
import { QueryKey } from '../../Constants/queryKeys.constants';
import {
  EditProfileForm,
  type EditProfileFormType,
} from '../../types/FormFields';
const { TextArea } = Input;

interface EditProfileModalProps {
  userProfile: UserSchema | undefined;
}

export default function EditProfileModal({
  userProfile,
}: EditProfileModalProps) {
  const [open, setOpen] = useState(false);
  const [form] = Form.useForm<EditProfileFormType>();
  const [api, contextHolder] = notification.useNotification();
  const queryClient = useQueryClient();

  const showModal = () => {
    setOpen(true);

    form.setFieldsValue({
      firstName: userProfile?.firstName,
      lastName: userProfile?.lastName,
      bio: userProfile?.bio,
      phoneNumber: userProfile?.phoneNumber,
      countryCode: userProfile?.countryCode,
      location: userProfile?.location,
    });
  };

  const { mutateAsync: userProfileMutation, isPending } = useMutation<
    AxiosResponse<APIResponse<UserSchema>>,
    AxiosError<Error>,
    EditProfileFormType
  >({
    mutationFn: (data) => axiosInstance.patch(apipaths.user.profile(), data),
    onSuccess: (data) => {
      console.log(data);

      if (!data || !data.data.success) {
        api.error({
          message: 'Something went Wrong',
          placement: 'topRight',
        });
        return;
      }
      queryClient.invalidateQueries({ queryKey: [QueryKey.userInfo] });
      queryClient.invalidateQueries({ queryKey: [QueryKey.getMyPosts] });
      setOpen(false);
      api.success({
        message: data.data.message,
        placement: 'topRight',
      });
    },
    onError: (error) => {
      api.error({
        message: error.message,
        placement: 'topRight',
      });
    },
  });

  const handleOk = async () => {
    try {
      const values = await form.validateFields();

      userProfileMutation({
        firstName: values.firstName,
        lastName: values.lastName,
        bio: values.bio,
        countryCode: values.countryCode,
        location: values.location,
        phoneNumber: values.phoneNumber,
      });
    } catch (error) {
      console.error('Validation Failed:', error);
      api.error({
        message: 'Validation Error',
        placement: 'topRight',
      });
    }
  };

  const handleCancel = () => {
    setOpen(false);
  };

  dayjs.extend(customParseFormat);

  return (
    <>
      {contextHolder}
      <Button type="primary" onClick={showModal}>
        Edit Profile
      </Button>
      <Modal
        title="Edit Profile"
        open={open}
        onOk={handleOk}
        confirmLoading={isPending}
        onCancel={handleCancel}
      >
        <Form form={form} layout="vertical" name="edit-profile-form">
          <Form.Item
            name={EditProfileForm.FirstName}
            label="First Name"
            rules={[{ required: true, message: 'Please enter first name' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name={EditProfileForm.LastName}
            label="Last Name"
            rules={[{ required: true, message: 'Please enter last name' }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name="bio"
            label={EditProfileForm.Bio}
            rules={[{ required: true, message: 'Enter you Bio' }]}
          >
            <TextArea rows={3} />
          </Form.Item>

          <Form.Item
            name={EditProfileForm.CountryCode}
            label="Country Code"
            rules={[{ required: true, message: 'Please select country code' }]}
          >
            <Select>
              <Select.Option value="+91">+91 (India)</Select.Option>
              <Select.Option value="+1">+1 (USA)</Select.Option>
              <Select.Option value="+44">+44 (UK)</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="phoneNumber"
            label={EditProfileForm.PhoneNumber}
            rules={[
              { required: true, message: 'Please enter phone number' },
              {
                pattern: /^[0-9]{10,15}$/,
                message: 'Enter valid phone number',
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            name={EditProfileForm.Location}
            label="Location"
            rules={[{}]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
}
