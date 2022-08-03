import { DeleteOutlined, EditFilled } from '@ant-design/icons'
import { Button } from 'antd'
import React from 'react'
import { COLORS } from '../../constants/colors'
import { IAttribute } from '../../types/ICollection'

type IField = IAttribute & {name: string};

const Field: React.FC<IAttribute & {name: string; onEdit: (field: IField) => void; onDelete: (field: IField) => void}> = ({type, displayName, name, onDelete, onEdit}) => {
  return (
    <div className='flex bg-white rounded-lg items-center mt-4'>
      <div style={{width: 50}} className="py-5 px-3 text-xl bg-blue-400 text-white rounded-tl-lg rounded-bl-lg">
        Ab
      </div>
      <div style={{flex: 2, color: COLORS.blackText}} className="py-5 pl-3 text-sm font-medium">
        {displayName}
      </div>
      <div style={{flex: 2, color: COLORS.grey}} className="py-5 pl-3 text-sm">
        {type}
      </div>
      <div style={{flex: 3}} className="flex justify-end pr-4">
        <Button onClick={() => onEdit({type, displayName, name})} icon={<EditFilled />} type="text" />
        <Button onClick={() => onDelete({type, displayName, name})} className='ml-3' icon={<DeleteOutlined />} type="text" />
      </div>
    </div>
  )
}

export default Field