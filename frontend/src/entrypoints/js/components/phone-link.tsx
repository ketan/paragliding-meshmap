import { parsePhoneNumberWithError } from 'libphonenumber-js/max'
import { IconBrandTelegram, IconBrandWhatsapp } from '@tabler/icons-react'

interface PhoneLinkProps {
  phoneNumber: string
  whatsapp?: boolean
  telegram?: boolean
}

export function PhoneLink(props: PhoneLinkProps) {
  const parsedPhoneNumber = parsePhoneNumberWithError(props.phoneNumber)
  const phoneURI = parsedPhoneNumber.getURI()
  const formattedPhone = parsedPhoneNumber.formatInternational()
  const whatsappURI = `https://wa.me/${parsedPhoneNumber.countryCallingCode}${parsedPhoneNumber.nationalNumber}`
  const telegramURI = `https://t.me/+${parsedPhoneNumber.countryCallingCode}${parsedPhoneNumber.nationalNumber}`
  const whatsappLink = (
    <a href={whatsappURI} target="_blank" rel="noreferrer">
      <IconBrandWhatsapp className={'w-4 h-4 stroke-black inline ms-2'} />
    </a>
  )
  const telegramLink = (
    <a href={telegramURI} target="_blank" rel="noreferrer">
      <IconBrandTelegram className={'w-4 h-4 stroke-black inline ms-2'} />
    </a>
  )
  const phoneLink = <a href={phoneURI}>{formattedPhone}</a>
  return (
    <span>
      {phoneLink}
      {props.whatsapp && whatsappLink}
      {props.telegram && telegramLink}
    </span>
  )
}
