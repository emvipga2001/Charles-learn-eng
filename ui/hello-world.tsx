import React from 'react'

export default async function HelloWorld() {
  async function getContent() {
    await new Promise(reslove => setTimeout(reslove, 1000))
    return "Hello world!!!";
  }
  const content = await getContent();
  return (
    <div>{content}</div>
  )
}
