import s from './ButtonMore.module.css';

const ButtonMore = ({ handleClickLoadMore }) => {
  return (
    <button className={s.button} type={'button'} onClick={handleClickLoadMore}>
      Load more
    </button>
  );
};

export { ButtonMore };
