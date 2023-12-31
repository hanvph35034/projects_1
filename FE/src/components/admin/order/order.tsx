import React, { useEffect, useState } from 'react';
import { Button, Table, Spin, notification, Select, Input, DatePicker } from 'antd';
import { FolderViewOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './a.css';
const { RangePicker } = DatePicker;

function App() {
  const [data, setData] = useState([]);
  const [editedData, setEditedData] = useState({
    phone: '',
    address: '',
    status: '',
  });

  useEffect(() => {
    axios.get('http://localhost:8080/api/GetAllOrder')
      .then(response => setData(response.data.data.data))
      .catch(error => console.log(error));
  }, []);

  async function deleteOrder(_id) {
    if (_id) {
      const response = await axios.get(`http://localhost:8080/api/deleteOrder?_id=${_id}`);
      if (response.status === 200) {
        window.location.reload();
      }
    }
  }

  const dataSource = [
    {
      key: '1',
      code: 'DH0001',
      name: 'Mike',
      phone: '0349791128',
      age: 32,
      moneny: '100000',
      product: 4,
      address: '10 Downing Street',
    },
    {
      key: '2',
      code: 'DH0002',
      name: 'John',
      phone: '0349791128',
      age: 42,
      moneny: '100000',
      product: 5,
      address: '10 Downing Street',
    },
    {
      key: '3',
      code: 'DH0002',
      name: 'John',
      phone: '0349791128',
      age: 42,
      moneny: '100000',
      product: 5,
      address: '10 Downing Street',
    },
    {
      key: '4',
      code: 'DH0002',
      name: 'John',
      phone: '0349791128',
      age: 42,
      moneny: '100000',
      product: 5,
      address: '10 Downing Street',
    },
    {
      key: '5',
      code: 'DH0002',
      name: 'John',
      phone: '0349791128',
      age: 42,
      moneny: '100000',
      product: 5,
      address: '10 Downing Street',
    },
    {
      key: '6',
      code: 'DH0002',
      name: 'John',
      phone: '0349791128',
      age: 42,
      moneny: '100000',
      product: 5,
      address: '10 Downing Street',
    },
  ];

  const columns = [
    {
      title: 'Mã đơn',
      dataIndex: 'code',
      key: 'code',
    },
    {
      title: 'Người mua',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'SĐT',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Địa chỉ',
      dataIndex: 'address',
      key: 'address',
    },
    {
      title: 'Số tiền',
      dataIndex: 'moneny',
      key: 'moneny',
      render: (data: any) => {
        return <p>{
          new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
          }).format(data)}</p>;
      },
    },
    {
      title: 'Số sản phẩm',
      dataIndex: 'product',
      key: 'product',
    },
    {
      title: 'Action',
      key: 'action',
      render: ({ key: id }: { key: number | string }) => {
        return (
          <>
            <Button>
              <Link to={`/admin/product/update/${id}`}><FolderViewOutlined /></Link>
            </Button>
          </>
        );
      },
    },
  ];

  return (
    <>
      <header>
        <div className="flex justify-between">
          <h2 className="text-2xl">Quản lý hóa đơn</h2>
          <p className="text-xl red mr-5">Month 10: 
          <span className='text-red-600'>{new Intl.NumberFormat("vi-VN", {
            style: "currency",
            currency: "VND",
          }).format(300000)}</span></p>
        </div>
        <div className="mt-2 flex">
          <Input
            placeholder="Tìm hóa đơn theo mã đơn"
            style={{ width: 200 }}
          />
          <Input
            className='ml-3'
            placeholder="Tìm hóa đơn theo tên người mua"
            style={{ width: 200 }}
          />
          <RangePicker className='ml-3' />
          <Select
            className='ml-2'
            defaultValue="wait"
            style={{ width: 200 }}
            options={[
              { value: 'wait', label: 'Chờ xét duyệt' },
              { value: 'prepare', label: 'Chuyển bị hàng' },
              { value: 'transport', label: 'Vận chuyển' },
              { value: 'success', label: 'Hoàn thành' },
            ]}
          />
        </div>
      </header>
      <>
        <Table className='mt-4' dataSource={dataSource} columns={columns} />;
      </>
    </>
  );
}

export default App;
