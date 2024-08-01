import React from 'react';
import { Button, message, Popconfirm, Table } from 'antd';
import type { TableColumnsType, TableProps } from 'antd';
import { Link } from 'react-router-dom';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import instance from '@/configs/axios';
import { IProduct } from '@/common/types/product';

interface DataType {
  key: React.Key;
  name: string;
  age: number;
  address: string;
}



const ProductPage = () => {
  const [messageApi, contextHolder] = message.useMessage();
  const quertClient = useQueryClient();
const {data,isError,isLoading,error} = useQuery({
queryKey:['products'],
queryFn:async()=>{
  try {
    return await instance.get(`/products`)
  } catch (error) {
    throw new Error('Error loading')
  }
}
})
const {mutate} = useMutation({
  mutationFn:async(_id:number)=>{
    try {
      return await instance.delete(`/products/${_id}`)
    } catch (error) {
      throw new Error('Xóa sản phẩm thất bại')
    }
  },
  onSuccess:async()=>{
    messageApi.open({
      type: 'success',
      content: 'Xóa sản phẩm thành công',
    });
    quertClient.invalidateQueries({
      queryKey:['products']
    })
  },
  onError:async(error)=>{
    messageApi.open({
      type: 'error',
      content: error.message,
    });
  }
})
   const columns: TableColumnsType<DataType> = [
    
  {
    title: 'Name',
    dataIndex: 'name',
    showSorterTooltip: { target: 'full-header' },
    filters:[]
    // onFilter: (value, record) => record.name.indexOf(value as string) === 0,
    // sorter: (a, b) => a.name.length - b.name.length,
    // sortDirections: ['descend'],
  },
  {
    title: 'price',
    dataIndex: 'price',
    defaultSortOrder: 'descend',
    // sorter: (a, b) => a.age - b.age,
  },
  {
    title: 'description',
    dataIndex: 'description',
    filters: []
    // onFilter: (value, record) => record.address.indexOf(value as string) === 0,
  },
  {
    dataIndex: 'action',
    render:(_:any,product:any)=>{
      return <>
<div className="">
<Popconfirm
    title="Delete product"
    description="bạn có muốn xóa sản phẩm không?"
    onConfirm={()=> mutate(product._id)}
    okText="Yes"
    cancelText="No"
  >
    <Button danger>Delete</Button>
  </Popconfirm>
    <Button danger> <Link to={`add/${product._id}`}>Update</Link></Button>
</div>
      </>
    }
  }
];

const dataSource:any = data?.data?.data?.map((product:IProduct)=>({key:product.id,...product}));

// const onChange: TableProps<DataType>['onChange'] = (pagination, filters, sorter, extra) => {
//   console.log('params', pagination, filters, sorter, extra);
// };
if(isLoading)return <div className="">loading...</div>
if(isError)return <div className="">{error.message}</div>
    return (
        <div>
          {contextHolder}
        <div className="flex items-center justify-between md-5">
            <h2 className='text-2xl'>List Product</h2>
            <Button type='primary' ><Link to='add'>Add Product</Link></Button>
        </div>
        <Table
    columns={columns}
    dataSource={dataSource}
    // onChange={onChange}
    // showSorterTooltip={{ target: 'sorter-icon' }}
  />
        </div>
    )
}

export default ProductPage