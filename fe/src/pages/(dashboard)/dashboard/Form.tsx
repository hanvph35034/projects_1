import React from "react";
import type { FormProps } from "antd";
import { Button, Checkbox, Form, Input, message } from "antd";
import { Link, useParams } from "react-router-dom";
import TextArea from "antd/es/input/TextArea";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import instance from "@/configs/axios";

type FieldType = {
  name?: string;
  price?: string;
  description?: string;
  images: string;
};

const FormAdmin = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const { id } = useParams();
  const quertClient = useQueryClient();
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["product" ,id],
    queryFn: async () => {
      try {
        return await instance.get(`/products/${id}`);
      } catch (error) {
        console.log(error);
      }
    },
  });
  const { mutate } = useMutation({
    mutationFn: async (data: any) => {
      try {
        if (id) {
          return await instance.put(`/products/${id}`, data);
        } else {
          return await instance.post(`/products`, data);
        }
      } catch (error) {
        console.log(error.response?.data.errors );
        throw new Error(error.response?.data.errors as any);
      }
    },
    onSuccess: async () => {
     if (id) {
      messageApi.open({
        type: "success",
        content: "sửa sản phẩm thành công",
      });
       quertClient.invalidateQueries({
        queryKey: ['product',id]
      })
     }else{
        messageApi.open({
        type: "success",
        content: "thêm sản phẩm thành công",
      });
     }
    
     
    },
    onError: (error) => {
      messageApi.open({
        type: "error",
        content: "thêm sản phẩm thất bại",
      });
    },
  });

  const onFinish: FormProps<FieldType>["onFinish"] = (values) => {
    mutate(values);
  };
  if(id){
    if(isLoading)return <div className="">Loading ....</div>
  if(isError)return <div className="">{error.message}</div>
  }
  
  return (
    <div className="">
      {contextHolder}
      <div className="flex items-center justify-between mb-5">
        <h2 className="text-2xl">From Product</h2>
        <Button type="primary">
          <Link to="/admin/product">Quay lại</Link>
        </Button>
      </div>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ ...data?.data?.data }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item<FieldType>
          label="name"
          name="name"
          rules={[{ required: true, message: "Nhập tên sản phẩm!" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item<FieldType>
          label="price"
          name="price"
          rules={[{ required: true, message: "Nhập giá sản phẩm!" }]}
        >
          <Input />
        </Form.Item>
        {/* <Form.Item<FieldType>
      label="images"
      name="images"
    
    >
      <Input />
    </Form.Item> */}

        <Form.Item<FieldType> label="description" name="description">
          <TextArea rows={4}></TextArea>
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default FormAdmin;
