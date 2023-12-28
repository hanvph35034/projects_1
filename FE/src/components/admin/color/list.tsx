
import { Button, Space, Spin, Table, Tag, notification ,Modal} from 'antd';
import React, { useEffect } from 'react';

import {DeleteTwoTone, EditOutlined, ExclamationCircleOutlined} from 
'@ant-design/icons'; 

import { Link } from 'react-router-dom';
import { useDeleteColorMutation, useGetColorsQuery } from '@/api/color';
import { IColor } from '@/interfaces/color';
type Props = {};
const Color = (props: Props) => {
    const { data: colorData ,refetch} = useGetColorsQuery();
    const [removeColor] = useDeleteColorMutation()
    useEffect(() => {
        refetch();
    }, [colorData]);
    const handleSoftDelete = async (id: string) => {
        Modal.confirm({
            title: 'Are you sure delete this task?',
            icon: <ExclamationCircleOutlined />,
            content: 'Some descriptions',
            okText: 'Yes',
            okType: 'danger',
            cancelText: 'No',
            onOk: async () => {
                try {
                    await removeColor(id);
                    notification.success({
                        message: 'Success',
                        description: 'size soft deleted successfully!',
                    });
                    refetch();
                } catch (error) {
                    notification.error({
                        message: 'Error',
                        description: 'Failed to soft delete size',
                    });
                }
            },
            onCancel() {
                console.log('Cancel');
            },
        });
    };
    const dataSource = colorData?.color.map((size: IColor) => ({
        key: size._id,
        name: size.name

    }));
    console.log(dataSource);
    

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    key: 'name',
    render: (text: any) => <a>{text}</a>,
  },

  {
    title: 'Action',
    key: 'action',
    render: ({ key: id }: { key: number | string }) => {
        return (
            <>
                <Button>
                    <Link to={`/admin/color/update/${id}`}><EditOutlined /></Link>
                </Button>
                <Button onClick={() => handleSoftDelete(id.toString())} type="text" danger className="ml-2">
                    <DeleteTwoTone />
                </Button>
            </>
        );
    },
  },
];

return(
    
    <div>
       <header className="flex items-center justify-between mb-4">
            <h2 className="text-2xl">Quản lý Color</h2>
            <Button type="primary" danger>
                <Link to="/admin/color/add">Thêm sản Color</Link>
            </Button>
        </header>
      <Table dataSource={dataSource} columns={columns} />
    </div>
)
}
export default Color;