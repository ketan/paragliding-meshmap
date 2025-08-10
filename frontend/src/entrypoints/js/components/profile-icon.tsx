import { UserProfile } from '../utils/profile.ts'
import { useState } from 'react'
import { ArrowRightFromBracketIcon, UserIcon, UserShieldIcon } from '../utils/icon-constants.ts'

import { HeaderIcon } from './header-icon.tsx'
import { isAdmin } from '../utils/ui-util.tsx'

interface ProfileIconProps {
  userProfile: UserProfile
  onProfileClick: () => void
}

export function ProfileIcon({ onProfileClick, userProfile }: ProfileIconProps) {
  const [dropdownVisible, setDropdownVisible] = useState(false)

  if (userProfile?.profilePhotoUrl) {
    const icon = () => (
      <img src={userProfile.profilePhotoUrl} className="rounded-full min-w-8 max-w-8 min-h-8 max-h-8" alt={`Profile icon`} />
    )

    return (
      <>
        <HeaderIcon
          icon={icon}
          onClick={() => setDropdownVisible(!dropdownVisible)}
          onMouseOver={() => setDropdownVisible(true)}
          onMouseOut={() => setDropdownVisible(false)}
        ></HeaderIcon>
        <div
          className={`dropdown-content ${dropdownVisible ? 'block' : 'hidden'} absolute right-4 bg-white shadow-lg z-10000 rounded border-2 border-gray-200 grid grid-cols-1 divide-y divide-gray-200`}
          onMouseOver={() => setDropdownVisible(true)}
          onMouseOut={() => setDropdownVisible(false)}
        >
          {/* Add your custom dropdown content here */}
          <button className="block px-4 py-2 text-gray-800 hover:bg-gray-200 text-left" onClick={onProfileClick}>
            <UserIcon className="h-4 w-4 inline-block mr-3" />
            Profile
          </button>

          {isAdmin(userProfile) && (
            <button
              className="block px-4 py-2 text-gray-800 hover:bg-gray-200 text-left"
              onClick={() => (window.location.href = '/users.html')}
            >
              <UserShieldIcon className="h-4 w-4 inline-block mr-3" />
              Users
            </button>
          )}

          <button
            onClick={() => (window.location.href = '/auth/logout')}
            className="block px-4 py-2 text-gray-800 hover:bg-gray-200 text-left"
          >
            <ArrowRightFromBracketIcon className={'h-4 w-4 inline-block mr-3'} />
            Logout
          </button>
        </div>
      </>
    )
  }
}
