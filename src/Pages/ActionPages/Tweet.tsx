import { useForm, type FormProps } from 'antd/es/form/Form';
import notification from 'antd/es/notification';
import Form from 'antd/es/form';
import Input from 'antd/es/input';
import Button from 'antd/es/button';
import Upload, { type UploadFile, type UploadProps } from 'antd/es/upload';
import type { GetProp } from 'antd';
import Image from 'antd/es/image';
import { PlusOutlined } from '@ant-design/icons';
import TextArea from 'antd/es/input/TextArea';
import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import type { AxiosResponse, AxiosError } from 'axios';
import { useNavigate } from 'react-router';
import { CreatePostForm } from '../../types/FormFields';
import { apipaths } from '../../config/apiPaths';
import { axiosInstance } from '../../config/axios.config';
import { ROUTE } from '../../Constants/routes.constants';
import { createPostFormRules } from '../../Constants/rules.constants';
import type { PostResponseSchema } from '../../types/PostTypes';
import type { APIResponse } from '../../types/AuthTypes';
import styles from '../ActionPages/tweet.module.css';

// Extract the file type - From antD
type FileType = Parameters<GetProp<UploadProps, 'beforeUpload'>>[0];

type FieldType = {
  content: string;
  images: Array<File>;
  tags: Array<string>;
};

// returns a base64 string converted from filetype
const getBase64 = (file: FileType): Promise<string> =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result as string);
    reader.onerror = (error) => reject(error);
  });

export default function Tweet() {
  const [form] = useForm<FieldType>();
  const navigate = useNavigate();
  const [api, contextHolder] = notification.useNotification();
  const [previewOpen, setPreviewOpen] = useState(false); //state to toggle the preview of files
  const [previewImage, setPreviewImage] = useState(''); //show the images uploaded by user
  const [tags, setTags] = useState<string>(''); // store the tags inserted by users
  const [fileList, setFileList] = useState<UploadFile[]>([]); //store the images uploaded by user

  // method to handle the preview of the images
  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as FileType);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
  };

  // method to upload a new image
  const handleChange: UploadProps['onChange'] = ({ fileList: newFileList }) =>
    setFileList(newFileList);

  const uploadButton = (
    <button className={styles.uploadButton} type="button">
      <PlusOutlined />
      <div>Upload</div>
    </button>
  );

  const { mutateAsync: postCreationMutation, isPending: isLoading } =
    useMutation<
      AxiosResponse<APIResponse<PostResponseSchema>>,
      AxiosError<AxiosError>,
      FieldType
    >({
      mutationFn: (data) => {
        const formData = new FormData();
        formData.append('content', data.content);
        data.tags.forEach((tag, index) => {
          formData.append(`tags[${index}]`, tag);
        });
        data.images.forEach((file) => {
          formData.append('images', file);
        });

        return axiosInstance.post(apipaths.posts.createPost(), formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
      },

      onSuccess: () => {
        navigate(ROUTE.HOME);
      },

      onError: (error) => {
        api.error({
          message: error.response?.data.message || 'An error occurred.',
          placement: 'topRight',
        });
      },
    });

  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    const files: File[] = fileList
      .filter((file) => file.originFileObj)
      .map((file) => file.originFileObj as File);

    const tagArray = tags
      .split(',')
      .map((tag) => tag.trim())
      .filter((tag) => tag.length > 0);

    postCreationMutation({
      content: values.content,
      images: files,
      tags: tagArray,
    });
  };

  return (
    <>
      {contextHolder}
      <div className={styles.formContainer}>
        <Form
          name="basic"
          layout="vertical"
          onFinish={onFinish}
          form={form}
          className={styles.form}
        >
          <Form.Item
            name={CreatePostForm.content}
            rules={createPostFormRules[CreatePostForm.content]}
          >
            <TextArea
              showCount
              className={styles.textArea}
              placeholder="What’s Happening?"
            />
          </Form.Item>

          <Form.Item
            name={CreatePostForm.images}
            rules={createPostFormRules[CreatePostForm.images]}
          >
            <>
              <Upload
                listType="picture-card"
                fileList={fileList}
                onPreview={handlePreview}
                onChange={handleChange}
                beforeUpload={() => false} // prevent auto upload
              >
                {fileList.length >= 8 ? null : uploadButton}
              </Upload>

              {previewImage && (
                <Image
                  preview={{
                    visible: previewOpen,
                    onVisibleChange: (visible) => setPreviewOpen(visible),
                    afterOpenChange: (visible) =>
                      !visible && setPreviewImage(''),
                  }}
                  src={previewImage}
                />
              )}
            </>
          </Form.Item>

          <Form.Item label="Tags (comma-separated)">
            <Input
              value={tags}
              onChange={(e) => setTags(e.target.value)}
              placeholder="e.g. react, javascript, webdev"
            />
          </Form.Item>

          <Button type="primary" htmlType="submit" disabled={isLoading} block>
            Submit
          </Button>
        </Form>
      </div>
    </>
  );
}
