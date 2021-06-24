import { forwardRef, useCallback, useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/Giphy.module.scss';
import { emitMessage } from '../api/events';
import { emitterType } from '../helpers/emitterTemplate';
import useGiphy from '../hooks/useGiphy';
import { ReactComponent as CloseIcon } from '../assets/closeIcon.svg';
import { ReactComponent as ErrorSearch } from '../assets/errorSearch.svg';
import TextInput from './TextInput';
import Button from './Button';

export const contentTypes = {
  gif: 'gifs',
  sticker: 'stickers',
};

const GiphyItem = forwardRef(({ onClick, src }, ref) => (
  <img ref={ref} src={src} alt="Gif" className={styles.img} onClick={() => onClick(src)} />
));

const Giphy = ({ closeFn, type }) => {
  const LIMIT = 5;
  const inputRef = useRef(null);
  const observer = useRef(null);
  const [query, setQuery] = useState('');
  const [offset, setOffset] = useState(LIMIT);
  const { images, hasMore, isLoading } = useGiphy(query, offset, LIMIT, type);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const lastElementRef = useCallback(
    (node) => {
      if (isLoading || !hasMore) return;
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver(([element]) => {
        if (element.isIntersecting) setOffset((prevOffset) => prevOffset + LIMIT);
      });
      if (node) observer.current.observe(node);
    },
    [hasMore, isLoading]
  );

  const handleItemClick = (image) => {
    emitMessage(image, emitterType.gif);
    closeFn();
  };

  const handleSearch = (e) => {
    setQuery(e.target.value);
    setOffset(0);
  };

  const unresolvableQuery = !images.length && !isLoading && (
    <div className={styles.error}>
      <p>Brak gifów</p>
      <ErrorSearch />
    </div>
  );

  return (
    <div className={styles.wrapper}>
      <div className={styles.grid}>
        {unresolvableQuery}
        {images.length
          ? images.map((src, i) => {
              const isLastImage = images.length === i + 1;
              const props = { onClick: () => handleItemClick(src), src };
              if (isLastImage) return <GiphyItem key={src} ref={lastElementRef} {...props} />;
              return <GiphyItem key={src} {...props} />;
            })
          : ''}
      </div>
      <div className={styles.searchFooter}>
        <Button btnType="icon" onClick={closeFn}>
          <CloseIcon />
        </Button>
        <TextInput
          onChange={handleSearch}
          ref={inputRef}
          as="input"
          placeholder={type === contentTypes.gif ? 'Szukaj gifa' : 'Szukaj naklejki'}
          value={query}
        />
      </div>
    </div>
  );
};

Giphy.propTypes = {
  closeFn: PropTypes.func.isRequired,
  type: PropTypes.oneOf([contentTypes.gif, contentTypes.sticker]),
};

Giphy.defaultProps = {
  type: contentTypes.gif,
};

export default Giphy;
