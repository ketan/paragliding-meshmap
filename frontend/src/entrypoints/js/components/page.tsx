import React, { useEffect, useState } from 'react'
import icon from '../../../assets/images/icon.png'
import { CircleInfoIcon, GearsIcon } from '../utils/icon-constants'
import { AboutModal } from './about-modal'
import { toast, ToastContainer } from 'react-toastify'
import { ConfigModal } from './config-modal.tsx'
import glider from '../../../assets/images/glider.png'
import { fetchUserProfile, UserProfile } from '../utils/profile.ts'
import { getRuntimeEnv } from 'vite-runtime-env-script-plugin/getRuntimeEnv'
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google'
import { LoadedState } from '../maps/loaded-state.tsx'
import { ProfileIcon } from './profile-icon.tsx'
import { HeaderIcon } from './header-icon.tsx'
import { fetchCsrfToken } from '../utils/csrf.ts'
import { ProfileModal } from './profile-modal.tsx'

interface PageProps extends React.PropsWithChildren {
  headerIcons?: React.ReactNode
  bannerMain?: React.ReactNode
  aboutModal: {
    show: boolean
    onClick: () => void
  }
  configModal: {
    show: boolean
    onClick: () => void
  }
  profileModal: {
    show: boolean
    onClick: () => void
  }
}

export function Page(props: PageProps) {
  const [userProfile, setUserProfile] = useState<UserProfile>()
  const [profileLoadedState, setProfileLoadedState] = useState<LoadedState>()

  useEffect(() => {
    async function getUserProfile() {
      setProfileLoadedState('loading')
      try {
        const profile = await fetchUserProfile()
        if (profile) {
          setUserProfile(profile)
          setProfileLoadedState('loaded')
        } else {
          setProfileLoadedState('error')
        }
      } catch (e) {
        setProfileLoadedState('error')
        console.log(e)
      }
    }

    getUserProfile()
  }, [])

  async function callback(credential: string) {
    const data = new URLSearchParams()
    data.append('credential', credential)
    setProfileLoadedState('loading')
    const response = await fetch('/auth/one-tap/callback', {
      method: 'post',
      body: data,
    })

    const body = await response.json()
    if (response.ok) {
      setUserProfile(body.user as UserProfile)
      setProfileLoadedState('loaded')
      await fetchCsrfToken(true)
    } else {
      setProfileLoadedState('error')
      let message = body.message
      if (typeof body.error === 'string') {
        message += ' ' + body.error
      }
      toast.error(message)
    }
  }

  const clientId = getRuntimeEnv('GOOGLE_CLIENT_ID')
  if (!clientId) {
    throw 'Unable to get google client id'
  }

  return (
    <>
      <div className="flex flex-col h-full w-full">
        <div className="flex flex-col h-full">
          {/* begin header */}
          <div className="flex bg-white p-2 border-gray-300 border-b h-16">
            <IconInHeader />
            <ApplicationName />
            {/* banner */}
            <div className="w-full mx-3 my-auto block relative">
            {props.bannerMain}
            </div>
            {/* header action buttons */}
            <HeaderActionButtons>
              <HeaderIcon icon={GearsIcon} tooltip="Configure" tooltipDir="bottom" onClick={() => props.configModal.onClick()} />
              <HeaderIcon icon={CircleInfoIcon} tooltip="About" tooltipDir="bottom-end" onClick={() => props.aboutModal.onClick()} />
              {profileLoadedState === 'loaded' && userProfile && (
                <ProfileIcon userProfile={userProfile} onProfileClick={() => props.profileModal.onClick()} />
              )}
              {(profileLoadedState === 'loaded' || profileLoadedState === 'error') && !userProfile && (
                <GoogleOAuthProvider clientId={clientId}>
                  <GoogleLogin
                    type="icon"
                    shape="circle"
                    itp_support={false}
                    useOneTap={true}
                    onSuccess={(response) => response.credential && callback(response.credential)}
                    onError={() => toast.error('There was an error logging you in!')}
                  />
                </GoogleOAuthProvider>
              )}
              {props.headerIcons}
            </HeaderActionButtons>
          </div>
          {/* end header */}

          {props.children}
        </div>
      </div>
      <ConfigModal onClose={() => props.configModal.onClick()} isOpen={props.configModal.show} />
      <AboutModal onClose={() => props.aboutModal.onClick()} isOpen={props.aboutModal.show} />
      <ProfileModal onClose={() => props.profileModal.onClick()} isOpen={props.profileModal.show} />
      <ToastContainer hideProgressBar theme="dark" />
    </>
  )
}

function HeaderActionButtons(props: React.PropsWithChildren) {
  return <div className="header flex my-auto ml-auto mr-0 sm:mr-2 space-x-1 sm:space-x-2">{props.children}</div>
}

function ApplicationName() {
  return (
    <div className="my-auto leading-tight hidden md:block">
      <a className="font-bold sm:text-sm md:text-base lg:text-xl text-nowrap" href="https://bircom.in/">
        Bircom Tracker
      </a>
    </div>
  )
}

function IconInHeader() {
  return (
    <a className="min-w-10 min-h-10 max-w-10 max-h-10 block m-auto relative mr-2.5" href="/">
      <img className="absolute -top-2 -right-5 w-7" src={glider} alt="Glider icon" />
      <img className="w-full h-full rounded bg-opacity-90" src={icon} alt="Meshtastic icon" />
    </a>
  )
}
