import { useAddCategoryMutation } from "../../../api/category"
import { ICategory } from '../../../interfaces/category';
import { Form, Button, Input, Select, Upload } from "antd";
import { useNavigate } from "react-router-dom";
import LoadingOutlined from "@ant-design/icons"
import React, { useState } from 'react';
import axios from 'axios';
type FieldType = {
    name: string;
    desciption: string;
    image: any
};
const CategoryAdd = () => {
    const [addCategory, { isLoading }] = useAddCategoryMutation();
    const navigate = useNavigate();
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

    const onFinish = async (values: ICategory) => {
        const fileUrls = await SubmitImage();
        values.image = fileUrls;
        console.log("Form Values:", values);

        await addCategory(values)
            .unwrap()
            .then(() => navigate("/admin/category"))
            .catch((error) => {
                console.error("Lỗi thêm danh mục:", error);

            });
    };



    return (
        <div>
            <header className="mb-4">
                <h2 className="font-bold text-2xl">Thêm danh mục</h2>
            </header>
            <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 600 }}
                onFinish={onFinish}
                autoComplete="off"
            >
                <Form.Item<FieldType>
                    label="Tên danh mục"
                    name="name"
                    rules={[
                        { required: true, message: "Vui lòng nhập tên danh mục !" },
                        { min: 3, message: "Sản phẩm ít nhất 3 ký tự" },
                    ]}
                    hasFeedback
                >
                    <Input />
                </Form.Item>

                <Form.Item<FieldType> label="Mô tả" name="desciption"
                    rules={[
                        { required: true, message: "Vui lòng nhập mô tả !" },
                        { min: 3, message: "Sản phẩm ít nhất 3 ký tự" },
                    ]}
                    hasFeedback
                >
                    <Input />
                </Form.Item>

                <Form.Item<FieldType>
                    label="Ảnh"
                    name="image"
                    rules={[
                        { required: true, message: "Vui lòng chọn ảnh !" },
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
                        onClick={() => navigate("/admin/category")}
                    >
                        Quay lại
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default CategoryAdd;