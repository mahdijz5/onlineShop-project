import { Typography } from '@mui/material'
import { useContext, useEffect, useState } from 'react'
import { General } from '../../../context/context'
import { getComments } from '../../../services/user'
import EmptyCart from '../../EmptyCart'
import Comment from './Comment'


const Comments = () => {
  const { user, refresh, setRefresh } = useContext(General)
  const [comments, setComments] = useState([])

  useEffect(() => {
    if(user.name != undefined) {
      getComments(user._id, ({ data }, err) => {
        if (err) {
          console.log(err)
          return
        } else {
          setComments(data.comments)
        }
      })
    }
  }, [refresh,user])

  return (
    <>
      {comments.length > 0 ? comments.map((c,index) => (
        <Comment key={index} comment={c}/>
      )) : ( 
        <>
          <EmptyCart width={"100px"} height={"100px"} />
          <Typography variant="subtitle2">شما تا هیچ کامنتی وارد نکردید</Typography>
        </>
      )}
    </>
  )
}

export default Comments