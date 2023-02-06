import { collection, getDocs } from "firebase/firestore/lite";
import { Card, Select, Table, Tag } from "antd"
import { ColumnsType } from "antd/es/table";
import { toast } from "react-toastify";
import { useState } from "react";

import { updateRole } from "../helpers";
import { IUser } from "../interfaces/User";
import { FirebaseDB } from "../services/firebase";


export const Users = () => {
  const [loading, setLoading] = useState(true)
  const [users, setUsers] = useState<IUser[]>([])

  const handleChangeRole = (docId: string, role: string) => {
    updateRole(docId, role).then(() => {
      toast.success('Rol Actualizado con Exito! 🚀', {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: false,
        theme: "light",
      });
    })
  }

  const userRef = collection(FirebaseDB, 'users')

  getDocs(userRef)
    .then((snapshot) => {
      setLoading(true)
      let users: any = []
      snapshot.docs.forEach((doc) => {
        users.push({ ...doc.data(), docId: doc.id })
        setUsers(users)
      })
    })
    .catch((error) => console.log(error))
    .finally(() => setLoading(false))

  const columns: ColumnsType<any> = [
    {
      title: 'Nombre de Usuario',
      dataIndex: 'displayName',
      key: 'displayName',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
      align: 'center'
    },
    {
      align: 'center',
      title: 'Rol',
      dataIndex: 'role',
      key: 'role',
      render: (role) => (
        <Tag>
          {role.toUpperCase()}
        </Tag>
      )
    },
    {
      title: 'Action',
      key: 'action',
      width: '150px',
      render: (user) => (
        <Select
          placeholder='Roles'
          style={{ width: '100%' }}
          onChange={(role) => handleChangeRole(user.docId, role)}
          value={user.role}
          options={
            [
              { label: 'Admin', value: 'admin' },
              { label: 'Jurado', value: 'jury' },
              { label: 'Usuario', value: 'user' },
            ]}
        />

      )
    }
  ];

  return (
    <Card bodyStyle={{ padding: 0 }}>
      <Table
        columns={columns}
        dataSource={users}
        scroll={{ x: 800 }}
        rowKey='docId'
        loading={loading}
      // onRow={(record, rowIndex) => ({
      //   onClick: event => {
      //     navigate(`/dashboard/categories/published/${record._id}`)
      //   }
      // })}
      />
    </Card>
  )
}