import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { Layout } from 'components/Layout';
import { useRouter } from 'next/router';
import { useAppDispatch, useAppSelector } from 'redux/hook';
import { createPost } from 'redux/features/post';
import { TPost } from 'types/post';
import { BtnMain } from 'components/buttons/BtnMain';
import { toast } from 'react-toastify';

const createPostSchema = yup.object({
  title: yup.string().required('Enter a title'),
  status: yup.string().required('Choose a status'),
  createdTime: yup.string().required('Pick a time'),
});

const CreatePost = () => {
  const resolver = yupResolver(createPostSchema);
  const dispatch = useAppDispatch();
  const router = useRouter();

  const { posts } = useAppSelector((state) => state.post);

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm<TPost>({ resolver });

  const notify = () =>
    toast.success('New post created succesfully!', {
      position: 'top-right',
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  const onSubmit = (data: TPost) => {
    Number(data.id);
    dispatch(createPost(data));
    reset();
    notify();
    router.back();
  };

  return (
    <Layout pageTitle="New Post" onBackLink={() => router.back()}>
      <h2 className="text-base mb-[18px]">Post Information</h2>
      <form
        className="flex flex-col max-w-[356px]"
        onSubmit={handleSubmit(onSubmit)}
      >
        <input
          className="bg-secondary p-3 mb-2 rounded-lg focus:outline-blue-600"
          type="text"
          placeholder="Title"
          {...register('title')}
        />
        {!!errors.title?.type && (
          <p className="text-red-500 mb-4 -mt-1">{errors.title.message}</p>
        )}
        <input
          type="number"
          hidden
          value={
            posts.length === 0
              ? 1
              : Number(posts[posts.length - 1].id) + Number(1)
          }
          {...register('id')}
        />
        <select
          {...register('status')}
          className="placeholder:text-orange-600 appearance-none block w-full p-3 mb-2 rounded-lg bg-secondary focus:outline-blue-600"
        >
          <option disabled selected hidden value="">
            Status
          </option>
          <option value="Draft">Draft</option>
          <option value="Published">Published</option>
        </select>
        {!!errors.status?.type && (
          <p className="text-red-500 mb-4 -mt-1">{errors.status.message}</p>
        )}

        <input
          className="bg-secondary p-3 mb-2 rounded-lg focus:outline-blue-600"
          type="datetime-local"
          placeholder="Time"
          {...register('createdTime')}
        />
        {!!errors.createdTime?.type && (
          <p className="text-red-500 mb-4 -mt-1">
            {errors.createdTime.message}
          </p>
        )}
        <BtnMain
          title="Submit"
          type="submit"
          className="max-w-max mt-8 py-[10px] px-[60px]"
        />
      </form>
    </Layout>
  );
};

export default CreatePost;
