/** @jsxImportSource @emotion/react */
"use client"
import { css } from '@emotion/react'

const Sample = () => {
  const sampleStyle = css`
    background: tomato;
  `;


  return (
    
    <button css={[sampleStyle]}>Sample</button>
  )
}

export default Sample