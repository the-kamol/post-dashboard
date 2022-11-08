import { BtnFilter } from 'components/buttons/BtnFilter';
import { BtnMain } from 'components/buttons/BtnMain';
import { Layout } from 'components/Layout';
import { Pagination } from 'components/Pagination';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { updateStatus } from 'redux/features/post';
import { useAppDispatch, useAppSelector } from 'redux/hook';

const MobileNavIcon = (
  <svg
    className="w-5 h-5 text-gray-500 dark:text-gray-400"
    aria-hidden="true"
    fill="currentColor"
    viewBox="0 0 20 20"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      fillRule="evenodd"
      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
      clipRule="evenodd"
    />
  </svg>
);

const Home = () => {
  const router = useRouter();
  const { posts = [] } = useAppSelector((state) => state.post);
  const dispatch = useAppDispatch();

  const [query, setQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [pageCount, setPageCount] = useState(0);
  const [pageItems, setPageItems] = useState(5);
  const [itemOffset, setItemOffset] = useState(0);

  // Search by posts title and filter them by status
  const endOffset = itemOffset + pageItems;
  const searchByTitle = () =>
    posts.filter((curr) =>
      curr.title.toLowerCase().includes(query.toLowerCase())
    );
  const filterPosts = (status?: string) => {
    if (status) return searchByTitle().filter((curr) => curr.status === status);
    return searchByTitle();
  };

  const filteredItems = useMemo(() => {
    switch (filterStatus) {
      case 'Published':
        return filterPosts('Published');
      case 'Draft':
        return filterPosts('Draft');
      default:
        return filterPosts();
    }
    return filterPosts();
  }, [query, filterStatus, posts]);

  // Time format setting
  dayjs.extend(relativeTime);

  useEffect(() => {
    setPageCount(Math.ceil(filteredItems.length / pageItems));
  }, [pageItems, filteredItems]);

  // Pagination settings
  const handleGetPageItems = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setPageItems(Number(e.target.value));
  };

  const handlePageClick = (e: { selected: number }) => {
    const newOffset = (e.selected * pageItems) % filteredItems.length;
    setItemOffset(newOffset);
  };

  // Status update notification
  const updateNotify = () =>
    toast.info('Choosen post status updated!', {
      position: 'top-right',
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: 'colored',
    });

  // Status change
  const handleStatusChange = (
    e: React.ChangeEvent<HTMLSelectElement>,
    id: number
  ) => {
    dispatch(updateStatus({ id, status: e.target.value }));
    updateNotify();
  };

  // Run on client side only
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <Layout pageTitle="Posts">
      <div className="flex flex-col sm:flex-row justify-between">
        <div className="relative lg:max-w-md sm:max-w-xs w-full">
          <div className="flex absolute top-2 right-3 items-center pl-3 pointer-events-none">
            {MobileNavIcon}
          </div>
          <input
            className="bg-secondary appearance-none border-2 border-gray-100 text[13px] text-secondary rounded w-full p-3 h-9 mb-2 sm:mb-0 focus:outline-none focus:bg-white focus:border-blue-500"
            placeholder="Search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
        <BtnMain
          title="Create Post"
          onClick={() => router.push('/create-post')}
          className="py-[10px] px-11"
        />
      </div>
      {posts.length > 0 && (
        <div className="flex md:justify-between justify-center md:w-full md:max-w-md gap-2 my-2">
          <BtnFilter
            title="All Statuses"
            filterStatus={filterStatus}
            filterType="All"
            onClick={() => setFilterStatus('All')}
            posts={posts}
          />
          <BtnFilter
            title="Draft"
            filterStatus={filterStatus}
            filterType="Draft"
            onClick={() => setFilterStatus('Draft')}
            posts={posts}
          />
          <BtnFilter
            title="Published"
            filterStatus={filterStatus}
            filterType="Published"
            onClick={() => setFilterStatus('Published')}
            posts={posts}
          />
        </div>
      )}
      <div className="overflow-x-auto md:overflow-visible postsTable my-6">
        <div className="sm:hidden text-blue-300">
          Scroll the table horizontally...
        </div>
        <table className="border-collapse min-w-[600px]  sm:w-full md:table-auto text-left -mx-6">
          <thead>
            <tr>
              <th className="w-1/12 border-b border-slate-200 gilroy text[13px] text-secondary pl-6">
                ID
              </th>
              <th className="md:w-2/5 w-2/6 border-b border-slate-200 gilroy text[13px] text-secondary px-3 md:px-6 py-3">
                Title
              </th>
              <th className="w-1/4 border-b border-slate-200 gilroy text[13px] text-secondary px-3 md:px-6 py-3">
                Time:
              </th>
              <th className="w-1/4 border-b border-slate-200 gilroy text[13px] text-secondary px-3 md:px-6 py-3">
                Status:
              </th>
            </tr>
          </thead>
          <tbody>
            {filteredItems.length ? (
              filteredItems.slice(itemOffset, endOffset).map((post) => (
                <tr key={post.id}>
                  <td className="border-b border-slate-200 font-medium text[13px] pl-6 py-8">
                    {post.id}
                  </td>
                  <td className="border-b border-slate-200 font-medium text[13px] px-3 md:px-6 py-8">
                    {post.title}
                  </td>
                  <td className="border-b border-slate-200 font-medium text[13px] px-3 md:px-6 py-8">
                    {dayjs(post.createdTime).fromNow()}
                  </td>
                  <td className="border-b gilroy border-slate-200 font-medium text[13px] px-3 md:px-6 py-8">
                    <select
                      value={post.status}
                      onChange={(e) => handleStatusChange(e, post.id)}
                    >
                      <option value="Draft">Draft</option>
                      <option value="Published">Published</option>
                    </select>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan={4}
                  className="border-b border-slate-200 font-medium text[13px] px-3 pl-6 py-8"
                >
                  There is no post
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {posts.length > 5 && (
        <Pagination
          pageItems={pageItems}
          pageCount={pageCount}
          onPageChange={handlePageClick}
          onChange={handleGetPageItems}
        />
      )}
    </Layout>
  );
};

export default Home;
