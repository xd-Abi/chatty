import React, { useRef, useState } from 'react';
import { withPageAuthRequired, getAccessToken } from '@auth0/nextjs-auth0';
import { Roboto } from 'next/font/google';
import { Dialog, Transition } from '@headlessui/react';
import {
  Cog6ToothIcon,
  ExclamationTriangleIcon,
  MagnifyingGlassIcon,
} from '@heroicons/react/24/outline';
import { RequestHandler } from '@/lib/requesthandler';
import { User } from '@/lib/models';
import SettingsDropdown from '@/components/settings-dropdown';

const roboto = Roboto({
  subsets: ['latin'],
  weight: ['100', '400', '500', '700'],
});

function FriendRequestModal() {
  const [isFriendsModalOpen, setIsFriendsModalOpen] = useState(false);
  const cancelButtonRef = useRef(null);

  return (
    <React.Fragment>
      <button onClick={() => setIsFriendsModalOpen(true)}>Test</button>
      <Transition.Root show={isFriendsModalOpen} as={React.Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          initialFocus={cancelButtonRef}
          onClose={setIsFriendsModalOpen}
        >
          <Transition.Child
            as={React.Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
          </Transition.Child>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <Transition.Child
                as={React.Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                  <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
                    <div className="sm:flex sm:items-start">
                      <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
                        <ExclamationTriangleIcon
                          className="h-6 w-6 text-red-600"
                          aria-hidden="true"
                        />
                      </div>
                      <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                        <Dialog.Title
                          as="h3"
                          className="text-base font-semibold leading-6 text-gray-900"
                        >
                          Deactivate account
                        </Dialog.Title>
                        <div className="mt-2">
                          <p className="text-sm text-gray-500">
                            Are you sure you want to deactivate your account?
                            All of your data will be permanently removed. This
                            action cannot be undone.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                    <button
                      type="button"
                      className="inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
                      onClick={() => setIsFriendsModalOpen(false)}
                    >
                      Deactivate
                    </button>
                    <button
                      type="button"
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                      onClick={() => setIsFriendsModalOpen(false)}
                      ref={cancelButtonRef}
                    >
                      Cancel
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </React.Fragment>
  );
}

interface Props {
  me: User;
}

export default function Home(props: Props) {
  const { me } = props;
  const [searchText, setSearchText] = useState('');

  return (
    <React.Fragment>
      <main className={`h-screen flex flex-row ${roboto.className}`}>
        <div className="w-screen md:basis-2/5 xl:basis-1/5 bg-white md:border-r md:border-vivid p-2">
          <div className="h-20 border-b p-3 flex items-center border-vivid">
            <img
              className="w-14 h-14 rounded-full border border-vivid"
              src={me?.avatar ?? '/images/placeholder-profile.jpg'}
            />
            <div>
              <p className="text-sm ml-2 text-vivid font-bold">{me?.name}</p>
              <p className="text-sm ml-2 text-dim font-normal">Hey there! 👋</p>
            </div>
            <div className="flex flex-1 justify-end">
              <SettingsDropdown />
            </div>
          </div>
          <div className="h-12 mt-5 bg-accent rounded-xl items-center flex p-3">
            <MagnifyingGlassIcon
              className="stroke-dim"
              width={24}
              height={24}
            />
            <input
              className="focus:outline-none flex flex-1 ml-2 bg-transparent text-dim"
              placeholder="Search or Add friends"
              onChange={(e) => setSearchText(e.target.value)}
              value={searchText}
            />
          </div>
          <div className="mt-5"></div>
        </div>
        <div className="hidden md:basis-3/5 md:block xl:basis-3/5 bg-white p-2">
          <div className="h-20 border-b p-3 flex items-center border-vivid">
            <div className="w-14 h-14 rounded-full border border-vivid bg-indigo-700"></div>
            <div className="font-semibold text-vivid text-lg ml-2">Niklas</div>
          </div>
        </div>
        <div className="hidden xl:basis-1/5 xl:block bg-white border-l border-vivid p-2"></div>
      </main>
    </React.Fragment>
  );
}

export const getServerSideProps = withPageAuthRequired({
  async getServerSideProps({ req, res }) {
    const accessToken = await getAccessToken(req, res);
    const requestHandler = new RequestHandler(accessToken?.accessToken ?? '');
    const me = await requestHandler.get<User>('api/me');
    return {
      props: {
        me,
      } as Props,
    };
  },
});
