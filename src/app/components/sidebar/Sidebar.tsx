'use client'

import { Drawer } from '@mui/material'
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery';
import React, { useState } from 'react'
import { useControlSidebar } from '@/app/context/useControlSidebar'
import SidebarItems from './SidebarItems';
import { twMerge } from 'tailwind-merge';
import ButtonLogout from './ButtonLogout';
import Link from 'next/link';
import LogoTextVazada from '../LogoTextVazada';

export default function Sidebar() {

  const {isOpen, isCollapse, setIsOpen} = useControlSidebar();
  const theme = useTheme();
  const breakpointScreen = useMediaQuery(theme.breakpoints.up('md'));
  const [isSidebarHover, setIsSidebarHover] = useState<boolean>(false);
  
  const MIN_WIDTH = 65;
  const MAX_WIDTH = 250;
  const toggleWidth = (isCollapse && !isSidebarHover && breakpointScreen) ? MIN_WIDTH : MAX_WIDTH;

  function onHoverEnter() {
    if (breakpointScreen && isCollapse) {
      setIsSidebarHover(true)
    }
  };

  function onHoverLeave() {
    if (breakpointScreen && isCollapse) {
      setIsSidebarHover(false)
    }
  };

  return (
    <>
      <Drawer
        anchor='left'
        open={isOpen}
        onClose={setIsOpen}
        onMouseEnter={onHoverEnter}
        onMouseLeave={onHoverLeave}
        variant={breakpointScreen ? 'permanent' : 'temporary'}
        className={twMerge(!isCollapse && 'z-10')}
        sx={{
          transition: 'width 150ms',
          width: toggleWidth,
          flexShrink: 0,
          ...(isCollapse && {
            position: 'absolute'
          })
        }}
        slotProps={{
          paper: {
            sx: {
              transition: 'width 150ms',
              width: toggleWidth,
              boxSizing: 'border-box',
              overflow: 'hidden',
              borderWidth: 0,
              boxShadow: '4px 2px 5px var(--tw-shadow-color, rgba(0,0,0,0.2))',
              backgroundColor: 'var(--color-primary-2)',
              borderRight: 8,
              borderColor: 'var(--color-secondary-2)'
            }
          }
        }}
      >
        <div className={twMerge(
          'flex justify-center items-center min-h-18 px-1 pt-0.5 w-[242px] bg-primary-2 drop-shadow-[0px_2px_4px] drop-shadow-black/50',
          toggleWidth === 65 && 'justify-start'
        )}>
          <Link
            href={'/'}
            className='w-40'
          >
            <LogoTextVazada/>
          </Link>
        </div>
        
        <SidebarItems
          hideMenu={toggleWidth === 65}
          breakpointScreen={breakpointScreen}
          setIsSidebarHover={setIsSidebarHover}
        />

        <ButtonLogout
          hideMenu={toggleWidth === 65}
        />
          
      </Drawer>
      <div style={{
        minWidth: isCollapse && breakpointScreen ? MIN_WIDTH : 0,
      }}/>
    </>
  )
}
