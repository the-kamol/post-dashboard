export interface LayoutProps extends React.PropsWithChildren {
  pageTitle: string;
  onBackLink?: () => void;
}
