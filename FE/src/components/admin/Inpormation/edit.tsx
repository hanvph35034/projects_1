import { useGetInformationByIdQuery, useUpdateInformationMutation } from "../../../api/information"
import { IInformation } from '../../../interfaces/information';
import { Button, Form, Input, Skeleton } from "antd";
import { useEffect } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate, useParams } from "react-router-dom";
type FieldType = {
    title: string,
    email: string,
    phone: number,
    image: any,
    logo: any,
    address: string,
    nameStore: string,
};
const InformationEdit = () => {
    const { idInformation } = useParams<{ idInformation: string }>();
    const { data: contactData, isLoading } = useGetInformationByIdQuery(idInformation || "");
    const [updateContact] = useUpdateInformationMutation();
    const navigate = useNavigate();
    const [form] = Form.useForm();

    useEffect(() => {
        form.setFieldsValue({
            title: contactData?.data.title,
            email: contactData?.data.email,
            phone: contactData?.data.phone,
            image: contactData?.data.image,
            logo: contactData?.data.logo,
            address: contactData?.data.address,
            nameStore: contactData?.data.nameStore,
        });
    }, [contactData]);
    const onFinish = (values: IInformation) => {
        updateContact({ ...values, _id: idInformation })
            .unwrap()
            .then(() => navigate("/admin/information"));
    };
    return (
        <div>
            <header className="mb-4">
                <h2 className="font-bold text-2xl">Sửa thông tin</h2>
            </header>
            {isLoading ? (
                <Skeleton />
            ) : (
                <Form
                    form={form}
                    name="basic"
                    labelCol={{ span: 8 }}
                    wrapperCol={{ span: 16 }}
                    style={{ maxWidth: 600 }}
                    onFinish={onFinish}
                    autoComplete="off"
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
                            { required: true, message: "Vui lòng nhập link ảnh !" },
                        ]}
                        hasFeedback
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item<FieldType>
                        label="Logo"
                        name="logo"
                        rules={[
                            { required: true, message: "Vui lòng nhập link logo !" },
                        ]}
                        hasFeedback
                    >
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
                        <Button htmlType="submit" className="mx-4">
                            {isLoading ? (
                                <AiOutlineLoading3Quarters className="animate-spin" />
                            ) : (
                                "Sửa"
                            )}
                        </Button>
                        <Button

                            className="ml-2 text-blue-500"
                            onClick={() => navigate("/admin/information")}
                        >
                            Quay lại
                        </Button>
                    </Form.Item>
                </Form>
            )}
        </div>
    );
};

export default InformationEdit;