import React from 'react';
import { Transition, Menu } from '@headlessui/react';
import { Cog6ToothIcon } from '@heroicons/react/24/outline';
import { User } from '@/lib/models';

interface Props {
  me: User;
}

export default function SettingsDropdown(props: Props) {
  const { me } = props;

  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <Menu.Button>
          <Cog6ToothIcon className="stroke-dim" width={24} height={24} />
        </Menu.Button>
      </div>

      <Transition
        as={React.Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-lg bg-white shadow-lg ring-1 ring-slate-700 ring-opacity-5 focus:outline-none">
          <div className="py-1">
            <Menu.Item>
              <div className="px-4 py-2 border-b border-slate-200">
                <p className="text-sm font-semibold">Signed in as</p>
                <p className="text-sm font-regular truncate">{me.email}</p>
              </div>
            </Menu.Item>
            <Menu.Item>
              {({ active }) => (
                <a
                  href="/api/auth/logout"
                  className={`block px-4 py-2 text-sm ${
                    active ? 'bg-red-100 text-red-700' : 'text-red-500'
                  }`}
                >
                  Sign Out
                </a>
              )}
            </Menu.Item>
          </div>
        </Menu.Items>
      </Transition>
    </Menu>
  );
}
