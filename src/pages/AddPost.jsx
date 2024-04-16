import React from 'react'
import {Container} from '../components/index'
import { PostFrom } from '../components/index'

function AddPost() {
  return (
    <div className='py-8'>
        <Container>
          <PostFrom />
        </Container>
    </div>
  )
}

export default AddPost