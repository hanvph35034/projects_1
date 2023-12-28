//add tintuc
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useAddTintucMutation } from '@/api/tintuc';
import UpLoand from '../../Image/UploadImageTintuc';
import { Button, Cascader, Checkbox, Col, Form, Input, notification, Row, Select, Space } from 'antd';
const ThemTinTuc = () => {
  const navigate = useNavigate()
  const [addtintuc] = useAddTintucMutation();
  const [img, setImg] = useState<any>([]);
  const handleImage = (url: string) => {
    setImg([...img, url]);
  };
  const handleImageRemove = (url: string) => {
    setImg((prevImg: any) => prevImg.filter((imageUrl: string) => imageUrl !== url));
  };
  const { TextArea } = Input;
  const onFinish = (tintucs: any) => {
    console.log(tintucs);
    const product = {
      tieude: tintucs.tieude,
      noidung: tintucs.noidung,
      image: img,
      trang_thai: "active",
    }


    // return;
    addtintuc(product as any);


    navigate('/admin/tintuc');
    notification.success({
      message: 'Success',
      description: 'Thêm sản phẩm thành công',
    });
  };
  return (
    <div>
      <Form
        name="basic"
        labelCol={{ span: 4 }}
        wrapperCol={{ span: 20 }}
        style={{ maxWidth: 800, margin: '0 auto', }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
      >
        <Form.Item
          label="Tiêu Đề Tin tức "
          name="tieude"
          rules={[{ required: true, message: 'Please input your tieu de!' },]}
        >
          <Input />
        </Form.Item>
        <Form.Item label="Trạng thái" name="trang_thai">
          <Select>
            <Select.Option value="active">active</Select.Option>  <Select.Option value="deactive">deactive</Select.Option>
          </Select>
        </Form.Item>
        <Form.Item label="Image" name="image">
          <UpLoand onImageUpLoad={handleImage} onImageRemove={handleImageRemove} />
        </Form.Item>
        <Form.Item label="Nội Dung" name="noidung">
          <TextArea rows={4} />
        </Form.Item>
        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button
            type="primary"
            htmlType="submit"
            style={{ backgroundColor: '#1890ff', color: '#fff' }}
            onMouseEnter={(e) => e.target.style.backgroundColor = 'red'}  // Khi di chuột vào
          >
            Thêm Mới Tin Tức
          </Button>
        </Form.Item>

      </Form>
    </div>
  )
}

export default ThemTinTuc