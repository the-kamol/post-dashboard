import { LayoutProps } from 'types/layout';
import Swatch from 'assets/svg/color-swatch.svg';
import { Nav } from './Nav';
import { SiteHead } from './SiteHead';

export const Layout: React.FC<LayoutProps> = ({
  children,
  pageTitle,
  onBackLink,
}) => (
  <>
    <SiteHead pageTitle={pageTitle} />
    <div className="flex md:flex-row flex-col">
      <Nav navItems={[{ title: 'Posts', image: Swatch, link: '/', id: 1 }]} />
      <main className="flex-auto bg-tertiary">
        <div className="h-12 border-b-[1px] bg-white border-slate-200 flex items-center justify-start px-3 md:px-6 py-1 md:py-4">
          {!!onBackLink && (
            <button
              onClick={onBackLink}
              className="hover:bg-slate-100 border-[1px] border-gray-300 p-2 mr-4 rounded"
              type="button"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M5.83333 11.0834L1.75 7.00002M1.75 7.00002L5.83333 2.91669M1.75 7.00002H12.25"
                  stroke="#2F2F2F"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          )}
          {pageTitle}
        </div>
        <div className="px-2 md:px-6 py-2 md:py-4">
          <div className="bg-white rounded-lg relative p-2 md:p-6 overflow-hidden">
            {children}
          </div>
        </div>
      </main>
    </div>
  </>
);
