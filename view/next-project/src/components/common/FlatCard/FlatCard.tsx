import React from 'react';
import s from './FlatCard.module.css'

interface FlatCardProps {
  align?: string;
  justify?: string;
  width?: string;
  height?: string;
  gap?: string;
  children?: React.ReactNode;
}

const FlatCard = (props: FlatCardProps) => {
  return (
    <div className={`${s.FlatCardContainer} ${s["align-"+props.align || "end"]} ${s["justify-"+props.align || "end"]}`}>
      <div>{ props.children }</div>
    </div>
  )
}

export default FlatCard
