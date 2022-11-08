import Head from 'next/head';
import { LayoutProps } from 'types/layout';

type SiteHeadProps = Partial<LayoutProps>;

export const SiteHead: React.FC<SiteHeadProps> = ({ pageTitle }) => (
  <Head>
    <title>{pageTitle}</title>
    <meta name="viewport" content="initial-scale=1.0, width=device-width" />
  </Head>
);
