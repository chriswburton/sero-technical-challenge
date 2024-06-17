import { FC, ReactNode } from 'react';
import Logo from '../logo.png';

interface Props {
  children: ReactNode | ReactNode[];
}

export const Layout: FC<Props> = ({ children }) => {
  return (
    <div className={'flex'}>
      <div className="flex flex-none w-72 h-screen flex-col justify-between border-e bg-white">
        <div className="space-y-4">
          <img src={Logo} alt={'Sero Cookbook'} className={'size-40 mx-auto'} />

          <ul className="mt-6 space-y-1">
            <li>
              <a
                href="#"
                className="block rounded-lg bg-gray-100 px-4 py-2 text-sm font-medium text-gray-700"
              >
                Recipes
              </a>
            </li>
          </ul>
        </div>

        <div className="sticky inset-x-0 bottom-0 border-t border-gray-100">
          <a
            href="#"
            className="flex items-center gap-2 bg-white p-4 hover:bg-gray-50"
          >
            <img
              alt=""
              src="https://images.unsplash.com/photo-1600486913747-55e5470d6f40?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
              className="size-10 rounded-full object-cover"
            />

            <div>
              <p className="text-xs">
                <strong className="block font-medium">Top Chef</strong>

                <span> top.chef@sero.life </span>
              </p>
            </div>
          </a>
        </div>
      </div>
      <div className={'flex-grow p-4'}>{children}</div>
    </div>
  );
};
