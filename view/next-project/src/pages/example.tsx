import type { NextPage } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import styled from 'styled-components'
import MainLayout from '@components/MainLayout'
import FlatCard from '@components/FlatCard'

export default function Example() {
  return (
    <MainLayout>
      <FlatCard>Hello World</FlatCard>
      <FlatCard>Hello World</FlatCard>
      <FlatCard>Hello World</FlatCard>
      <FlatCard>Hello World</FlatCard>
    </MainLayout>
  )
}
