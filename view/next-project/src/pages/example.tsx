import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import styled from "styled-components";
import MainLayout from "@components/layout/MainLayout";
import FlatCard from "@components/common/FlatCard";
import GlassCard from "@components/common/GlassCard";

export default function Example() {
  const imagePath = "/header-logo.svg";
  return (
    <MainLayout>
      <GlassCard>
        <Image src={imagePath} height={30} width={142} />
      </GlassCard>
      <FlatCard>Hello World</FlatCard>
    </MainLayout>
  );
}
