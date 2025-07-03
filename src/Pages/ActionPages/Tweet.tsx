import { useForm, type FormProps } from 'antd/es/form/Form';
import { CreatePostForm } from '../../types/FormFields';
import { useMutation } from '@tanstack/react-query';
import notification from 'antd/es/notification';
import Form from 'antd/es/form';
import Input from 'antd/es/input';
import Button from 'antd/es/button';
import Upload, { type UploadFile, type UploadProps } from 'antd/es/upload';
import type { GetProp } from 'antd';
import Image from 'antd/es/image';
import type { AxiosResponse, AxiosError } from 'axios';
import { useNavigate } from 'react-router';
import { apipaths } from '../../config/apiPaths';
import { axiosInstance } from '../../config/axios.config';
import { ROUTE } from '../../Constants/routes.constants';
import { createPostFormRules } from '../../Constants/rules.constants';
import type { PostResponseSchema } from '../../types/PostTypes';
import styles from '../ActionPages/tweet.module.css';
import { useState } from 'react';
import { PlusOutlined } from '@ant-design/icons';
import TextArea from 'antd/es/input/TextArea';

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
  const [tags, setTags] = useState<string[]>(['']); // store the tags inserted by users
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
    <button style={{ border: 0, background: 'none' }} type="button">
      <PlusOutlined />
      <div style={{ marginTop: 8 }}>Upload</div>
    </button>
  );

  const handleTagChange = (index: number, value: string) => {
    const newTags = [...tags];
    newTags[index] = value;
    setTags(newTags);
  };

  const addTagField = () => {
    setTags([...tags, '']);
  };

  const removeTagField = (index: number) => {
    const newTags = [...tags];
    newTags.splice(index, 1);
    setTags(newTags);
  };

  const { mutateAsync: postCreationMutation, isPending: isLoading } =
    useMutation<
      AxiosResponse<PostResponseSchema>,
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
          message: error.response?.data.message,
          placement: 'topRight',
        });
      },
    });

  const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
    const files: File[] = fileList
      .filter((file) => file.originFileObj)
      .map((file) => file.originFileObj as File);

    postCreationMutation({
      content: values.content,
      images: files,
      tags,
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
          <Form.Item label="Tags">
            <div className={styles.tags}>
              {tags.map((tag, index) => (
                <div key={index} className={styles.tagItem}>
                  <Input
                    value={tag}
                    onChange={(e) => handleTagChange(index, e.target.value)}
                    placeholder={`Tag ${index + 1}`}
                    required
                  />
                  <Button
                    danger
                    type="text"
                    onClick={() => removeTagField(index)}
                    style={{ marginLeft: 8 }}
                  >
                    Remove
                  </Button>
                </div>
              ))}
            </div>
            <Button type="dashed" onClick={addTagField} icon={<PlusOutlined />}>
              Add Tag
            </Button>
          </Form.Item>

          <Button type="primary" htmlType="submit" disabled={isLoading} block>
            Submit
          </Button>
        </Form>
      </div>
    </>
  );
}
