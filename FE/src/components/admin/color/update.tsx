import React, { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Button, Form, Input, notification, InputNumber } from 'antd';
import { useGetSizeByIdQuery, useUpdateSizeMutation } from '@/api/sizes';
import { useGetColorQuery, useUpdateColorMutation } from '@/api/color';

const UpdateColor = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [updateColor] = useUpdateColorMutation();
    const { data, isLoading,refetch } = useGetColorQuery(String(id));

    
    const [form] = Form.useForm();
    useEffect(() => {
        form.setFieldsValue({
            id: data?.color._id,
            name: data?.color.name,
        });
    }, [data, form]);


    const onFinish = async (values: any) => {
        try {
            const updateColors = await updateColor({  ...values ,_id :id}).unwrap();
            navigate('/admin/color');
            notification.success({
                message: 'Cập nhật thành công',
                description: `The Color ${updateColors.name} has been updated.`,
                duration: 2,
            });
            refetch();
        } catch (error) {
            console.error('Error updating Size:', error);
            notification.error({
                message: 'Cập nhập thất bại',
                description: 'Đã xảy ra lỗi khi cập nhật màu',
                duration: 2,
            });
        }
    };

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <Form
                form={form}
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 16 }}
                style={{ maxWidth: 500, margin: '0 auto' }}
                onFinish={onFinish}
            >     
                <Form.Item label="Color Name" name="name" rules={[
                    { required: true, message: 'Please input your Name Color!' },
                    { min: 3, message: 'Color Name must be at least 5 characters.' },
                 
                ]}>
                    <Input />
                </Form.Item>
                <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
                    <Button  htmlType="submit">
                        Update Size
                    </Button>
                </Form.Item>
            </Form>
        </div>
    );
};

export default UpdateColor;
