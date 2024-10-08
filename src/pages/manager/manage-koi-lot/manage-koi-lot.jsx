import React from 'react'
import CRUDTemplate from '../../../conponent/crud-template/crud-template'

function ManageKoiLot() {

    const columns = [
         {
            title: "Name",
            dataIndex: "name",
            key: "name",
         },
         {
            title: "Breed Id",
            dataIndex: "breedId",
            key: "breedId",
         },
         {
            title: "Price",
            dataIndex: "price",
            key: "price",
         },
         {
            title: "Vendor",
            dataIndex: "vendor",
            key: "vendor",
         },
         {
            title: "Gender",
            dataIndex: "gender",
            key: "gender",
         },
         {
            title: "Born Year",
            dataIndex: "bornYear",
            key: "bornYear",
         },
         {
            title: "Size",
            dataIndex: "size",
            key: "size",
         },
         {
            title: "Origin",
            dataIndex: "origin",
            key: "origin",
         },
         {
            title: "Description",
            dataIndex: "description",
            key: "description",
         },
         {
            title: "Quantity",
            dataIndex: "quantity",
            key: "quantity",
         },
         {
            title: "Images",
            dataIndex: "images",
            key: "images",
         },
    ]
  return (
    <div>
        <CRUDTemplate columns={columns} name="Koi Lot" />
    </div>
  )
}

export default ManageKoiLot