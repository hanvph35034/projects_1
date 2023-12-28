import { useAddInformationMutation } from "../../../api/information"
import { IInformation } from '../../../interfaces/information';
import { Form, Button, Input, Upload, message } from "antd";
import { useNavigate } from "react-router-dom";
import LoadingOutlined, { UploadOutlined, PlusOutlined } from "@ant-design/icons"
import React, { useState } from 'react';
import axios from 'axios';



type FieldType = {
    title: string,
    email: string,
    phone: number,
    image: any,
    logo: any,
    address: string,
    nameStore: string,
};



const InformationAdd = () => {
    const [addInformation, { isLoading }] = useAddInformationMutation();
    const navigate = useNavigate();
    const [form] = Form.useForm();
    const [fileList, setFileList] = useState<any[]>([]);

    const SubmitImage = async () => {
        const uploadPromises = fileList.map(async (file) => {
            const data = new FormData();
            const cloud_name = "drquzvhxt";
            const upload_preset = "datn-upload";
            data.append("file", file.originFileObj);
            data.append("upload_preset", upload_preset);
            data.append("cloud_name", cloud_name);
            data.append("folder", "datn");

            const takeData = await axios
                .post(`https://api.cloudinary.com/v1_1/${cloud_name}/image/upload`, data)
                .then((data: any) => data);

            return takeData.data.secure_url;
        });

        return Promise.all(uploadPromises);
    };

    const onFileChange = ({ fileList }: any) => {
        setFileList(fileList);
    };  


    const onFinish = async (values: IInformation) => {
        const fileUrls = await SubmitImage();
        values.image = fileUrls;
        console.log("Form Values:", values);
        console.log("Form Values:", values);

        await addInformation(values)
            .unwrap()
            .then(() => navigate("/admin/information"))
            .catch((error) => {
                console.error(error);

            });
    };

    return (
        <div>
            <header className="mb-4">
                <h2 className="font-bold text-2xl">Thêm thông tin</h2>
            </header>
            <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                onFinish={onFinish}
                autoComplete="off"
                form={form}
            >
                <Form.Item<FieldType>
                    label="Tiêu đề"
                    name="title"
                    rules={[
                        { required: true, message: "Vui lòng nhập tiêu đề !" },
                    ]}
                    hasFeedback
                >
                    <Input />
                </Form.Item>

                <Form.Item<FieldType> label="Email" name="email"
                    rules={[
                        { required: true, message: "Vui lòng nhập email !" },
                        { type: "email", message: "email không đúng định dạng" }
                    ]}
                    hasFeedback
                >
                    <Input />
                </Form.Item>

                <Form.Item<FieldType>
                    label="Số điện thoại"
                    name="phone"
                    rules={[
                        { required: true, message: "Vui lòng nhập số điện thoại !" },
                        { min: 10, message: "Sản phẩm ít nhất 10 ký tự" },
                    ]}
                    hasFeedback
                >
                    <Input />
                </Form.Item>

                <Form.Item<FieldType>
                    label="Ảnh"
                    name="image"
                    rules={[
                        { required: true, message: "Vui lòng nhập chọn ảnh !" },
                    ]}
                    hasFeedback
                >
                    <Upload
                        customRequest={() => { }}
                        onChange={onFileChange}
                        fileList={fileList}
                        listType="picture"
                        beforeUpload={() => false}
                    >
                        <Button >Chọn ảnh</Button>
                    </Upload>
                </Form.Item>

                <Form.Item<FieldType>
                    label="Logo"
                    name="logo"
                    rules={[
                        { required: true, message: "Vui lòng chọn ảnh !" },
                    ]}
                    hasFeedback
                >
                    {/* <Upload
                        customRequest={() => { }}
                        onChange={onFileChange}
                        fileList={fileList}
                        listType="picture"
                        beforeUpload={() => false}
                    >
                        <Button >Chọn Logo</Button>
                    </Upload> */}
                    <Input />
                </Form.Item>

                <Form.Item<FieldType>
                    label="Địa chỉ"
                    name="address"
                    rules={[
                        { required: true, message: "Vui lòng nhập địa chỉ !" },
                    ]}
                    hasFeedback
                >
                    <Input />
                </Form.Item>

                <Form.Item<FieldType>
                    label="Tên của hàng"
                    name="nameStore"
                    rules={[
                        { required: true, message: "Vui lòng nhập tên của hàng !" },
                    ]}
                    hasFeedback
                >
                    <Input />
                </Form.Item>

                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button type="primary" danger htmlType="submit">
                        {isLoading ? (
                            <LoadingOutlined className="animate-spin" />
                        ) : (
                            "Thêm"
                        )}
                    </Button>
                    <Button
                        type="primary"
                        danger
                        className="ml-2"
                        onClick={() => navigate("/admin/information")}
                    >
                        Quay lại
                    </Button>
                </Form.Item>
            </Form>
        </div >
    );
};

export default InformationAdd;