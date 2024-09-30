import { Table } from 'antd'
import React from 'react'
import api from '../../config/axios';

function CRUDTemplate() {

    const [datas, setDatas] = useState([]);

    // GET
    const fetchData = () => {}

    // CREATE or UPDATE
    const handleSubmit = () => {}

    // DELETE
    const handleDelete = (id) => {}
  return (
    <Table />
  )
}

export default CRUDTemplate