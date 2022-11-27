import { Stack, Typography } from '@mui/material';
import { useContext, useEffect, useState } from 'react';
import { General } from '../../../context/context';
import EmptyCart from '../../EmptyCart';
import ProductCard from '../ProductCard';

function List() {
    const { user ,refresh} = useContext(General)

  
    return (
        <>
            <Stack gap="20px" textAlign="center" alignItems='center'>
                {
                    user.list != undefined ? user.list.length > 0 ? user.list.map((product, index) => (
                        <ProductCard product={product} user={user} key={index} deleteOption/>

                    )) : (
                        <>
                            <EmptyCart width={"100px"} height={"100px"} />
                            <Typography variant="subtitle2">لیست علاقمندی شما خالی است</Typography>
                        </>
                    ) : (
                        <>
                            
                            <EmptyCart width={"100px"} height={"100px"} />
                            <Typography variant="subtitle2">لیست علاقمندی شما خالی است</Typography>
                        </>
                    )
                    
                }
            </Stack>
        </>
    )
}

export default List