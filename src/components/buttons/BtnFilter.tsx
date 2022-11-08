import { BtnFilterProps } from 'components/buttons/types/btnFilter';

export const BtnFilter: React.FC<BtnFilterProps> = (props) => {
  const filterValue = (filterType: string) => {
    switch (filterType) {
      case 'Published':
        return props.posts.filter((post: any) => post.status === 'Published')
          .length;
      case 'Draft':
        return props.posts.filter((post) => post.status === 'Draft').length;
      default:
        return props.posts.length;
    }
  };

  return (
    <button
      type="button"
      onClick={props.onClick}
      className={`flex flex-col-reverse sm:flex-row items-center justify-between btnSecondary text-sm w-full py-2 pl-3 pr-2 rounded-lg ${
        props.filterStatus === props.filterType
          ? 'text-white bg-primary'
          : 'text-secondary bg-secondary'
      }`}
    >
      {props.title}
      <span
        className={`text-white text-xs gilroy rounded-[46px] inline-flex items-center justify-center px-2 py-1 sm:mb-0 mb-1 bg-primaryBlueLight ${
          props.filterStatus === props.filterType && 'bg-tertiary'
        }`}
      >
        {filterValue(props.filterType)}
      </span>
    </button>
  );
};
