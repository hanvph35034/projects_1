import React from 'react';
import type { FormProps } from 'antd';
import { Button, Checkbox, Form, Input, message } from 'antd';
import { Link } from 'react-router-dom';
import TextArea from 'antd/es/input/TextArea';
import { useMutation } from '@tanstack/react-query';
import instance from '@/configs/axios';

type FieldType = {
  name?: string;
  price?: string;
  description?: string;
  images: string;
};




const FormAdmin = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const {mutate} = useMutation({
    mutationFn:async (data:any) => {
      try {
        return await instance.post(`/products`,data)
      } catch (error) {
        throw new Error("error")
      }
    },
    onSuccess:async()=>{
      messageApi.open({
        type: 'success',
        content: 'thêm sản phẩm thành công',
      });
    },
    onError:(error) => {
      messageApi.open({
        type: 'error',
        content: 'thêm sản phẩm thất bại',
      });
    },
    
  })
 const onFinish: FormProps<FieldType>['onFinish'] = (values) => {
  mutate(values)
};
  return (
      <div className="">
    <div className='flex items-center justify-between mb-5'>
    <h2 className='text-2xl'>Add Product</h2>
<Button type='primary' ><Link to='/admin/product'>Quay lại</Link></Button>
</div>
<Form
    name="basic"
    labelCol={{ span: 8 }}
    wrapperCol={{ span: 16 }}
    style={{ maxWidth: 600 }}
    initialValues={{ remember: true }}
    onFinish={onFinish}

    autoComplete="off"
  >
    <Form.Item<FieldType>
      label="name"
      name="name"
      rules={[{ required: true, message: 'Nhập tên sản phẩm!' }]}
    >
      <Input />
    </Form.Item>

    <Form.Item<FieldType>
      label="price"
      name="price"
      rules={[{ required: true, message: 'Nhập giá sản phẩm!' }]}
    >
      <Input />
    </Form.Item>
    <Form.Item<FieldType>
      label="images"
      name="images"
    
    >
      <Input />
    </Form.Item>

    <Form.Item<FieldType>
      label="description"
      name="description"
   
    >
     <TextArea rows={4}></TextArea>
    </Form.Item>

    <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
      <Button type="primary" htmlType="submit">
        Submit
      </Button>
    </Form.Item>
  </Form>
  </div>
  )

};
  
  

export default FormAdmin;
