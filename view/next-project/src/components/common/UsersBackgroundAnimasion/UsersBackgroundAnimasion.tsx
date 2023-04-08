import css from '@emotion/css'
import React from 'react'
import Particles from 'react-particles'

export const AdventCalendarHeroAnimation = () => {
  {/*表示領域を取得するライブラリを使用しています。直接値を入れても使えます。*/}
  const { currentWidth, currentHeight } = useWindowSize()

  return (
    <div css={heroStyle(heroBackgroundImage)}>
        {/* Qiita Advent Calendar の ロゴを入れます */}
        <img src={'./logo-advent_calendar.svg'} css={heroAnimationLogoStyle} />
        {/* react-particles-jsで雪を表現しています */}
        <Particles
            width={`${currentWidth}px`}
            height={`${currentHeight}px`} 
            style={{ display: 'block' }}
            params={{
                particles: {
                    number: {
                        value: 20,
                        density: {
                            enable: true,
                            value_area: 2000,
                        },
                    },
                    size: {
                        value: 8,
                        random: true,
                    },
                    opacity: {
                        anim: {
                            enable: false,
                        },
                        value: 1,
                        random: false,
                    },
                    move: {
                        direction: 'bottom',
                        out_mode: 'out',
                        speed: 6,
                        random: false,
                    },
                    line_linked: {
                        enable: false,
                    },
                },
            }}
        />
        {/* 画面下にある丘の画像を入れます */}
        <img src={'./image-back_hill.svg'} css={heroHillStyle} />
        <img src={'./image-front_hill.svg'} css={heroHillStyle} /> 
    </div>
  )
}
const heroStyle = (heroBackgroundImage: string) =>
  css({
    backgroundImage: `url(${heroBackgroundImage: string})`, // 背景画像を設定しています。
    backgroundSize: 'contain',
    position: 'relative',
    width: '100%',
  })

const logoAnimation = keyframes({
  '0%': {
    opacity: 0,
    transform: 'translate(-50%, -100%) scale(1.5)',
    ...viewportXS({
      transform: 'translate(0, 0) scale(1.5)',
    }),
  },
  '100%': {
    opacity: 1,
    transform: 'translate(-50%, -100%) scale(1)',
    ...viewportXS({
      transform: 'translate(0, 0) scale(1)',
    }),
  },
})

const heroAnimationLogoStyle = css({
  animationDelay: '0s',
  animationDuration: '3s',
  animationName: logoAnimation,
  left: '50%',
  maxWidth: 752,
  padding: `0 ${getSpace(2)}px`,
  position: 'absolute',
  top: '50%',
  transform: 'translate(-50%, -100%)',
  width: '100%',
  zIndex: 10,
})


const heroHillStyle = css({
  bottom: 0,
  left: '50%',
  minWidth: 1280,
  position: 'absolute',
  transform: 'translateX(-50%)',
  width: '100%',
  zIndex: 10,
  filter: 'drop-shadow(0px 4px 16px rgba(0, 0, 0, 0.5))',
})