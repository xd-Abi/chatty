import React, { useState } from 'react';
import { withPageAuthRequired, getAccessToken } from '@auth0/nextjs-auth0';
import { Poppins } from 'next/font/google';
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { RequestHandler } from '@/lib/requesthandler';
import { User } from '@/lib/models';
import SettingsDropdown from '@/components/settings-dropdown';

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['100', '400', '500', '600', '700'],
});

interface Props {
  me: User;
}

export default function Home(props: Props) {
  const { me } = props;
  const [searchText, setSearchText] = useState('');

  return (
    <React.Fragment>
      <main
        className={`bg-vivid min-h-screen flex flex-row ${poppins.className}`}
      >
        <div className="w-screen md:basis-2/5 xl:basis-1/5 p-5">
          <div className="flex items-center mt-5">
            <div className="flex flex-1">
              <p className="text-vivid text-xl font-semibold">Messages</p>
            </div>
            <div className="flex flex-1 justify-end">
              <SettingsDropdown me={me} />
            </div>
          </div>
          <div className="h-12 mt-5 bg-dim rounded-xl items-center flex px-3">
            <MagnifyingGlassIcon className="text-dim" width={24} height={24} />
            <input
              className="flex flex-1 ml-2 bg-transparent placeholder:text-dim focus:outline-none text-vivid"
              placeholder="Search"
              onChange={(e) => setSearchText(e.target.value)}
              value={searchText}
            />
          </div>
        </div>
        <div className="bg-dim hidden md:basis-3/5 md:block xl:basis-3/5 p-5"></div>
        <div className="hidden xl:basis-1/5 xl:block p-5"></div>
      </main>
      {/* <main className={`h-screen flex flex-row ${roboto.className}`}>
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
          <div className="mt-5">
            {searchText !== '' && (
              <div className="flex flex-1 px-1">
                <button className="text-primary">Add Friend</button>
              </div>
            )}
          </div>
        </div>
        <div className="hidden md:basis-3/5 md:block xl:basis-3/5 bg-white p-2">
          <div className="h-20 border-b p-3 flex items-center border-vivid">
            <div className="w-14 h-14 rounded-full border border-vivid bg-indigo-700"></div>
            <div className="font-semibold text-vivid text-lg ml-2">Niklas</div>
          </div>
        </div>
        <div className="hidden xl:basis-1/5 xl:block bg-white border-l border-vivid p-2"></div>
      </main> */}
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
