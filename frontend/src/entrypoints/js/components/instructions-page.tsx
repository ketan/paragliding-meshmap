export function InstructionsPage() {
  return (
    <div className="text-sm md:text-md">
      <div className="block w-full sm:text-sm">
        <div className="rounded-md shadow-sm bg-yellow-200 p-4">
          <div className="pl-2">
            <p className="font-semibold text-base text-center pb-4">Read this carefully before you proceed!</p>

            <ul className="list-disc list-inside space-y-1 md:text-sm text-xs list-outside">
              <li>
                Importing this config will share your location <span className="font-semibold italic underline">publicly</span> every 180
                seconds. Do not shorten this interval to avoid increased battery use. Disable GPS or turn off the device if you don’t want
                to share your location.
              </li>

              <li>
                Bluetooth pin is set as{' '}
                <code className="font-mono rounded-[0.25em] py-0.5 px-0.75 my-0 -mx-0.75 bg-yellow-600">123456</code>, you may change that
                to more secure pin from the Meshtastic phone application.
              </li>

              <li>Do not turn off Bluetooth on your Meshtastic device, or the app won&apos;t connect.</li>

              <li>
                Check the{' '}
                <a href="https://meshtastic.org/docs/configuration/" target="_blank" rel="noreferrer">
                  Meshtastic documentation
                </a>{' '}
                for more settings.
              </li>

              <li>Happy meshing! Great winds and clear skies!</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )

  // return (
  //   <div className="p-4">
  //     <h2 className="text-lg font-bold mb-2">Instructions</h2>
  //     {/* TODO: Fill instructions here */}
  //     <div className="bg-yellow-100 p-2 rounded">Instructions will go here.</div>
  //   </div>
  // )
}
