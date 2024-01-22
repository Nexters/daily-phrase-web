import React from 'react'
import { Pagination } from '../ui/pagination';

interface Props {
    pagination: {current: number; size: number;}
}

export const ManagePagination = ({pagination}: Props) => {
  return (
    <Pagination/>
  )
}
