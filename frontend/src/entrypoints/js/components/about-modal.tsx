import icon from '../../../assets/images/icon.png'
import glider from '../../../assets/images/glider.png'
import { Modal, ModalBaseProps } from './modal'
import { meshtasticIndiaTelegramLink } from '../utils/link-utils.ts'
import { IconBrandGithub } from '@tabler/icons-react'

const aboutModalTitle = (
  <div className="w-min-full mx-auto text-center pt-4 text-sm md:text-md">
    <div className="relative mx-auto w-16 h-16 mb-1">
      <img className="absolute -top-4 -right-6 w-10" src={glider} alt="Glider icon" />
      <img className="w-16 h-16 bg-opacity-90" src={icon} alt="Meshtastic icon" />
    </div>
    <h1 className="font-bold">Paragliding Meshtastic Map</h1>
    <h2>
      Created by{' '}
      <a target="_blank" rel="noreferrer" href="https://github.com/ketan">
        Ketan Padegaonkar
      </a>{' '}
      (inspiration{' '}
      <a target="_blank" rel="noreferrer" href="https://meshtastic.liamcottle.net/">
        Liam Cottle
      </a>
      )
    </h2>
    <div className="w-min-full mx-auto text-center space-x-1 mt-2">
      <a
        target="_blank"
        rel="noreferrer"
        href="https://github.com/ketan/paragliding-meshmap"
        title="GitHub"
        className="inline-flex items-center p-1.5 border border-transparent text-xs font-medium rounded-full shadow-sm text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#333333] bg-gray-100 hover:bg-gray-200"
      >
        <IconBrandGithub className="w-5 h-5 stroke-black" />
      </a>
    </div>
  </div>
)

function foundABug() {
  return (
    <div className="bg-gray-100 rounded p-2 border border-gray-200">
      <div className="font-semibold">I found an issue with this site, what do I do?</div>
      <div>
        Report it on the{' '}
        <a target="_blank" rel="noreferrer" href={meshtasticIndiaTelegramLink()}>
          telegram channel.
        </a>
      </div>
    </div>
  )
}

function howDoIFindMyselfOnTheMap() {
  return (
    <div className="bg-gray-100 rounded p-2 border border-gray-200">
      <div className="font-semibold">How do I see myself on the map?</div>
      <div>
        Check{' '}
        <a target="_blank" rel="noreferrer" href="https://bircom.in">
          this page
        </a>{' '}
        on getting started.
      </div>
    </div>
  )
}

function privacy() {
  return (
    <div className="bg-gray-100 rounded p-2 border border-gray-200">
      <div className="font-semibold">Concerned about privacy?</div>
      <div>
        This Meshtastic tracker is mainly intended for search-and-rescue (SAR) operations and offline messaging for retrieve etc.
        Consequently, your name, location, and any messages you send will be visible to everyone. Please avoid sharing any personal
        information on the Meshtastic service that you wouldn&apos;t want others to see.
      </div>
    </div>
  )
}

function legal() {
  return (
    <>
      <h3 className="font-semibold my-2">Legal</h3>
      <div className="bg-gray-100 rounded p-2 border border-gray-200">
        <ul className="list-disc list-inside">
          <li>
            This project is not affiliated with or endorsed by the{' '}
            <a target="_blank" rel="noreferrer" href="https://meshtastic.org">
              Meshtastic
            </a>{' '}
            project.
          </li>
          <li>The Meshtastic logo is the trademark of Meshtastic LLC.</li>
          <li>
            Map tiles provided by{' '}
            <a target="_blank" rel="noreferrer" href="https://www.openstreetmap.org/copyright">
              OpenStreetMap
            </a>{' '}
            and{' '}
            <a target="_blank" rel="noreferrer" href="https://maps.google.com">
              Google
            </a>
          </li>
        </ul>
      </div>
    </>
  )
}

export function AboutModal({ onClose, isOpen }: ModalBaseProps) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} header={`About`} footerButtons={[]}>
      {aboutModalTitle}
      {/* app info */}
      <div className="pt-4 pb-4 text-sm md:text-md">
        {/* faq */}
        <h3 className="font-semibold my-2">FAQ</h3>
        <div className="space-y-2">
          {foundABug()}
          {howDoIFindMyselfOnTheMap()}
          {privacy()}
        </div>
        {/* legal */}
        {legal()}
      </div>
    </Modal>
  )
}
